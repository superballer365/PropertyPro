import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GetSessionQuery } from "../API";
import LoadingSpinner from "../Components/LoadingSpinner/LoadingSpinner";
import SessionViewerDashboard from "../Components/SessionViewerDashboard/SessionViewerDashboard";
import callGraphQL from "../graphql/callGraphQL";
import { getSession } from "../graphql/queries";
import SessionData, { mapGetSession } from "../Models/Session";
import ErrorPage from "./ErrorPage";

interface RouteParams {
  sessionId: string;
}

export default function SessionViewerPage() {
  const { sessionId } = useParams<RouteParams>();

  const {
    isLoading: loadingSessions,
    isError,
    data: matchingSession,
  } = useQuery<SessionData | undefined>(["session", sessionId], async () => {
    console.log(sessionId);
    const result = await callGraphQL<GetSessionQuery>(getSession, {
      id: sessionId,
    });
    return mapGetSession(result);
  });
  const [sessionLoadError, setSessionLoadError] = React.useState(false);
  const [sessionFromRoute, setSessionFromRoute] = React.useState<SessionData>();

  // set the selected session based on the ID from the route
  React.useEffect(() => {
    if (loadingSessions) return;
    if (!sessionId) {
      setSessionLoadError(true);
      return;
    }

    if (!matchingSession) {
      setSessionLoadError(true);
    } else {
      setSessionFromRoute(matchingSession);
      setSessionLoadError(false);
    }
  }, [sessionId, loadingSessions, matchingSession]);

  if (sessionLoadError)
    return (
      <ErrorPage text="Could not find a session matching the specified id." />
    );
  if (loadingSessions || !sessionFromRoute)
    return <LoadingSpinner text="loading session..." />;
  return <SessionViewerDashboard session={sessionFromRoute} />;
}
