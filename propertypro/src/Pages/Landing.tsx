import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { AuthorizationContext } from "../Contexts/AuthorizationContext";

export default function Landing() {
  const { signIn } = React.useContext(AuthorizationContext);

  return (
    <Container className="p-3">
      <h2>Welcome to PropertyPro!</h2>
      <Button variant="primary" onClick={signIn}>Sign In</Button>
    </Container>
  )
}