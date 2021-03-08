import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

interface IProps {
  text?: string;
}

export default function LoadingSpinner({ text }: IProps) {
  return (
    <Container className="p-3 h-100 align-items-center container" fluid>
      <Row className="row h-100 align-items-center justify-content-center">
        <Col>
          <Row>
            <Col className="col justify-self-center text-center">
              <Spinner animation="border" variant="primary" />
            </Col>
          </Row>
          <Row>
            <Col className="col justify-self-center text-center">
              {text ?? "loading..."}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
