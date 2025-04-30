import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { CarModel } from "../../types/types";

const DrivableModels = () => {
  const [models, setModels] = useState<CarModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await axios.get<CarModel[]>("/api/driver/models");
        setModels(res.data);
      } catch {
        setError("Failed to load car models");
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

  if (loading)
    return (
      <Container className="text-center mt-4">
        <Spinner animation="border" />
        <p>Loading models...</p>
      </Container>
    );

  if (error)
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );

  return (
    <Container className="mt-4">
      <h3 className="mb-3">Available Car Models</h3>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {models.map((model) => (
          <Col key={`${model.model_id}-${model.car_id}`}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{model.brand}</Card.Title>
                <Card.Text>
                  <strong>Color:</strong> {model.color} <br />
                  <strong>Transmission:</strong>{" "}
                  {model.transmission.toUpperCase()} <br />
                  <strong>Year:</strong> {model.construction_year} <br />
                  <strong>Model ID:</strong> {model.model_id} <br />
                  <strong>Car ID:</strong> {model.car_id}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DrivableModels;
