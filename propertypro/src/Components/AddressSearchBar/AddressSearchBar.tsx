import React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import {
  AutoCompleteSuggestion,
  googlePlacesAutoComplete,
  SearchType,
} from "../../API/Google Places";

interface IProps {
  onSelect: (selection: AutoCompleteSuggestion) => void;
  isInvalid: boolean;
}

export default function AutoCompleteSearchBar({ onSelect, isInvalid }: IProps) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<
    AutoCompleteSuggestion[]
  >([]);

  async function handleSearch(searchText: string) {
    setIsLoading(true);
    const autoCompleteResult = await googlePlacesAutoComplete(
      searchText,
      SearchType.City
    );
    setSuggestions(autoCompleteResult.suggestions);
    setIsLoading(false);
  }

  function handleSelect(selections: AutoCompleteSuggestion[]) {
    onSelect(selections[0]);
  }

  return (
    <AsyncTypeahead
      id="address search typeahead"
      delay={500}
      multiple={false}
      minLength={4}
      isLoading={isLoading}
      onSearch={handleSearch}
      options={suggestions}
      onChange={handleSelect}
      filterBy={() => true}
      labelKey="name"
      useCache={true}
      isInvalid={isInvalid}
    />
  );
}
