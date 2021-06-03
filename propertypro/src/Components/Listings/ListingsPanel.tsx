import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./ListingsPanel.module.scss";

export default function ListingsPanel() {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Card.Header className={styles.header}>
          <span className={styles.title}>Listings</span>
          <Button>+</Button>
        </Card.Header>
        <Card.Body>No listings</Card.Body>
      </Card>
    </div>
  );
}
