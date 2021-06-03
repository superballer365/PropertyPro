import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import styles from "./ListingsPanel.module.scss";
import SessionData from "../../Models/Session";

export default function ListingsPanel({ session }: IProps) {
  function getContent() {
    if (!session.listings || session.listings.length < 1) return "No listings";

    return (
      <ListGroup>
        {session.listings.map((listing) => (
          <ListGroupItem key={listing.id}>{listing.name}</ListGroupItem>
        ))}
      </ListGroup>
    );
  }

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Card.Header className={styles.header}>
          <span className={styles.title}>Listings</span>
          <Button>+</Button>
        </Card.Header>
        <Card.Body>{getContent()}</Card.Body>
      </Card>
    </div>
  );
}

interface IProps {
  session: SessionData;
}
