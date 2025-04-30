import React, { FormEvent } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { registerManager } from "./api/managerApi";

export default function RegisterManager() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      ssn: formData.get("ssn") as string,
      email: formData.get("email") as string,
    };

    try {
      await registerManager(data);
      alert("Manager registered successfully!");
    } catch (error: any) {
      if (error.response.data) alert(error.response.data.message);
      else alert("There was an error registering the manager.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Name" name="name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formSSN">
        <Form.Label>SNN</Form.Label>
        <Form.Control type="text" placeholder="SSN" name="ssn" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" />
      </Form.Group>
      <Button variant="warning" type="submit">
        Submit
      </Button>
    </Form>
  );
}
