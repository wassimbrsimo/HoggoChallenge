import React, {useMemo, useState} from 'react';
import {View, Text} from 'react-native';
import {getAirData, getWeatherData} from '../api/api';

export const RequestContext = React.createContext({
  weatherData: null,
  setWeatherData: () => {},
  airQualityData: null,
  setAirQualityData: () => {},
  locationName: '',
  setLocationName: () => {},
  onSubmitRequest: () => {},
});

export default function RequestProvider({children}) {
  const [weatherData, setWeatherData] = useState();
  const [airQualityData, setAirQualityData] = useState();
  const [locationName, setLocationName] = useState();

  const onSubmitRequest = (name, lat, long) => {
    setLocationName(name);
    getWeatherData(lat, long, setWeatherData);
    getAirData(long, long, setAirQualityData);
  };
  return (
    <RequestContext.Provider
      value={{
        weatherData,
        setWeatherData,
        airQualityData,
        setAirQualityData,
        locationName,
        setLocationName,
        onSubmitRequest,
      }}>
      {useMemo(() => children, [])}
    </RequestContext.Provider>
  );
}
