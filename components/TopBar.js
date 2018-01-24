import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    Image,
} from 'react-native';
import styles from '../styles'

export default class TopBar extends Component {
    
    constructor(props) {
        super(props);
        
        // Initial state
        this.state = {
            viewType: props.type, // Type of view, e.g. weekly view, semester view etc
            size: 64, // Default height of topbar
            buttons: [], // Container for topbar buttons
        }
        
        // If weekly view
        if (this.state.viewType == 'week') {
            this.state.size = 96; // Accomodate 32px high buttons
            
            // Create and add buttons to state
            this.state.buttons.push(
                <View key={'topbar__navigation'} style={styles.topbar__navigation}>
                    <TouchableHighlight style={styles.topbar__previous} onPress={() => this.props.previous()} underlayColor={'#E0E0E0'}>
                        <Image style={styles.topbar__button} source={require('../img/previous.png')} />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.topbar__next} onPress={() => this.props.next()} underlayColor={'#E0E0E0'}>
                        <Image style={styles.topbar__button} source={require('../img/next.png')} />
                    </TouchableHighlight>
                </View>
            );
        }
        
    }
    
    render() {
        return (
            <View style={[styles.topbar, {height: this.state.size}]}>
                <TouchableHighlight style={styles.topbar__menubuttoncontainer} onPress={() => this.props.openMenu()} underlayColor={'#E0E0E0'}>
                        <Image style={styles.topbar__menubutton} source={require('../img/menu.png')} />
                </TouchableHighlight>
                <View style={styles.topbar__titlecontainer}>
                    <Text style={styles.topbar__title}>M E M E N T O</Text>
                </View>
                {this.state.buttons}
            </View>
        );
    }
}