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
    main__weektitle: {
        color: '#3E4A51',
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 16,
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
        paddingTop: 0,
        paddingBottom: 4,
    },
    subject__room: {
        color: '#9C9C9C',
        fontSize: 12,
        paddingBottom: 8,
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
    triangle__blue: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        position: 'absolute',
        left: 0,
        top: 0,
        borderTopWidth: 16,
        borderRightWidth: 16,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopColor: '#6699CC',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    triangle__green: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        position: 'absolute',
        left: 0,
        top: 0,
        borderTopWidth: 16,
        borderRightWidth: 16,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopColor: '#80B8A0',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    }
});

module.exports = styles;