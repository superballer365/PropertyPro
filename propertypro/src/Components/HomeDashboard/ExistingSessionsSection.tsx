import React from "react";
import { listSessions } from "../../graphql/queries";
import SessionData, { mapListSessions } from "../../Models/Session";
import callGraphQL from "../../graphql/callGraphQL";
import { ListSessionsQuery } from "../../API";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Card from "react-bootstrap/Card";

export default function ExistingSessionsSection() {
  const [loadingSessions, setLoadingSessions] = React.useState(false);
  const [existingSessions, setExistingSessions] = React.useState<SessionData[]>(
    []
  );

  React.useEffect(() => {
    let isStale = false;

    setLoadingSessions(true);
    callGraphQL<ListSessionsQuery>(listSessions)
      .then((result) => {
        const sessions = mapListSessions(result);
        !isStale && setExistingSessions(sessions);
      })
      .catch((err) => console.error("Error getting sessions", err))
      .finally(() => !isStale && setLoadingSessions(false));

    return () => {
      isStale = true;
    };
  }, []);

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