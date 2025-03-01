import { useState } from "react";
import { Form, Button, Container, ProgressBar } from "react-bootstrap";

const Verification = () => {
  const user_id = JSON.parse(sessionStorage.getItem("user")).user.id;

  const [formData, setFormData] = useState({
    government_id_url: null,
    photograph_url: null,
    medical_certification_url: null,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("government_id", formData.government_id_url);
    formDataToSend.append("photograph", formData.photograph_url);
    formDataToSend.append(
      "medical_certificate",
      formData.medical_certification_url
    );


    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${user_id}/verify`,
        {
          method: "POST",
          body: formDataToSend, // No need for Content-Type header, fetch sets it automatically for FormData
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit verification details");
      }
      const data = await response.json();

      alert("Verification details submitted successfully!");
      window.location.href = "/Home2";
      sessionStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };


  return (
    <Container
      className="mt-5 p-4 border rounded shadow-lg"
      style={{ maxWidth: "500px", backgroundColor: "#fff" }}
    >
      <h4 className="text-center mb-3">Verification (Step 6 of 6)</h4>
      <ProgressBar now={90} label={`90%`} className="mb-3" />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Government-Issued ID Upload</Form.Label>
          <Form.Control
            type="file"
            name="government_id_url"
            onChange={handleFileChange}
            accept="image/*,.pdf"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Photograph_url Upload</Form.Label>
          <Form.Control
            type="file"
            name="photograph_url"
            onChange={handleFileChange}
            accept="image/*"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Medical Certification Upload (if required)</Form.Label>
          <Form.Control
            type="file"
            name="medical_certification_url"
            onChange={handleFileChange}
            accept="image/*,.pdf"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Verification;
