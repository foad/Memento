import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    Animated,
} from 'react-native';
import styles from '../styles'

export default class SubjectItem extends Component {
    constructor(props) {
        super(props);
        
        // Default state, get subject properties from data parameter
        this.state = {
            title: props.data.title,
            name: props.data.name,
            room: props.data.room,
            start: props.data.start,
            end: props.data.end,
            lecturer: props.data.lecturer,
            type: props.data.type,
            expanded: false, // Whether card is expanded or not
            animation: new Animated.Value(),
            minHeight: 72, // Minimum height, unexpanded
            maxHeight: 96, // Maximum height, expanded
            triangle: [], // Triangle container in case of non-lecture subject
        };
        this.state.animation.setValue(this.state.minHeight); // Default to unexpanded
        
        // If lab, show blue triangle
        if (this.state.type == 'Lab') {
            this.state.triangle.push(<View key={'triangle__blue'} style={styles.triangle__blue} />);
        }
        // If tutorial, show green triangle
        else if (this.state.type == 'Tutorial') {
            this.state.triangle.push(<View key={'triangle__green'} style={styles.triangle__green} />);
        }
        // If meeting, show orange triangle
        else if (this.state.type == 'Meeting') {
            this.state.triangle.push(<View key={'triangle__orange'} style={styles.triangle__orange} />)
        }
    }
    
    toggle() {
        // Animation values
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue   = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
        
        // Flip expanded state
        this.setState({
            expanded: !this.state.expanded
        });
        
        // Animate close/open
        this.state.animation.setValue(initialValue);
        Animated.spring(
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    render() {
        return (
            <TouchableHighlight onPress={this.toggle.bind(this)} underlayColor={'transparent'}>
                <Animated.View style={[styles.subject, {height: this.state.animation}]}>
                    <View style={styles.subject__main}>
                        <View style={styles.subject__left}>
                            <Text style={styles.subject__title}>{this.state.title}</Text>
                            <Text style={styles.subject__room}>{this.state.room}</Text>
                        </View>
                        <View style={styles.subject__right}>
                            <Text style={styles.subject__start}>{this.state.start}</Text>
                            <Text style={styles.subject__end}>{this.state.end}</Text>
                        </View>
                    </View>
                    <View style={styles.subject__info}>
                        <Text>{this.state.name}</Text>
                        <Text>{this.state.lecturer}</Text>
                        <Text>{this.state.type}</Text>
                    </View>
                    {this.state.triangle}
                </Animated.View>
            </TouchableHighlight>
        );
    }
}