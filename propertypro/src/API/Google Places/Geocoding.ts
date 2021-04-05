const geocoder = new google.maps.Geocoder();

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface BoundingBox {
  bottomLeft: Coordinate;
  topRight: Coordinate;
}

export interface GeocodeResult {
  name: string;
  placeId: string;
  location: Coordinate;
  boundingBox: BoundingBox;
}

export async function geocodeByPlaceId(
  placeId: string
): Promise<GeocodeResult[]> {
  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { placeId },
      (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus
      ) => {
        if (status === google.maps.GeocoderStatus.OK)
          resolve(results.map((r) => geocodeResultFromGoogleGeocoderResult(r)));
        reject("Failed to geocode by placeId");
      }
    );
  });
}

export async function geocodeByAddress(
  address: string
): Promise<GeocodeResult[]> {
  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { address },
      (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus
      ) => {
        if (status === google.maps.GeocoderStatus.OK)
          resolve(results.map((r) => geocodeResultFromGoogleGeocoderResult(r)));
        reject("Failed to geocode by placeId");
      }
    );
  });
}

function geocodeResultFromGoogleGeocoderResult(
  result: google.maps.GeocoderResult
): GeocodeResult {
  return {
    name: result.formatted_address,
    placeId: result.place_id,
    location: coordinateFromGoogleLatLng(result.geometry.location),
    boundingBox: {
      bottomLeft: coordinateFromGoogleLatLng(
        result.geometry.viewport.getSouthWest()
      ),
      topRight: coordinateFromGoogleLatLng(
        result.geometry.viewport.getNorthEast()
      ),
    },
  };
}

function coordinateFromGoogleLatLng(latLng: google.maps.LatLng): Coordinate {
  return {
    lat: latLng.lat(),
    lng: latLng.lng(),
  };
}
