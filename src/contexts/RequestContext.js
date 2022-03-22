import React, {useMemo, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {getAirData, getWeatherData} from '../api/api';

export const RequestContext = React.createContext({
  weatherData: null,
  loading: false,
  setWeatherData: () => {},
  airQualityData: null,
  setAirQualityData: () => {},
  locationName: '',
  setLocationName: () => {},
  onSubmitRequest: () => {},
  error: false,
  setError: () => {},
});

export default function RequestProvider({children}) {
  const [weatherData, setWeatherData] = useState();
  const [airQualityData, setAirQualityData] = useState();
  const [locationName, setLocationName] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const onSubmitRequest = async (lat, long) => {
    setError(false);
    setLoading(true);
    getWeatherData(lat, long, setWeatherData);
    getAirData(long, long, setAirQualityData);
  };

  useEffect(() => {
    weatherData && airQualityData && setLoading(false);
  }, [weatherData, airQualityData]);
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
        loading,
        error,
        setError,
      }}>
      {useMemo(() => children, [])}
    </RequestContext.Provider>
  );
}
