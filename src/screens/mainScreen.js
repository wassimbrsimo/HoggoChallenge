import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import AddressTextInput from '../components/AddressTextInput';
import AirQualityWidget from '../components/AirQualityWidget';
import WeatherWidget from '../components/WeatherWidget';
import {RequestContext} from '../contexts/RequestContext';

export default function Main() {
  const {weatherData, airQualityData, locationName, onSubmitRequest} =
    useContext(RequestContext);

  return (
    <View>
      <AddressTextInput onSubmit={onSubmitRequest} />
      {weatherData && (
        <WeatherWidget data={weatherData} location={locationName} />
      )}
      {airQualityData && <AirQualityWidget value={airQualityData.aqi} />}
    </View>
  );
}
