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
  const {onSubmitRequest} = useContext(RequestContext);

  const onSubmit = () => {
    getGeoLocationFromAddress(searchText, (lat, long) =>
      onSubmitRequest('', lat, long),
    );
  };
  const onSelect = (name, lat, long) => {
    setSuggestionList('');
    setSearchText(name);
    onSubmitRequest(name, lat, long);
  };
  const onTextUpdate = text => {
    console.log('text update ', text.length ? 'true' : 'false');
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
        setSearchText,
        onSubmit,
        onSelect,
        onTextUpdate,
      }}>
      {useMemo(() => children, [])}
    </SearchContext.Provider>
  );
}
