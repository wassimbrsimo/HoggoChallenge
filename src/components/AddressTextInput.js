import React, {useContext} from 'react';
import {View, StyleSheet, TextInput, FlatList} from 'react-native';
import {SearchContext} from '../contexts/SearchContext';
import SuggestionRow from './SuggestionRow';

export default function AddressTextInput(props) {
  const {suggestionList, searchText, onSelect, onSubmit, onTextUpdate} =
    useContext(SearchContext);

  const styles = StyleSheet.create({
    inputStyle: {
      padding: 15,
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: suggestionList.length ? 0 : 20,
      borderBottomRightRadius: suggestionList.length ? 0 : 20,
      marginTop: 20,
      marginHorizontal: 20,
    },
    suggestionStyle: {backgroundColor: 'white', marginHorizontal: 20},
  });
  return (
    <View>
      <TextInput
        style={styles.inputStyle}
        onSubmitEditing={onSubmit}
        placeholderTextColor="gray"
        placeholder="Search places"
        value={searchText}
        onChangeText={onTextUpdate}
      />
      {!!suggestionList.length && (
        <View style={styles.suggestionStyle}>
          <FlatList
            data={suggestionList}
            renderItem={({item, index}) => (
              <SuggestionRow item={item} onSelect={onSelect} />
            )}
          />
        </View>
      )}
    </View>
  );
}
