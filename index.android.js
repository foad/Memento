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
        
        if (this.state.semesters == null || this.state.semesters == undefined) {
            this.state.semesters = {
                autumn: {start: '2017/09/25', end: '2017/12/08'},
                spring: {start: '2018/01/08', end: '2018/03/23'},
                summer: {start: '2018/04/23', end: '2018/06/15'}
            };
        }
        
        if (this.state.subjects == null || this.state.subjects == undefined) {
            this.state.subjects = {
                autumn: {
                    '2': [
                        { title: 'EE3A1', name: 'LH Computer Hardware and Digital Design', room: 'Education G33', start: '11:00', end: '13:00', lecturer: 'Dr Steven Quigley', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
                    ],
                    '3': [
                        { title: 'Org & Mgmt', name: 'Organisation and Management', room: 'Mech Eng G29', start: '09:00', end: '10:00', lecturer: 'Prof Chris Baber', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
                        { title: 'EE3A1', name: 'LH Computer Hardware and Digital Design', room: 'GKapp N216', start: '10:00', end: '12:00', lecturer: 'Dr Steven Quigley', type: 'Lab', weeks: [2, 3, 4, 5, 6, 7, 8, 9, 10] }
                    ],
                    '4': [
                        { title: 'Org & Mgmt', name: 'Organisation and Management', room: 'Arts LR7', start: '13:00', end: '14:00', lecturer: 'Prof Chris Baber', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
                    ]
                },
                spring: {},
                summer: {}
            };
        }
        
        var start = new Date(this.state.semesters.autumn.start);
        var week = 1;
        var subjects = [];
        for (var key in this.state.subjects.autumn) {
            if (!this.state.subjects.autumn.hasOwnProperty(key)) break;
            subjects.push(<Text style={styles.main__title}>{this.getDayName(parseInt(key))}</Text>);
            this.state.subjects.autumn[key].filter((subject) => {
                return (subject.weeks.indexOf(week) != -1);
            }).map((subject) => {
                console.log(subject.title);
                subjects.push(<SubjectItem data={subject} />);
            });
        };
        
        this.state.view = (
            <ScrollView style={styles.main}>
                <Text style={styles.main__title}>Week beginning 25th September 2017</Text>
                {subjects}
            </ScrollView>
        );
    }
    
    getDayName(number) {
        var days = ['Monday', "Tueday", 'Wednesday', 'Thursday', 'Friday', 'Sunday'];
        return days[number - 1];
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
