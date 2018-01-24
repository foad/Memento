import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableHighlight,
    DrawerLayoutAndroid,
} from 'react-native';
import styles from '../styles'

export default class MenuDrawer extends Component {
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