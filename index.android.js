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
    
    previous() {
        
    }
    next() {
        
    }
    
    render() {
        return (
            <View style={styles.topbar}>
                <Text style={styles.topbar__title}>M E M E N T O</Text>
                <View style={styles.topbar__navigation}>
                    <TouchableHighlight onPress={this.previous.bind(this)} underlayColor={'transparent'}>
                        <View style={styles.topbar__previous}>
                            <Text>&lt-</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.next.bind(this)} underlayColor={'transparent'}>
                        <View style={styles.topbar__next}>
                            <Text>-></Text>
                        </View>
                    </TouchableHighlight>
                </View>
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
            type: props.data.type,
            expanded: false,
            animation: new Animated.Value(),
            minHeight: 72,
            maxHeight: 96,
            triangle: [],
        };
        this.state.animation.setValue(this.state.minHeight);
        
        if (this.state.type == 'Lab') {
            this.state.triangle.push(<View style={styles.triangle__blue} />);
        } else if (this.state.type == 'Tutorial') {
            this.state.triangle.push(<View style={styles.triangle__green} />);
        }
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
                        <Text>{this.state.type}</Text>
                    </View>
                    {this.state.triangle}
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
        
        AsyncStorage.getItem('subjects').then((value) => {
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
                        { title: 'EE3A1', name: 'Computer Hardware and Digital Design', room: 'Education G33', start: '11:00', end: '13:00', lecturer: 'Dr Steven Quigley', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
                    ],
                    '3': [
                        { title: 'Org & Mgmt', name: 'Organisation and Management', room: 'Mech Eng G29', start: '09:00', end: '10:00', lecturer: 'Prof Chris Baber', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
                        { title: 'EE3A1', name: 'Computer Hardware and Digital Design', room: 'GKapp N216', start: '10:00', end: '12:00', lecturer: 'Dr Steven Quigley', type: 'Lab', weeks: [2, 3, 4, 5, 6, 7, 8, 9, 10] }
                    ],
                    '4': [
                        { title: 'Org & Mgmt', name: 'Organisation and Management', room: 'Arts LR7', start: '13:00', end: '14:00', lecturer: 'Prof Chris Baber', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
                    ]
                },
                spring: {
                    '1': [
                        { title: '3D Simulation', name: 'Interactive 3D Simulation', room: 'Law LT3', start: '12:00', end: '14:00', lecturer: 'Dr Neil Cooke', type: 'Lecture', weeks: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
                        { title: '3D Simulation', name: 'Interactive 3D Simulation', room: 'GKapp N207', start: '12:00', end: '14:00', lecturer: 'Dr Neil Cooke', type: 'Lab', weeks: [2, 3, 5, 7] }
                    ],
                    '2': [
                        { title: 'EE3J2', name: 'Data Mining', room: 'Sports Science LT1', start: '10:00', end: '11:00', lecturer: 'Prof Martin Russell', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
                        { title: 'Networking', name: 'Computer Networking', room: 'GKapp N224', start: '12:00', end: '14:00', lecturer: 'Dr John Easton', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
                    ],
                    '4': [
                        { title: 'EE3J2', name: 'Data Mining', room: 'GKapp NG22', start: '14:00', end: '16:00', lecturer: 'Prof Martin Russell', type: 'Lab', weeks: [5, 9] }
                    ],
                    '5': [
                        { title: 'Networking', name: 'Computer Networking', room: 'GKapp NG16', start: '10:00', end: '11:00', lecturer: 'Dr John Easton', type: 'Tutorial', weeks: [4, 7, 10] },
                        { title: 'Networking', name: 'Computer Networking', room: 'GKapp NG22', start: '10:00', end: '11:00', lecturer: 'Dr John Easton', type: 'Lab', weeks: [5, 6] },
                        { title: 'EE3J2', name: 'Data Mining', room: 'GKapp N225', start: '12:00', end: '13:00', lecturer: 'Prof Martin Russell', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
                    ]
                },
                summer: {}
            };
        }
        
        this.state.view = this.getWeekView('spring', 7);
    }
    
    getWeekView(semester, week) {
        var start = new Date(this.state.semesters[semester].start);
        var date = new Date(start.getTime()); date.setDate(date.getDate() + ((week-1) * 7));
        var subjects = [];
        for (var key in this.state.subjects[semester]) {
            if (!this.state.subjects[semester].hasOwnProperty(key)) break;
            var first = true;
            this.state.subjects[semester][key].filter((subject) => {
                return (subject.weeks.indexOf(week) != -1);
            }).map((subject) => {
                if (first) subjects.push(<Text style={styles.main__title}>{this.getDayName(parseInt(key)) + ' (' + this.getFullDate(date, key) + ')'}</Text>);
                first = false;
                subjects.push(<SubjectItem data={subject} />);
            });
        };
        
        return (
            <ScrollView style={styles.main}>
                <Text style={styles.main__weektitle}>{this.getWeekTitle(date).toUpperCase()}</Text>
                {subjects}
            </ScrollView>
        );
    }
    
    getFullDate(date, day) {
        var fulldate = '';
        var d = new Date(date.getTime());
        d.setDate(d.getDate() + (day - 1));
        fulldate += d.getDate() + '/';
        fulldate += this.getMonthNumber(d.getMonth()) + '/';
        fulldate += d.getFullYear();
        
        return fulldate;
    }
    
    getWeekTitle(date) {
        var weektitle = 'Week beginning ';
        weektitle += date.getDate() + this.getOrdinal(date.getDate());
        weektitle += ' ' + this.getMonthName(date.getMonth());
        weektitle += ' ' + date.getFullYear();
        
        return weektitle;
    }
    
    getOrdinal(number) {
      return (number > 20 || number < 10) ? ([false, "st", "nd", "rd"])[(number%10)] || "th" : "th";
    }
    
    getDayName(number) {
        var days = ['Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'];
        return days[number - 1];
    }
    
    getMonthName(number) {
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[number];
    }
    
    getMonthNumber(number) {
        number++;
        if (number < 10) return '0' + number;
        return number;
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
