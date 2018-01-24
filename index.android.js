import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableHighlight,
    Animated,
    AsyncStorage,
    Image,
} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'

import TopBar from './components/TopBar'
import SubjectItem from './components/SubjectItem'
import MenuDrawer from './components/MenuDrawer'

// DISABLE WARNINGS
console.disableYellowBox = true;

var subjects;

export default class Memento extends Component {
    
    constructor(props) {
        super(props);
        
        // Default state
        this.state = {};
        
        // Bind openMenu function to instance
        this.openMenu = this.openMenu.bind(this);
        
        // Default weekly view
        this.state.viewType = 'week';
        
        // If semesters not loaded, load in manual settings
        if (this.state.semesters == null || this.state.semesters == undefined) {
            this.state.semesters = {
                autumn: {start: '2017/09/25', end: '2017/12/08'},
                spring: {start: '2018/01/08', end: '2018/03/23'},
                summer: {start: '2018/04/23', end: '2018/06/15'}
            };
        }
        
        // If subjects not loaded, load in manual settings
        if (this.state.subjects == null || this.state.subjects == undefined) {
            this.state.subjects = {
                autumn: {
                    '1': [
                        { title: 'Induction', name: '3rd Year Induction Talk', room: 'PHYW 117', start: '11:00', end: '13:00', lecturer: 'Prof Martin Russell', type: 'Lecture', weeks: [1] },
                        { title: 'HCI', name: 'Human Computer Interaction', room: 'CPSC UG04', start: '11:00', end: '12:00', lecturer: 'Dr Rowanne Fleck', type: 'Lab', weeks: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
                        { title: 'HCI', name: 'Human Computer Interaction', room: 'Mech Eng G34', start: '14:00', end: '15:00', lecturer: 'Dr Rowanne Fleck', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
                    ],
                    '2': [
                        { title: 'EE3A1', name: 'Computer Hardware and Digital Design', room: 'Education G33', start: '11:00', end: '13:00', lecturer: 'Dr Steven Quigley', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
                        { title: 'HCI', name: 'Human Computer Interaction', room: 'CPSC UG04', start: '14:00', end: '15:00', lecturer: 'Dr Rowanne Fleck', type: 'Lecture', weeks: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
                    ],
                    '3': [
                        { title: 'Org & Mgmt', name: 'Organisation and Management', room: 'Mech Eng G29', start: '09:00', end: '10:00', lecturer: 'Prof Chris Baber', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
                    ],
                    '4': [
                        { title: 'EE3A1', name: 'Computer Hardware and Digital Design', room: 'GKapp N216', start: '10:00', end: '12:00', lecturer: 'Dr Steven Quigley', type: 'Lab', weeks: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
                        { title: 'HCI', name: 'Human Computer Interaction', room: 'Mech Eng G29', start: '12:00', end: '13:00', lecturer: 'Dr Rowanne Fleck', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
                        { title: 'Org & Mgmt', name: 'Organisation and Management', room: 'Arts LR7', start: '13:00', end: '14:00', lecturer: 'Prof Chris Baber', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
                    ]
                },
                spring: {
                    '1': [
                        { title: '3D Simulation', name: 'Interactive 3D Simulation', room: 'Law LT3', start: '12:00', end: '14:00', lecturer: 'Dr Neil Cooke', type: 'Lecture', weeks: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
                        { title: '3D Simulation', name: 'Interactive 3D Simulation', room: 'GKapp N207', start: '12:00', end: '14:00', lecturer: 'Dr Neil Cooke', type: 'Lab', weeks: [2, 3, 5, 8] }
                    ],
                    '2': [
                        { title: 'EE3J2', name: 'Data Mining', room: 'Sports Science LT1', start: '10:00', end: '11:00', lecturer: 'Prof Martin Russell', type: 'Lecture', weeks: [1] },
                        { title: 'NI Search', name: 'Nature Inspired Search and Optimisation', room: 'Mech Eng G34', start: '10:00', end: '11:00', lecturer: 'Prof Jon Rowe', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
                        { title: 'Networking', name: 'Computer Networking', room: 'GKapp N224', start: '12:00', end: '14:00', lecturer: 'Dr John Easton', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
                    ],
                    '3': [
                        { title: 'BEng Project', name: 'BEng Final Year Project', room: 'GKapp N110', start: '11:00', end: '12:00', lecturer: 'Prof Robert Stone', type: 'Meeting', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
                    ],
                    '4': [
                        { title: 'Data Analysis', name: 'Intelligent Data Analysis', room: 'Aston Webb LT', start: '10:00', end: '12:00', lecturer: 'Prof Peter Tino', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
                        { title: 'EE3J2', name: 'Data Mining', room: 'Sports Science LT1', start: '12:00', end: '13:00', lecturer: 'Prof Martin Russell', type: 'Lecture', weeks: [ 2, 3, 4, 5, 6, 7, 8, 9, 10] },
                        { title: 'NI Search', name: 'Nature Inspired Search and Optimisation', room: 'Mech Eng G33', start: '13:00', end: '14:00', lecturer: 'Dr Per Kristian Lehre', type: 'Lecture', weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] },
                        { title: 'EE3J2', name: 'Data Mining', room: 'GKapp NG22', start: '14:00', end: '16:00', lecturer: 'Prof Martin Russell', type: 'Lab', weeks: [5, 9] },
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
        
        
        
        // Default settings at runtime
        [this.state.semester, this.state.week] = this.getCurrentWeek();
        
        // Calculate no. weeks in semester
        this.state.maxweek = this.calculateWeeksBetween(
            new Date(this.state.semesters[this.state.semester].start),
            new Date(this.state.semesters[this.state.semester].end)
        );
        
        // Get weekly view and put into state
        this.state.view = this.getWeekView(this.state.semester, this.state.week);
    }
    
    openMenu() {
        // Open/close drawer
        this.menudrawer.openDrawer();
    }
    
    componentDidMount() {
        // Pass forward state
        this.setState((previousState) => { return previousState });
    }
    
    getWeekView(semester, week) {
        // Get date for week
        var start = new Date(this.state.semesters[semester].start);
        var date = new Date(start.getTime()); date.setDate(date.getDate() + ((week-1) * 7));
        var subjects = [];
        
        // Get subjects for the week and convert to JSX
        for (var key in this.state.subjects[semester]) {
            if (!this.state.subjects[semester].hasOwnProperty(key)) break;
            var first = true;
            this.state.subjects[semester][key].filter((subject) => {
                return (subject.weeks.indexOf(week) != -1);
            }).map((subject) => {
                if (first) subjects.push(<Text key={key} style={styles.main__title}>{this.getDayName(parseInt(key)) + ' (' + this.getFullDate(date, key) + ')'}</Text>);
                first = false;
                subjects.push(<SubjectItem key={[subject.title, subject.room, key]} data={subject} />);
            });
        };
        
        // Return resulting JSX
        return (
            <ScrollView style={styles.main__view}>
                <Text style={styles.main__weektitle}>{this.getWeekTitle(date, week).toUpperCase()}</Text>
                {subjects}
            </ScrollView>
        );
    }
    
    getCurrentWeek() {
        // No. milliseconds in one week
        var ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
        
        var today = new Date();
        
        // Loop through each semester
        for (var key in this.state.semesters) {
            if (!this.state.semesters.hasOwnProperty(key)) continue;
            var weekStart = new Date(this.state.semesters[key].start);
            var semesterEnd = new Date(this.state.semesters[key].end);
            var weekEnd = new Date(weekStart.getTime() + ONE_WEEK);
            var week = 1;
            
            // Loop through each week in semester
            while(weekStart.getTime() < semesterEnd.getTime()) {
                if (today.getTime() >= weekStart.getTime() && today.getTime() <= weekEnd.getTime())
                    return [key, week];
                
                weekStart = new Date(weekEnd.getTime());
                weekEnd = new Date(weekStart.getTime() + ONE_WEEK);
                week++;
            }
        }
        
        return ['autumn', 1];
    }
    
    calculateWeeksBetween(start, end) {
        // No. milliseconds in one week
        var ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
        
        // Get start and end times in ms
        var start_ms = start.getTime();
        var end_ms = end.getTime();
        
        // Calculate difference
        var difference_ms = Math.abs(end_ms - start_ms);
        
        // Return no. weeks
        return Math.ceil(difference_ms / ONE_WEEK);
    }
    
    getFullDate(date, day) {
        
        var fulldate = '';
        var d = new Date(date.getTime()); // Clone date
        
        // Display full date
        d.setDate(d.getDate() + (day - 1));
        fulldate += d.getDate() + '/';
        fulldate += this.getMonthNumber(d.getMonth()) + '/';
        fulldate += d.getFullYear();
        
    
        return fulldate;
    }
    
    getWeekTitle(date, week) {
        // Get title for weekly view from date
        var weektitle = 'Week ' + week + ' beginning ';
        weektitle += date.getDate() + this.getOrdinal(date.getDate());
        weektitle += ' ' + this.getMonthName(date.getMonth());
        weektitle += ' ' + date.getFullYear();
        
        return weektitle;
    }
    
    getOrdinal(number) {
        // E.g. (1) => 'st' , (12) => 'nd' , (3) => 'rd' , (30) => 'th'
        return (number > 20 || number < 10) ? ([false, "st", "nd", "rd"])[(number%10)] || "th" : "th";
    }
    
    getDayName(number) {
        // Return day of the week from numeral
        var days = ['Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'];
        return days[number - 1];
    }
    
    getMonthName(number) {
        // Return month from numeral
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[number];
    }
    
    getMonthNumber(number) {
        // Convert raw JS month number to formatted one, e.g. (2) => '03'
        number++;
        if (number < 10) return '0' + number;
        return number;
    }
    
    previous() {
        // Go to previous week and re-render weekly view
        if (this.state.week != 1) {
            this.setState({view: this.getWeekView(this.state.semester, this.state.week - 1)});
            this.setState({week: this.state.week - 1});
        }
    }
    
    next() {
        // Go to next week and re-render weekly view
        if (this.state.week != this.state.maxweek) {
            this.setState({view: this.getWeekView(this.state.semester, this.state.week + 1)});
            this.setState({week: this.state.week + 1});
        }
    }

    setSemester(semester) {
        this.setState({view: this.getWeekView(semester, 1)});
        this.setState({semester: semester});
        this.setState({week: 1});
    }

    onSwipe(direction, state) {
        const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
        switch (direction) {
            case SWIPE_LEFT:
                this.next()
                break
            case SWIPE_RIGHT:
                this.previous()
                break
            default:
                return
        }
    }
    
    render() {

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          };

        return (
            <MenuDrawer
            ref={(_menudrawer) => this.menudrawer = _menudrawer} semesters={this.state.semesters} setSemester={this.setSemester.bind(this)}>
                <View style={styles.container}>
                    <TopBar type={this.state.viewType} previous={this.previous.bind(this)} next={this.next.bind(this)} openMenu={this.openMenu.bind(this)} />
                    <GestureRecognizer
                        style={styles.main}
                        onSwipe={ (direction, state) => this.onSwipe(direction, state) }
                        config={config}>
                        {this.state.view}
                    </GestureRecognizer>
                </View>
            </MenuDrawer>
        );
    }
}

var styles = require('./styles');
AppRegistry.registerComponent('Memento', () => Memento);
