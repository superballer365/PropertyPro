import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { withHeader } from "../Components/Header/Header";

export interface ILoadingPageProps extends IBaseLoadingPageProps {
  showHeader?: boolean;
}

export default function LoadingPage({ text, showHeader }: ILoadingPageProps) {
  if (showHeader) return <LoadingPageWithHeader text={text} />;
  else return <BaseLoadingPage text={text} />;
}

export interface IBaseLoadingPageProps {
  text?: string;
}

function BaseLoadingPage({ text }: IBaseLoadingPageProps) {
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

const LoadingPageWithHeader = withHeader(BaseLoadingPage);
