import React from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";
import SessionViewerDashboard from "../Components/SessionViewerDashboard/SessionViewerDashboard";
import { SessionContext } from "../Contexts/SessionContext";
import SessionData from "../Models/Session";
import ErrorPage from "./ErrorPage";

interface RouteParams {
  sessionId: string;
}

export default function SessionViewerPage() {
  const { loadingSessions, sessions } = React.useContext(SessionContext);
  const [sessionLoadError, setSessionLoadError] = React.useState(false);
  const [sessionFromRoute, setSessionFromRoute] = React.useState<SessionData>();
  const { sessionId } = useParams<RouteParams>();

  // set the selected session based on the ID from the route
  React.useEffect(() => {
    if (loadingSessions) return;
    if (!sessionId) {
      setSessionLoadError(true);
      return;
    }

    const matchingSesion = sessions.find((session) => session.id === sessionId);
    if (!matchingSesion) {
      setSessionLoadError(true);
    } else {
      setSessionFromRoute(matchingSesion);
      setSessionLoadError(false);
    }
  }, [sessionId, loadingSessions, sessions]);

  if (sessionLoadError)
    return (
      <ErrorPage text="Could not find a session matching the specified id." />
    );
  if (loadingSessions || !sessionFromRoute)
    return <LoadingSpinner text="loading session..." />;
  return <SessionViewerDashboard session={sessionFromRoute} />;
}
