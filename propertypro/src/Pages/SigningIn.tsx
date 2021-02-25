import React from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

export default function SigningIn() {
  return <Container className="p-3">
    <Spinner variant="primary" animation="border" title="signing in..."/>
    <p>signing in...</p>
  </Container>
}