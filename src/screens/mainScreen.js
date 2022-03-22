import React, {useContext} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AddressTextInput from '../components/AddressTextInput';
import AirQualityWidget from '../components/AirQualityWidget';
import WeatherWidget from '../components/WeatherWidget';
import {RequestContext} from '../contexts/RequestContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Main() {
  const {
    weatherData,
    error,
    loading,
    airQualityData,
    locationName,
    onSubmitRequest,
  } = useContext(RequestContext);

  const Styles = StyleSheet.create({
    onboarding: {
      height: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    loader: {
      alignSelf: 'center',
      top: Dimensions.get('window').height / 2.5,
    },
    onboardingText: {color: 'gray', fontWeight: 'bold', fontSize: 20},
    errorText: {color: 'tomato', fontWeight: 'bold', fontSize: 20},
  });
  return (
    <View>
      <AddressTextInput onSubmit={onSubmitRequest} />
      {loading && !error && (
        <ActivityIndicator style={Styles.loader} size={30} color="white" />
      )}
      {weatherData && !loading && !error && (
        <WeatherWidget data={weatherData} location={locationName} />
      )}
      {airQualityData && !loading && !error && (
        <AirQualityWidget value={airQualityData.aqi} />
      )}
      {!weatherData && !airQualityData && !loading && (
        <View style={Styles.onboarding}>
          <Icon name="search" color="#2e1781" size={100} />
          <Text style={Styles.onboardingText}>Search a place</Text>
        </View>
      )}
      {error && (
        <View style={Styles.onboarding}>
          <Icon name="warning" color="yellow" size={100} />
          <Text style={Styles.errorText}>Error ! please try again</Text>
        </View>
      )}
    </View>
  );
}
