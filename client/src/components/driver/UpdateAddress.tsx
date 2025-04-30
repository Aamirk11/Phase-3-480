import { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const UpdateAddress = () => {
  const { userData } = useAuth();
  const [roadName, setRoadName] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/driver/${userData?.driver_id}/address`, {

        road_name: roadName,
        number,
        city,
      });
      console.log("userData: ", userData)

      setSuccess("Address updated successfully!");
      setError("");
    } catch (err) {
      setError("Failed to update address.");
      setSuccess("");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "30rem", padding: "20px" }}>
        <h3 className="text-center mb-4">Update Address</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Road Name</Form.Label>
          <Form.Control value={roadName} onChange={(e) => setRoadName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>House Number</Form.Label>
          <Form.Control value={number} onChange={(e) => setNumber(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control value={city} onChange={(e) => setCity(e.target.value)} />
        </Form.Group>
        <Button className="w-100" onClick={handleUpdate}>
          Update Address
        </Button>
      </Card>
    </Container>
  );
};

export default UpdateAddress;
