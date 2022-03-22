import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

export default function SuggestionRow({item, onSelect}) {
  const Styles = StyleSheet.create({
    container: {padding: 5},
  });
  return (
    <TouchableOpacity
      style={Styles.container}
      onPress={() =>
        onSelect(item.formattedAddress, item.longitude, item.latitude)
      }>
      <Text>
        {item.country} - {item.state} - {item.formattedAddress}
      </Text>
    </TouchableOpacity>
  );
}
