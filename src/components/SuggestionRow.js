import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

export default function SuggestionRow({item, onSelect}) {
  return (
    <TouchableOpacity
      onPress={() =>
        onSelect(item.formattedAddress, item.longitude, item.latitude)
      }>
      <Text>
        {item.country} - {item.state} - {item.formattedAddress}
      </Text>
    </TouchableOpacity>
  );
}
