import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import styles from "./ListingsPanel.module.scss";
import SessionData from "../../Models/Session";
import NewListingDialog from "./NewListingDialog";

export default function ListingsPanel({ session }: IProps) {
  const [creatingNewListing, setCreatingNewListing] = React.useState(false);

  function getContent() {
    if (!session.listings || session.listings.length < 1)
      return <Card.Body>No listings</Card.Body>;

    return (
      <ListGroup>
        {session.listings.map((listing) => (
          <ListGroupItem key={listing.id}>{listing.name}</ListGroupItem>
        ))}
      </ListGroup>
    );
  }

  return (
    <>
      {creatingNewListing && (
        <NewListingDialog
          session={session}
          onClose={() => setCreatingNewListing(false)}
        />
      )}
      <div className={styles.container}>
        <Card className={styles.card}>
          <Card.Header className={styles.header}>
            <span className={styles.title}>Listings</span>
            <Button onClick={() => setCreatingNewListing(true)}>+</Button>
          </Card.Header>
          {getContent()}
        </Card>
      </div>
    </>
  );
}

interface IProps {
  session: SessionData;
}
