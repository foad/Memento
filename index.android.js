import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView
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

class SubjectItem extends Component {
    render() {
        return (
            <View style={styles.subject}>
                <View style={styles.subject__left}>
                    <Text style={styles.subject__title}>{this.props.data.title}</Text>
                    <Text style={styles.subject__room}>{this.props.data.room}</Text>
                </View>
                <View style={styles.subject__right}>
                    <Text style={styles.subject__start}>{this.props.data.start}</Text>
                    <Text style={styles.subject__end}>{this.props.data.end}</Text>
                </View>
            </View>
        );
    }
}

export default class Memento extends Component {
    render() {
        
        var subject1 = { title: 'EE3A1', room: 'GKapp 207', start: '10:00', end: '12:00' }
        var subject2 = { title: 'HCI', room: 'Comp Sci 102', start: '13:00', end: '14:00' }
        
        return (
            <View style={styles.container}>
                <TopBar />
                <ScrollView style={styles.main}>
                    <Text style={styles.main__title}>Monday</Text>
                    <SubjectItem data={subject1} />
                    <SubjectItem data={subject2}/>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#EFEFEF',
    },
    topbar: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 64,
        elevation: 5,
    },
    topbar__title: {
        fontFamily: 'sans-serif-thin',
        fontSize: 18,
    },
    main: {
        flex: 1,
        padding: 8,
    },
    main__title: {
        color: '#C2C2C2',
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: 'left',
    },
    subject: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        marginBottom: 12,
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    subject__left: {
        flex: 1,
        alignItems: 'flex-start',
    },
    subject__right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        paddingTop: 5,
    },
    subject__title: {
        color: '#3F4B52',
        fontSize: 18,
        fontFamily: 'sans-serif-thin',
        paddingTop: 4,
        paddingBottom: 4,
    },
    subject__room: {
        color: '#9C9C9C',
        fontSize: 12,
    },
    subject__start: {
        padding: 16,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#3E4A51',
        color: '#FFFFFF',
        fontSize: 16,
    },
    subject__end: {
        padding: 16,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#49545B',
        color: '#FFFFFF',
        fontSize: 16,
    },
});

AppRegistry.registerComponent('Memento', () => Memento);
