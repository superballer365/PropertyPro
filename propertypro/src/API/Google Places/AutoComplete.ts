import { SearchType } from ".";

const { google } = window;
const service = new google.maps.places.AutocompleteService();

export interface AutoCompleteSuggestion {
  name: string;
  id: string;
}

export interface AutoCompleteResult {
  suggestions: AutoCompleteSuggestion[];
}

export async function googlePlacesAutoComplete(
  searchText: string,
  type: SearchType
): Promise<AutoCompleteResult> {
  const autocompleteType = getGooglePlacesSearchTypeFromSearchType(type);
  return new Promise((resolve, reject) => {
    service.getPlacePredictions(
      {
        input: searchText,
        types: autocompleteType ? [autocompleteType] : undefined,
      },
      (
        predictions: google.maps.places.AutocompletePrediction[],
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK)
          resolve(
            getAutoCompleteResultFromGoogleAutocompletePredictions(predictions)
          );

        // TODO: figure out how to better handle error
        reject("Search request failed");
      }
    );
  });
}

function getAutoCompleteResultFromGoogleAutocompletePredictions(
  predictions: google.maps.places.AutocompletePrediction[]
): AutoCompleteResult {
  return {
    suggestions: predictions.map((prediction) => ({
      name: prediction.description,
      id: prediction.place_id,
    })),
  };
}

/**
 * This is a utility function that translates the search type as our app understands it
 * and returns the resulting Google Places search type.
 */
// NOTE: maybe we should have a layer elsewhere where we make these translations, and this file
// should just be things directly related to the API?
function getGooglePlacesSearchTypeFromSearchType(
  searchType: SearchType
): GooglePlacesAutoCompleteSearchType {
  switch (searchType) {
    case SearchType.City:
      return "(cities)";
    case SearchType.Address:
      return "address";
    default:
      return undefined;
  }
}

/** These are the accepted search types for the Google Places API */
type GooglePlacesAutoCompleteSearchType =
  | "geocode"
  | "address"
  | "establishment"
  | "(regions)"
  | "(cities)"
  | undefined;
