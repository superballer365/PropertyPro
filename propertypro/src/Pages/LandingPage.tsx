import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { AuthorizationContext } from "../Contexts/AuthorizationContext";

export default function LandingPage() {
  const { signIn } = React.useContext(AuthorizationContext);

  return (
    <Container className="p-3 h-100 align-items-center container" fluid>
      <Row className="row h-100 align-items-center justify-content-center">
        <Col>
          <Row>
            <Col className="col justify-self-center text-center">
              <h2>Welcome to PropertyPro!</h2>
            </Col>
          </Row>
          <Row>
            <Col className="col justify-self-center text-center">
              <Button variant="primary" onClick={signIn}>
                Sign In
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
