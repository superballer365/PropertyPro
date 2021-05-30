import React from "react";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Card from "react-bootstrap/Card";
import { SessionContext } from "../../Contexts/SessionContext";
import SessionData from "../../Models/Session";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import SessionDialog from "./SessionDialog";

export default function ExistingSessionsSection() {
  const { sessions: existingSessions, loadingSessions } =
    React.useContext(SessionContext);

  const [sessionToEdit, setSessionToEdit] =
    React.useState<SessionData | undefined>(undefined);
  const isEditing = !!sessionToEdit;

  function handleEditClick(session: SessionData) {
    setSessionToEdit(session);
  }

  function getContent() {
    if (loadingSessions) return <LoadingSpinner text="Loading sessions..." />;
    else if (existingSessions.length > 0)
      return (
        <div>
          {existingSessions.map((session) => (
            <SessionEntry
              key={session.id}
              sessionData={session}
              onEditClick={handleEditClick}
            />
          ))}
        </div>
      );
    else return <div>No existing sessions</div>;
  }

  return (
    <>
      {isEditing && (
        <SessionDialog
          type="update"
          open={isEditing}
          session={sessionToEdit}
          onClose={() => setSessionToEdit(undefined)}
        />
      )}
      <Card>
        <Card.Header>My Sessions</Card.Header>
        <Card.Body>{getContent()}</Card.Body>
      </Card>
    </>
  );
}

interface ISessionEntryProps {
  sessionData: SessionData;
  onEditClick: (session: SessionData) => void;
}

function SessionEntry({ sessionData, onEditClick }: ISessionEntryProps) {
  const { deleteSession, markDirty } = React.useContext(SessionContext);
  const [deletingSession, setDeletingSession] = React.useState(false);

  const history = useHistory();

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

  function handleEditClick() {
    onEditClick(sessionData);
  }

  function handleOpenClick() {
    history.push(`/Session/${sessionData.id!}`);
  }

  return (
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>{sessionData.name}</div>
          <div>
            <Button variant="primary" onClick={handleOpenClick}>
              Open
            </Button>{" "}
            <Button variant="primary" onClick={handleEditClick}>
              Edit
            </Button>{" "}
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
