import React from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

export default function SigningIn() {
  return <Container>
    <Spinner animation="border"/>
    <h4>signing in...</h4>
  </Container>
}