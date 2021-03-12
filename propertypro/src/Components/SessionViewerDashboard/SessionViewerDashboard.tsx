import React from "react";
import SessionData from "../../Models/Session";
import styles from "./SessionViewerDashboard.module.scss";

interface IProps {
  session: SessionData;
}

export default function SessionViewerDashboard({ session }: IProps) {
  return (
    <div className={styles.container}>
      <div className={styles.listingsPanel}>listings panel</div>
      <div className={styles.mapContainer}>map container</div>
    </div>
  );
}
