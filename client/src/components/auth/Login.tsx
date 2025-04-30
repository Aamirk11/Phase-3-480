import axios from "axios";
import { FormEvent, useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Client, Roles } from "../../types/types";
import { loginManager } from "../manager/api/managerApi";

import { loginDriver } from "../driver/api/driverApi";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState<string>("");
  const [role, setRole] = useState<Roles | undefined>(Roles.MANAGER);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!role) {
      setError("You must select a role.");
      return;
    }
    if (!credentials) {
      setError("You must provide credentials.");
      return;
    }

    setError("");

    try {
      let response;
      if (role === Roles.MANAGER) {
        const { data } = await loginManager({ ssn: credentials });
        login(role, data);
        navigate("/manager");
      } else if (role === Roles.DRIVER) {
        const { data } = await loginDriver({ name: credentials });
        login(role, data);
        navigate("/driver");
      } else if (role === Roles.CLIENT) {
        response = await axios.post<Client>("/api/client/auth/login", {
          email: credentials,
        });
        login(role, response?.data);
      }
    } catch (err) {
      // Handle API errors
      if (axios.isAxiosError(err)) {
        setError(
          `Error: ${err.response?.data?.message || "Something went wrong"}`
        );
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "22rem", padding: "20px" }}>
        <Card.Body>
          <h3 className="text-center mb-4">Taxi Rental Login</h3>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>Select Role</Form.Label>
              <Form.Select
                value={role}
                onChange={(e) => setRole(e.target.value as Roles)}
              >
                <option value={Roles.MANAGER}>Manager</option>
                <option value={Roles.DRIVER}>Driver</option>
                <option value={Roles.CLIENT}>Client</option>
              </Form.Select>
            </Form.Group>
            {role && (
              <Form.Group className="mb-3" controlId="credentials">
                {role === Roles.MANAGER && <Form.Label>SSN</Form.Label>}
                {role === Roles.DRIVER && <Form.Label>Name</Form.Label>}
                {role === Roles.CLIENT && <Form.Label>Email</Form.Label>}
                <Form.Control
                  type="text"
                  placeholder="Enter your credentials"
                  value={credentials}
                  onChange={(e) => setCredentials(e.target.value)}
                />
              </Form.Group>
            )}

            <Button variant="warning" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
