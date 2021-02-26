import React from "react";
import Container from "react-bootstrap/Container";
import { AuthorizationContext } from "../Contexts/AuthorizationContext";

export default function Home() {
  const { user } = React.useContext(AuthorizationContext);

  return (
    <Container className="p-3" fluid>
      <h2>Hello {user?.signInUserSession?.idToken?.payload?.email}</h2>
    </Container>
  );
}
