import React from "react";
import GoogleMapReact from "google-map-react";

export default function Map() {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY! }}
      defaultCenter={{ lat: 41.51921, lng: -73.09756 }}
      defaultZoom={10}
    ></GoogleMapReact>
  );
}
