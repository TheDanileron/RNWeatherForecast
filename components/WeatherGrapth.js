import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {
  LineChart
} from "react-native-chart-kit";
import DaySwitcher from './DaySwitcher'

export default class WeatherGrapth extends React.Component {

  constructor(props) {
    super(props);

    this.state = ({
      startIndex: 0,
      endIndex: 7,
      grapthLabels: [],
      grapthData: [],
      days: []
    })

    this.update(props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      console.log('componentWillReceiveProps')
      console.log(nextProps)
      this.update(nextProps)
    }
  }

  update(props) {
    console.log('update')
    var grapthLabels = []
    var grapthData = []
    var days = []
    if (props.weatherDataList !== undefined) {
      var list = props.weatherDataList;
      for (i = 0; i < list.length; i++) {
        var timeLabel = list[i].dt_txt.split(' ')[1];
        grapthLabels.push(timeLabel.substring(0, timeLabel.length - 3));
        var tempData = (list[i].temp_max + list[i].temp_min) / 2;
        grapthData.push(tempData);
      }
      startIndex = 0;
      endIndex = startIndex + 7;
      var date = list[0].dt_txt.split(' ')[0];
      days.push({
        date: date
      })
      for (i = 1; i < list.length; i++) {
        var newDate = list[i].dt_txt.split(' ')[0]
        if (newDate !== date) {
          date = newDate
          days.push({
            date: date
          })
        }
      }

      this.setState({
        weatherDataList: list,
        startIndex: startIndex,
        endIndex: endIndex,
        grapthLabels: grapthLabels,
        grapthData: grapthData,
        days: days
      });
    }
  }

  handler(date) {
    for (i = 0; i < this.state.weatherDataList.length; i++) {
      if (this.state.weatherDataList[i].dt_txt.split(' ')[0] === date) {
        startIndex = i;
        endIndex = i + 7;
        this.setState({
          startIndex: startIndex,
          endIndex: endIndex
        });
        break;
      }
    }

  }

  render() {
    if (this.state.grapthData !== undefined && this.state.grapthData.length > 0) {
      buttonsListArr = this.state.days.map(day => (
        <DaySwitcher key={day.date} date={day.date} handler={this.handler.bind(this)}></DaySwitcher>
      ));
      return (
        <View style={styles.container}>
          <View style={styles.containerDays}>
            {buttonsListArr}
          </View>
          <LineChart
            data={{
              labels: this.state.grapthLabels.slice(this.state.startIndex, this.state.endIndex),
              datasets: [
                {
                  data: this.state.grapthData.slice(this.state.startIndex, this.state.endIndex).map(tempK => (
                    tempK - 273.15
                  ))
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={300}
            chartConfig={{
              backgroundColor: "#454dd9",
              backgroundGradientFrom: "#454dd9",
              backgroundGradientTo: "#4b54f2",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#1108bd"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
      );
    } else {
      return <View style={styles.container}>
        <Text style={styles.text}>No data received</Text>
      </View>
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'black',
    textAlign: "center"
  },
  containerDays: {
    height: 100,
    alignItems: 'stretch',
    flexDirection: 'row'
  },
})
