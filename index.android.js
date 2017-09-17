import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

class TopBar extends Component {
    render() {
        return (
            <View style={styles.topbar}>
                <Text style={styles.topbar__title}>M E M E N T O</Text>
            </View>
        );
    }
}

export default class Memento extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TopBar />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
    },
    topbar: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 64,
        alignSelf: 'stretch',
        elevation: 5,
    },
    topbar__title: {
        fontFamily: 'sans-serif-thin',
        fontSize: 18,
    }
});

AppRegistry.registerComponent('Memento', () => Memento);
