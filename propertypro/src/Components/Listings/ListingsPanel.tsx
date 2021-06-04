import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./ListingsPanel.module.scss";
import SessionData from "../../Models/Session";
import NewListingDialog from "./NewListingDialog";
import ListingsList from "./ListingsList";

export default function ListingsPanel({ session }: IProps) {
  const [creatingNewListing, setCreatingNewListing] = React.useState(false);

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
          <ListingsList session={session} />
        </Card>
      </div>
    </>
  );
}

interface IProps {
  session: SessionData;
}
