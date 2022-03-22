import React, {useMemo, useState, useContext} from 'react';
import {getGeoLocationFromAddress, getSuggestions} from '../api/api';
import {RequestContext} from './RequestContext';

export const SearchContext = React.createContext({
  suggestionList: [],
  setSuggestionList: () => {},
  searchText: null,
  setSearchText: () => {},
  onSubmit: () => {},
  onSelect: () => {},
  onTextUpdate: text => {},
});
export default function SearchProvider({children}) {
  const [suggestionList, setSuggestionList] = useState([]);
  const [searchText, setSearchText] = useState();
  const {onSubmitRequest, setError, setLocationName} =
    useContext(RequestContext);

  const onSubmit = () => {
    setSuggestionList('');
    getGeoLocationFromAddress(
      searchText,
      (lat, long, error) =>
        error ? setError(true) : onSubmitRequest(lat, long),
      setLocationName(searchText),
    );
  };
  const onSelect = (name, lat, long) => {
    setSuggestionList('');
    setSearchText(name);
    onSubmitRequest(lat, long);
    setLocationName(name);
  };
  const onTextUpdate = text => {
    setSearchText(text);
    text.length
      ? getSuggestions(text, data => {
          setSuggestionList(data.addresses);
        })
      : setSuggestionList([]);
  };
  return (
    <SearchContext.Provider
      value={{
        suggestionList,
        setSuggestionList,
        searchText,
        setSearchText: setSearchText,
        onSubmit,
        onSelect,
        onTextUpdate,
      }}>
      {useMemo(() => children, [])}
    </SearchContext.Provider>
  );
}
