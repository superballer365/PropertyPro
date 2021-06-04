import React from "react";
import GoogleMapReact, { fitBounds } from "google-map-react";
import { Coordinate } from "../../API/Google Places/Geocoding";
import SessionData from "../../Models/Session";
import ListingMarker from "../Listings/ListingMarker";
import { ListingContext } from "../../Contexts/ListingContext";

interface IProps {
  session: SessionData;
}

export default function Map({ session }: IProps) {
  const { selectedListing } = React.useContext(ListingContext);

  const [zoom, setZoom] = React.useState<number>();
  const [center, setCenter] = React.useState<Coordinate>();

  // default zoom and center, to be used for resetting
  const defaultZoomRef = React.useRef<number>();
  const defaultCenterRef = React.useRef<Coordinate>();
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
    setCenter(center);
    setZoom(zoom);
    defaultCenterRef.current = center;
    defaultZoomRef.current = zoom;
    loaded.current = true;
  }, [session]);

  // update the zoom and center when the selected listing changes
  React.useEffect(() => {
    if (selectedListing) {
      setZoom(17);
      setCenter(selectedListing.location);
      return;
    }

    // reset the zoom and center if no listing is selected
    setZoom(defaultZoomRef.current);
    setCenter(defaultCenterRef.current);
  }, [selectedListing]);

  return (
    <div ref={mapContainerRef} style={{ height: "100%" }}>
      {center && zoom && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY! }}
          center={center}
          zoom={zoom}
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
