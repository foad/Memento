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
    DrawerLayoutAndroid,
} from 'react-native';

// DISABLE WARNINGS
console.disableYellowBox = true;

class TopBar extends Component {
    
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
                        <Image style={styles.topbar__button} source={require('./img/previous.png')} />
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.topbar__next} onPress={() => this.props.next()} underlayColor={'#E0E0E0'}>
                        <Image style={styles.topbar__button} source={require('./img/next.png')} />
                    </TouchableHighlight>
                </View>
            );
        }
        
    }
    
    render() {
        return (
            <View style={[styles.topbar, {height: this.state.size}]}>
                <TouchableHighlight style={styles.topbar__menubuttoncontainer} onPress={() => this.props.openMenu()} underlayColor={'#E0E0E0'}>
                        <Image style={styles.topbar__menubutton} source={require('./img/menu.png')} />
                </TouchableHighlight>
                <View style={styles.topbar__titlecontainer}>
                    <Text style={styles.topbar__title}>M E M E N T O</Text>
                </View>
                {this.state.buttons}
            </View>
        );
    }
}

class SubjectItem extends Component {
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

class MenuDrawer extends Component {
    constructor(props) {
        super(props);
        
        this.semesters = props.semesters;
        this.semesterView = [];
        
        for (var key in this.semesters) {
            if (!this.semesters.hasOwnProperty(key)) break;
            var title = key.charAt(0).toUpperCase() + key.slice(1);
            let keyval = key;
            this.semesterView.push(
                <TouchableHighlight key={key} style={{marginBottom: 8, marginTop: 8}} onPress={() => {this.props.setSemester(keyval);}} underlayColor={'#EFEFEF'}>
                    <View style={styles.menu__semester}>
                        <Text style={styles.menu__semestertitle}>{title}</Text>
                        <Text style={styles.menu__semesterdate}>[{this.semesters[key].start} -> {this.semesters[key].end}]</Text>
                    </View>
                </TouchableHighlight>
            );
        }
        
        // Bind openDrawer method to instance
        this.openDrawer = this.openDrawer.bind(this);
    }
    
    render() {
        // Contents of drawer
        var navigationView = (
            <View style={styles.menu}>
              <Text style={styles.menu__subtitle}>CHOOSE SEMESTER</Text>
              {this.semesterView}
            </View>
        );
        
        // Display DrawerLayoutAndroid with contents
        return (
            <DrawerLayoutAndroid
                ref={(_drawer) => this.drawer = _drawer}
                drawerWidth={240}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
            {this.props.children}
            </DrawerLayoutAndroid>
        );
    }
    
    openDrawer() {
        // Open/close drawer
        this.drawer.openDrawer();
    }
}

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
            <ScrollView style={styles.main}>
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
        return Math.floor(difference_ms / ONE_WEEK);
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
    
    render() {
        return (
            <MenuDrawer
            ref={(_menudrawer) => this.menudrawer = _menudrawer} semesters={this.state.semesters} setSemester={this.setSemester.bind(this)}>
                <View style={styles.container}>
                    <TopBar type={this.state.viewType} previous={this.previous.bind(this)} next={this.next.bind(this)} openMenu={this.openMenu.bind(this)} />
                    {this.state.view}
                </View>
            </MenuDrawer>
        );
    }
}

var styles = require('./styles');
AppRegistry.registerComponent('Memento', () => Memento);
