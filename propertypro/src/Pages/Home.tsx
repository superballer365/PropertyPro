import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { AuthorizationContext } from "../Contexts/AuthorizationContext";

export default function Home() {
  const { user, signOut } = React.useContext(AuthorizationContext);

  return (
    <Container className="p-3">
      <h2>Hello {user?.signInUserSession?.idToken?.payload?.email}</h2>
      <Button variant="primary" onClick={() => signOut()}>Sign out</Button>
    </Container>
  )
}