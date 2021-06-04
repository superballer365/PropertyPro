import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import SessionData, { Listing } from "../../Models/Session";
import styles from "./ListingsList.module.scss";

export default function ListingsList({ session }: IListingsListProps) {
  if (!session.listings || session.listings.length < 1)
    return <Card.Body>No listings</Card.Body>;

  return (
    <ListGroup>
      {session.listings.map((listing) => (
        <ListingsListItem key={listing.id} listing={listing} />
      ))}
    </ListGroup>
  );
}

interface IListingsListProps {
  session: SessionData;
}

function ListingsListItem({ listing }: IListingsListItemProps) {
  return (
    <ListGroupItem className={styles.listItem}>{listing.name}</ListGroupItem>
  );
}

interface IListingsListItemProps {
  listing: Listing;
}
