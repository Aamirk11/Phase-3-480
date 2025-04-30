import { useEffect, useState } from "react";
import { getAllModels, declareDrivableModels } from "./api/driverApi";
import { useAuth } from "../../context/AuthContext";
import { CarModel } from "../../types/types";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";

const DeclareDrivableModels = () => {
  const { userData } = useAuth();
  const [models, setModels] = useState<CarModel[]>([]);
  const [selectedModels, setSelectedModels] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await getAllModels();
        setModels(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load car models");
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, []);

  const toggleSelection = (model_id: number, car_id: number) => {
    const key = `${model_id}-${car_id}`;
    setSelectedModels((prev) =>
      prev.has(key) ? new Set([...prev].filter((k) => k !== key)) : new Set(prev).add(key)
    );
  };

  const handleSubmit = async () => {
    if (!userData?.driver_id) {
      setError("Driver ID not found.");
      return;
    }

    const modelsToSend = Array.from(selectedModels).map((key) => {
      const [model_id, car_id] = key.split("-").map(Number);
      return { model_id, car_id };
    });

    try {
      await declareDrivableModels(userData.driver_id, modelsToSend);
      setSuccess("Successfully declared drivable models!");
      setError("");
      setSelectedModels(new Set()); // Clear selected after submit
    } catch (err) {
      console.error(err);
      setError("Failed to submit models.");
      setSuccess("");
    }
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
        <p>Loading models...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3>Declare Models You Can Drive</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form>
        {models.map((model) => {
          const key = `${model.model_id}-${model.car_id}`;
          return (
            <Form.Check
              key={key}
              type="checkbox"
              id={key}
              label={`${model.brand} - ${model.color}, ${model.transmission} (${model.construction_year})`}
              checked={selectedModels.has(key)}
              onChange={() => toggleSelection(model.model_id, model.car_id)}
            />
          );
        })}

        <Button className="mt-3" variant="primary" onClick={handleSubmit}>
          Submit Selected Models
        </Button>
      </Form>
    </Container>
  );
};

export default DeclareDrivableModels;
