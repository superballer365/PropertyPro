import React from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Card from "react-bootstrap/Card";
import { SessionContext } from "../../Contexts/SessionContext";
import SessionData from "../../Models/Session";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

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
            <SessionEntry key={session.id} sessionData={session} />
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
  const { deleteSession, markDirty } = React.useContext(SessionContext);
  const [deletingSession, setDeletingSession] = React.useState(false);

  async function handleDeleteClick() {
    if (deletingSession) return;

    setDeletingSession(true);
    const deleted = await deleteSession(sessionData.id!);
    setDeletingSession(false);

    if (deleted) {
      markDirty();
    } else {
      // should throw toast
      console.log("Failed to delete session!");
    }
  }

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>{sessionData.name}</div>
          <div>
            <Button variant="primary">Open</Button>{" "}
            <Button variant="danger" onClick={handleDeleteClick}>
              {deletingSession ? (
                <Spinner animation="border" variant="primary" size="sm" />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
