import React from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Card from "react-bootstrap/Card";
import { SessionContext } from "../../Contexts/SessionContext";

export default function ExistingSessionsSection() {
  const { sessions: existingSessions, loadingSessions } = React.useContext(
    SessionContext
  );

  function getContent() {
    if (loadingSessions) return <LoadingSpinner text="Loading sessions..." />;
    else if (existingSessions.length > 0)
      return <div>You have some sessions</div>;
    else return <div>No existing sessions</div>;
  }

  return (
    <Card>
      <Card.Header>My Sessions</Card.Header>
      <Card.Body>{getContent()}</Card.Body>
    </Card>
  );
}
