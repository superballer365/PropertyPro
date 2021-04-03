export const googlePlacesBaseURL = `https://maps.googleapis.com/maps/api/place/`;

/**
 * This is my conception of a type of search as it relates to this app.
 */
// TODO: This should probably live somewhere other than this file, as it's not specific to Google Places
export enum SearchType {
  Any,
  City,
  Address,
}

export function appendGoogleAPIKeyToUrl(url: string) {
  return `${url}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
}

export * from "./AutoComplete";
