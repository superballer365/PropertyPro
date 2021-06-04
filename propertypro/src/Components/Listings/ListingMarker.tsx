import React from "react";
import classNames from "classnames";
import houseImg from "../../Images/house.png";
import { Listing } from "../../Models/Session";
import styles from "./ListingMarker.module.scss";

export default function ListingMarker({
  lat,
  lng,
  hovered,
}: ListingMarkerProps) {
  return (
    <img
      className={classNames(styles.container, hovered && styles.hovered)}
      src={houseImg}
    />
  );
}

export interface ListingMarkerProps {
  listing: Listing;
  hovered?: boolean;
  lat: number;
  lng: number;
}
