import React from "react";
import Container from "react-bootstrap/Container";

interface IProps {
  text?: string;
}

export default function ErrorPage({ text }: IProps) {
  return (
    <Container className="p-3 text-center">
      {text ?? "application error"}
    </Container>
  );
}
