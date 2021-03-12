import React from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Card from "react-bootstrap/Card";
import { SessionContext } from "../../Contexts/SessionContext";
import SessionData from "../../Models/Session";
import Button from "react-bootstrap/Button";

export default function ExistingSessionsSection() {
  const { sessions: existingSessions, loadingSessions } = React.useContext(
    SessionContext
  );

  function getContent() {
    if (loadingSessions) return <LoadingSpinner text="Loading sessions..." />;
    else if (existingSessions.length > 0)
      return (
        <div>
          {existingSessions.map((session) => (
            <SessionEntry sessionData={session} />
          ))}
        </div>
      );
    else return <div>No existing sessions</div>;
  }

  return (
    <Card>
      <Card.Header>My Sessions</Card.Header>
      <Card.Body>{getContent()}</Card.Body>
    </Card>
  );
}

interface ISessionEntryProps {
  sessionData: SessionData;
}

function SessionEntry({ sessionData }: ISessionEntryProps) {
  return (
    <Card>
      <Card.Body className="d-flex flex-row">
        <div className="justify-content-start">{sessionData.name}</div>
        <div className="justify-content-end">
          <Button>Open</Button>
          <Button>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
