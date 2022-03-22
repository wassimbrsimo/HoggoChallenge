import axios from 'axios';
const AIR_QUALITY_KEY = '1c6d3a1eb768852aa0269707bdc07d3941edf0d8';
const RADAR_API_KEY = 'prj_live_pk_0b2facccd42e57e7cb4f8962cf17ee97fc198c50';
export const getSuggestions = async (text, callback) => {
  axios
    .get('https://api.radar.io/v1/search/autocomplete?query=' + text, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'Application/json',
        Authorization: RADAR_API_KEY,
      },
    })
    .then(
      response => {
        var response = response.data;
        console.log(
          'gett suggestion',
          response,
          'https://api.radar.io/v1/search/autocomplete?query=' + text,
        );
        callback(response);
      },
      error => {
        console.error(error);
      },
    );
};

export const getGeoLocationFromAddress = async (text, callback) => {
  axios
    .get('https://api.radar.io/v1/geocode/forward?query=' + text, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'Application/json',
        Authorization: RADAR_API_KEY,
      },
    })
    .then(
      response => {
        var response = response.data;
        callback(
          response.addresses[0]?.latitude,
          response.addresses[0]?.longitude,
          !response.addresses.length,
        );
      },
      error => {
        console.error(error);
      },
    );
};
const getLatLongUrl = (lat, long) => {
  let url =
    'https://api.waqi.info/feed/geo:' +
    lat +
    ';' +
    long +
    '/?token=' +
    AIR_QUALITY_KEY;
  console.log('url = ', url);
  return url;
};

export const getWeatherData = async (lat, long, callback) => {
  axios
    .get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: lat,
        lon: long,
        appid: '784171e1f8790c02e9525ba2953c5522',
      },
    })
    .then(
      response => {
        var response = response.data;
        console.log('weather Data =', response);
        callback(response);
      },
      error => {
        console.error(error);
      },
    );
};
export const getAirData = async (lat, long, callback) => {
  axios
    .get(getLatLongUrl(lat, long), {
      params: {token: '1c6d3a1eb768852aa0269707bdc07d3941edf0d8'},
    })
    .then(
      response => {
        var response = response.data;
        console.log('air Data =', response);
        callback(response.data);
      },
      error => {
        console.error(error);
      },
    );
};
