import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Indicator,
} from 'react-native-cool-speedometer';

export default function AirQualityWidget(props) {
  const AQI_INDEX = Math.floor(props.value / 50);
  const AQI_Category = [
    'Good',
    'Moderate',
    'USG',
    'Unhealthy',
    'Very Unhealthy',
    'Hazardous',
  ];
  const AQI_Colors = ['green', 'yellow', 'orange', 'red', 'purple', 'brown'];
  return (
    <View style={Styles.container}>
      <Speedometer value={props.value}>
        <Background />
        <Arc arcWidth={30} />
        <Needle
          color="white"
          baseWidth={10}
          circleColor={AQI_Colors[AQI_INDEX]}
        />
        <Progress arcWidth={50} color={AQI_Colors[AQI_INDEX]} />
        <Indicator />
      </Speedometer>
      <Text style={Styles.categoryText}>{AQI_Category[AQI_INDEX]}</Text>
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {alignSelf: 'center'},
  categoryText: {fontSize: 20, fontWeight: 'bold', color: 'white'},
});
