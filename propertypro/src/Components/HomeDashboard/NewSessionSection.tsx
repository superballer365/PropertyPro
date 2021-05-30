import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import customStyles from "./NewSessionSection.module.scss";
import NewSessionDialog from "./NewSessionDialog";

export default function NewSessionSection() {
  const [showingModal, setShowingModal] = React.useState(false);

  return (
    <>
      {showingModal && (
        <NewSessionDialog onClose={() => setShowingModal(false)} />
      )}
      <Jumbotron className={customStyles.jumbotron}>
        <h4>Create a new search session!</h4>
        <p>
          Search for new properties with friends by creating a new search
          session
        </p>
        <p>
          <Button variant="primary" onClick={() => setShowingModal(true)}>
            Create Session
          </Button>
        </p>
      </Jumbotron>
    </>
  );
}
