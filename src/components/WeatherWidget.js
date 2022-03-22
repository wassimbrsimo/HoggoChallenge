import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
export default function WeatherWidget(props) {
  return (
    <View>
      <View style={Styles.container}>
        <View style={Styles.primaryRow}>
          <Text style={Styles.boldText}> TODAY </Text>
          <Text style={Styles.smallText}> Sat, 3 Aug </Text>
        </View>
        <View style={Styles.weatherRow}>
          <View style={Styles.flex}>
            <Text style={Styles.bigText}>30°C</Text>
            <Text style={Styles.secondaryText}>
              {props.data.weather[0].description}
            </Text>
          </View>
          <View>
            <Image
              source={{
                uri:
                  'https://openweathermap.org/img/wn/' +
                  props.data.weather[0].icon +
                  '@2x.png',
              }}
              style={{height: 100, width: 100}}
              resizeMode="contain"
            />
            <Text style={Styles.weatherText}>{props.data.weather[0].main}</Text>
          </View>
        </View>
        {!!props.location && (
          <View style={Styles.row}>
            <Icon name="location-pin" size={30} color="yellow" />
            <Text style={Styles.secondaryText}>{props.location}</Text>
          </View>
        )}
      </View>
      <View style={Styles.container}>
        <View style={Styles.secondaryRow}>
          <View style={Styles.rowItems}>
            <Ionicon size={30} name="water" color="white" />
            <Text style={Styles.secondaryText}>
              {props.data.main.humidity}%
            </Text>
          </View>
          <View style={Styles.rowItems}>
            <Ionicon size={30} name="speedometer" color="white" />
            <Text style={Styles.secondaryText}>
              {props.data.main.pressure} mBa
            </Text>
          </View>
          <View style={Styles.rowItems}>
            <Feather size={30} name="wind" color="white" />
            <Text style={Styles.secondaryText}>
              {props.data.wind.speed} kmh
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 20,
    padding: 20,
    backgroundColor: '#2e1781',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  bigText: {color: 'white', fontWeight: 'bold', fontSize: 33},
  secondaryText: {color: 'white', fontSize: 12},
  boldText: {color: 'white', fontWeight: 'bold', fontSize: 16},
  smallText: {color: 'white', fontSize: 10},
  rowItems: {alignItems: 'center'},
  primaryRow: {flexDirection: 'row', justifyContent: 'space-between'},
  secondaryRow: {flexDirection: 'row', justifyContent: 'space-around'},
  weatherText: {
    top: -10,
    paddingVertical: 3,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#00000058',
  },
  weatherRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  flex: {flex: 1},
  row: {flexDirection: 'row', alignItems: 'center'},
});
