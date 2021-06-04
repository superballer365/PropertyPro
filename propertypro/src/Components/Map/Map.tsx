import React from "react";
import GoogleMapReact, { fitBounds } from "google-map-react";
import { Coordinate } from "../../API/Google Places/Geocoding";
import SessionData from "../../Models/Session";
import ListingMarker from "../Listings/ListingMarker";

interface IProps {
  session: SessionData;
}

export default function Map({ session }: IProps) {
  const [defaultZoom, setDefaultZoom] = React.useState<number>();
  const [defaultCenter, setDefaultCenter] = React.useState<Coordinate>();
  const mapContainerRef = React.useRef<HTMLDivElement>(null);

  // get zoom level and center for map bounds on first load
  const loaded = React.useRef<boolean>(false);
  React.useEffect(() => {
    if (!mapContainerRef.current) return;
    if (loaded.current) return;

    const mapContainerRect = mapContainerRef.current.getBoundingClientRect();
    const { zoom, center } = fitBounds(
      {
        sw: session.searchBounds.bottomLeft,
        ne: session.searchBounds.topRight,
      },
      { width: mapContainerRect?.width, height: mapContainerRect?.height }
    );
    setDefaultCenter(center);
    setDefaultZoom(zoom);
    loaded.current = true;
  }, [session]);

  return (
    <div ref={mapContainerRef} style={{ height: "100%" }}>
      {defaultCenter && defaultZoom && (
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
        >
          {session.listings?.map((listing) => (
            <ListingMarker
              lat={listing.location.lat}
              lng={listing.location.lng}
            />
          ))}
        </GoogleMapReact>
      )}
    </div>
  );
}
