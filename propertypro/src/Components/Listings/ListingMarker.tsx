import React from "react";
import houseImg from "../../Images/house.png";
import styles from "./ListingMarker.module.scss";

export default function ListingMarker({ lat, lng }: IProps) {
  return <img className={styles.container} src={houseImg} />;
}

interface IProps {
  lat: number;
  lng: number;
}
