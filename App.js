import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import WeatherGrapth from './components/WeatherGrapth'

export default class App extends React.Component {

  stringUrl = "https://api.openweathermap.org/data/2.5/forecast?";
  key = "a24d2a761c41f4a5d737eb5c83acaf4d";
  constructor(props) {
    super(props);
    this.state = { city: '', startIndex: 0 };
  }

  async fetchWeather() {
    try {
      var q = "q=" + this.state.city;
      var key = "APPID=" + this.key;
      let response = await fetch(
        this.stringUrl + q + "&" + key,
      );
      let responseJson = await response.json();
      // console.log(responseJson)
      this.parseAndUpdateState(responseJson)
    } catch (error) {
      console.error(error);
    }
  }
  // Распарсить на массив с нужными данными
  // По нажатия на кнопку дня с датой передвинуть начало интервала до первого появления даты в массиве и до конца дня
  parseAndUpdateState(data) {
    var resultList = [];
    var list = data['list']
    if (list !== undefined) {
      for (i = 0; i < list.length; i++) {
        dataObj = list[i];
        weatherObj = {
          dt_txt: dataObj.dt_txt,
          dt: dataObj.dt,
          humidity: dataObj.humidity,
          temp_max: dataObj.main.temp_max,
          temp_min: dataObj.main.temp_min,
          description: dataObj.weather[0].description,
          wind_deg: dataObj.wind.deg,
          wind_speed: dataObj.wind.speed,
        }
        resultList.push(weatherObj);
        // console.log(weatherObj);
      }
      this.setState({
        weatherDataList: resultList
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter City Here"
            onChangeText={(text) => this.setState({ city: text })}
            value={this.state.city}></TextInput>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => { this.fetchWeather() }}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <WeatherGrapth weatherDataList={this.state.weatherDataList}></WeatherGrapth>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    fontSize: 15,
    padding: 15,
    flex: 2
  },
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch'
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: '#4b54f2'
  },
  buttonText: {
    color: 'white',
    alignItems: "center",
    justifyContent: 'center',
    textAlign: "center"
  },
});
