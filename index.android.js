import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableHighlight,
    Animated,
    AsyncStorage
} from 'react-native';

// DISABLE WARNINGS
console.disableYellowBox = true;

class TopBar extends Component {
    render() {
        return (
            <View style={styles.topbar}>
                <Text style={styles.topbar__title}>M E M E N T O</Text>
            </View>
        );
    }
}

class SubjectItem extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            title: props.data.title,
            name: props.data.name,
            room: props.data.room,
            start: props.data.start,
            end: props.data.end,
            lecturer: props.data.lecturer,
            expanded: false,
            animation: new Animated.Value(),
            minHeight: 72,
            maxHeight: 96,
        };
        this.state.animation.setValue(this.state.minHeight);
    }
    
    toggle() {
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue   = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
        
        this.setState({
            expanded: !this.state.expanded
        });
        
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
                    </View>
                </Animated.View>
            </TouchableHighlight>
        );
    }
}

var subjects;

export default class Memento extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {};
        
        AsyncStorage.getItem("subjects").then((value) => {
            this.state.subjects = value;
        }).done();
        
        if (this.state.subjects == null || this.state.subjects == undefined) {
            this.state.subjects = [
                { title: 'EE3A1', name: 'LH Computer Hardware and Digital Design', room: 'Education G33', start: '10:00', end: '12:00', lecturer: 'Dr Steven Quigley' },
                { title: 'Org & Mgmt', name: 'Organisation and Management', room: 'Mech Eng G29', start: '13:00', end: '14:00', lecturer: 'Prof Chris Baber' }        
            ];
        }
        
        this.state.view = (
            <ScrollView style={styles.main}>
                <Text style={styles.main__title}>Monday</Text>
                {this.state.subjects.map(function(subject) {
                    return <SubjectItem data={subject} />;
                })}
            </ScrollView>
        );
    }
    
    render() {
        
        
        return (
            <View style={styles.container}>
                <TopBar />
                {this.state.view}
            </View>
        );
    }
}

var styles = require('./styles');
AppRegistry.registerComponent('Memento', () => Memento);
