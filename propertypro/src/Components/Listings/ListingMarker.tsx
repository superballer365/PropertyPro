import React from "react";
import houseImg from "../../Images/house.png";
import { Listing } from "../../Models/Session";
import styles from "./ListingMarker.module.scss";

export default function ListingMarker({ lat, lng }: ListingMarkerProps) {
  return <img className={styles.container} src={houseImg} />;
}

export interface ListingMarkerProps {
  listing: Listing;
  lat: number;
  lng: number;
}
