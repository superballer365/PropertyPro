import React from "react";
import GoogleMapReact, { fitBounds } from "google-map-react";
import { Coordinate } from "../../API/Google Places/Geocoding";

export default function Map() {
  const [defaultZoom, setDefaultZoom] = React.useState<number>();
  const [defaultCenter, setDefaultCenter] = React.useState<Coordinate>();
  const mapContainerRef = React.useRef<HTMLDivElement>(null);

  // get zoom level and center for map bounds
  React.useEffect(() => {
    if (!mapContainerRef.current) return;

    const mapContainerRect = mapContainerRef.current.getBoundingClientRect();
    const { zoom, center } = fitBounds(
      {
        // TODO: get from session object
        sw: { lat: 42.22788, lng: -71.191113 },
        ne: { lat: 42.40081989999999, lng: -70.749455 },
      },
      { width: mapContainerRect?.width, height: mapContainerRect?.height }
    );
    setDefaultCenter(center);
    setDefaultZoom(zoom);
  }, []);

  return (
    <div ref={mapContainerRef} style={{ height: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY! }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        options={{
          streetViewControl: true,
          mapTypeControl: true,
          fullscreenControl: false,
        }}
        yesIWantToUseGoogleMapApiInternals={true}
      ></GoogleMapReact>
    </div>
  );
}
