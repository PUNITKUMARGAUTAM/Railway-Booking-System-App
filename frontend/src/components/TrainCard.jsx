import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

export default function TrainCard({ train, onBook }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col md={8}>
            <h5>{train.name}</h5>
            <div><strong>From:</strong> {train.from} <strong>To:</strong> {train.to}</div>
            <div><strong>Departure:</strong> {train.departure} <strong>Arrival:</strong> {train.arrival}</div>
            <div><strong>Seats:</strong> {train.seatsAvailable}</div>
          </Col>
          <Col md={4} className="d-flex align-items-center justify-content-end">
            <Button disabled={train.seatsAvailable <= 0} onClick={() => onBook(train)}>Book</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
