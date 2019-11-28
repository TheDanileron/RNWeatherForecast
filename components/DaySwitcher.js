import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default class DaySwitcher extends React.Component {
    constructor(props) {
        super(props);
    }

    dayToString(dayInt) {
        dayStr = "Sunday";
        switch (dayInt) {
            case 0:
                dayStr = "Sunday"
                break
            case 1:
                dayStr = "Monday"
                break
            case 2:
                dayStr = "Tuesday"
                break
            case 3:
                dayStr = "Wednessday"
                break
            case 4:
                dayStr = "Thursday"
                break
            case 5:
                dayStr = "Friday"
                break
            case 6:
                dayStr = "Saturday"
                break
        }
        return dayStr;
    }

    render() {
        var dateObj = new Date(this.props.date)
        var weekDay = dateObj.getDay()
        return (
            <TouchableOpacity style={styles.dayBtn} onPress={() => { this.props.handler(this.props.date) }}>
                <View>
                    <Text style={styles.textStyle}>{this.props.date.substring(5, this.props.date.length)}</Text>
                    <Text style={styles.textStyle}>{this.dayToString(weekDay)}</Text>
                </View>
            </TouchableOpacity>)
    }
}

const styles = StyleSheet.create({
    dayBtn: {
        padding: 4,
        margin: 1,
        flex: 1,
        backgroundColor: '#4b54f2',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 11,
        textAlign: 'center',
        color: '#fff'
    }
})