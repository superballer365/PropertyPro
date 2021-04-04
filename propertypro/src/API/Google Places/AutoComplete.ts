import { appendGoogleAPIKeyToUrl, SearchType } from ".";
import axios from "axios";

// const corsProxyPrefix = `https://thingproxy.freeboard.io/fetch/`
// const corsProxyPrefix = `http://alloworigin.com/get?url=`;
// const corsProxyPrefix = `http://gobetween.oklabs.org/`;
const corsProxyPrefix = `http://www.whateverorigin.org/get?url=`;

const googlePlacesAutoCompleteBaseURL = `${corsProxyPrefix}https://maps.googleapis.com/maps/api/place/autocomplete/json`;

export async function googlePlacesAutoComplete(
  searchText: string,
  type: SearchType
) {
  const googlePlacesSearchType = getGooglePlacesSearchTypeFromSearchType(type);
  const url = getGooglePlacesAutoCompleteURL(
    searchText,
    googlePlacesSearchType
  );

  const result = await axios.get(url, { headers: "" });
  // TODO: translate
  return result;
}

function getGooglePlacesAutoCompleteURL(
  input: string,
  searchType: GooglePlacesAutoCompleteSearchType
) {
  return appendGoogleAPIKeyToUrl(
    `${googlePlacesAutoCompleteBaseURL}?input=${input}&types=${searchType}`
  );
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

const { google } = window;
const service = new google.maps.places.AutocompleteService();

export async function googlePlacesAutoComplete2(
  searchText: string,
  type: SearchType
) {
  const autocompleteType = getGooglePlacesSearchTypeFromSearchType(type);
  return new Promise((resolve, reject) => {
    service.getPlacePredictions(
      {
        input: searchText,
        types: autocompleteType ? [autocompleteType] : undefined,
      },
      (prediction: google.maps.places.AutocompletePrediction[]) => {
        resolve(prediction);
      }
    );
  });
}
