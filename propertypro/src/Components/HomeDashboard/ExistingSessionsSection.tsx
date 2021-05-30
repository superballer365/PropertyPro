import React from "react";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Card from "react-bootstrap/Card";
import SessionData from "../../Models/Session";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import EditSessionDialog from "./EditSessionDialog";
import { useDeleteSession, useSessions } from "../../Utils/Hooks";

export default function ExistingSessionsSection() {
  const {
    isLoading: loadingSessions,
    isError,
    data: existingSessions,
  } = useSessions();

  const [sessionToEdit, setSessionToEdit] =
    React.useState<SessionData | undefined>(undefined);

  function handleEditClick(session: SessionData) {
    setSessionToEdit(session);
  }

  function getContent() {
    if (loadingSessions) return <LoadingSpinner text="Loading sessions..." />;

    if (existingSessions && existingSessions.length > 0)
      return (
        <div>
          {existingSessions?.map((session) => (
            <SessionEntry
              key={session.id}
              sessionData={session}
              onEditClick={handleEditClick}
            />
          ))}
        </div>
      );

    return <div>No existing sessions</div>;
  }

  return (
    <>
      {sessionToEdit && (
        <EditSessionDialog
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
  const deleteSessionMutation = useDeleteSession();

  const [deletingSession, setDeletingSession] = React.useState(false);

  const history = useHistory();

  async function handleDeleteClick() {
    if (deletingSession) return;

    setDeletingSession(true);
    await deleteSessionMutation.mutateAsync(sessionData.id!);
    setDeletingSession(false);
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
