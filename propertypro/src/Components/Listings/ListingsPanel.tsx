import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./ListingsPanel.module.scss";
import SessionData from "../../Models/Session";
import NewListingDialog from "./NewListingDialog";
import ListingsList from "./ListingsList";
import { ListingContext } from "../../Contexts/ListingContext";
import ListingEditor from "./ListingEditor";

export default function ListingsPanel({ session }: IProps) {
  const { selectedListing } = React.useContext(ListingContext);

  const [creatingNewListing, setCreatingNewListing] = React.useState(false);

  function getContent() {
    // if we have a selected listing, show it
    if (selectedListing)
      return <ListingEditor session={session} listing={selectedListing} />;

    // otherwise, render the list of listings
    return (
      <ListingsList
        onCreateNewListingClick={() => setCreatingNewListing(true)}
        session={session}
      />
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
      <div className={styles.container}>{getContent()}</div>
    </>
  );
}

interface IProps {
  session: SessionData;
}
