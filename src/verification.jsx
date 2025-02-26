import { useState } from "react";
import { Form, Button, Container, ProgressBar } from "react-bootstrap";

const VerificationStep = () => {
  const [formData, setFormData] = useState({
    governmentId: null,
    photograph: null,
    medicalCertification: null
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Verification details submitted!");
  };

  return (
    <Container className="mt-5 p-4 border rounded shadow-lg" style={{ maxWidth: "500px", backgroundColor: "#fff" }}>
      <h4 className="text-center mb-3">Verification (Step 6 of 6)</h4>
      <ProgressBar now={100} label={`100%`} className="mb-3" />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Government-Issued ID Upload</Form.Label>
          <Form.Control type="file" name="governmentId" onChange={handleFileChange} accept="image/*,.pdf" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Photograph Upload</Form.Label>
          <Form.Control type="file" name="photograph" onChange={handleFileChange} accept="image/*" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Medical Certification Upload (if required)</Form.Label>
          <Form.Control type="file" name="medicalCertification" onChange={handleFileChange} accept="image/*,.pdf" />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">Submit</Button>
      </Form>
    </Container>
  );
};

export default VerificationStep;
