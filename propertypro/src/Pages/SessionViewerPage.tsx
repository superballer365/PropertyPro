import React from "react";
import { useParams } from "react-router-dom";
import { SessionContext } from "../Contexts/SessionContext";

interface RouteParams {
  sessionId: string;
}

export default function SessionViewerPage() {
  const {
    setSelectedSession,
    selectedSession,
    loadingSessions,
  } = React.useContext(SessionContext);
  const { sessionId } = useParams<RouteParams>();

  console.log("session id: " + sessionId);

  return <div>Session Viewer</div>;
}
