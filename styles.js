'use strict';

var React = require('react-native');

var styles = React.StyleSheet.create({
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
    },
    subject__main: {  
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    subject__info: {
        marginTop: 32,
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

module.exports = styles;