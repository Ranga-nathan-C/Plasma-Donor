import { useState } from "react";
import { Form, Button, Container, ProgressBar } from "react-bootstrap";

const Eligibility = () => {
  const user_id = JSON.parse(sessionStorage.getItem("user")).user.id;

  const [formData, setFormData] = useState({
    health_conditions: "",
    medications: "",
    travel_history: "",
    vaccination_status: [],
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.health_conditions)
      newErrors.health_conditions = "Please select a health condition";
    if (!formData.medications)
      newErrors.medications = "Please provide medication details";
    if (!formData.travel_history)
      newErrors.travel_history = "Please select your recent travel history";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        vaccination_status: checked
          ? [...formData.vaccination_status, value]
          : formData.vaccination_status.filter((v) => v !== value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${user_id}/medical`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        alert("Medical eligibility screening completed successfully!");

        console.log("Response:", data);
        window.location.href = "/Consent";
      } catch (error) {
        console.error("Error submitting eligibility:", error.message);
      }
    }
  };

  return (
    <Container
      className="mt-5 p-4 border rounded shadow-lg"
      style={{ maxWidth: "500px", backgroundColor: "#fff" }}
    >
      <h4 className="text-center mb-3">
        Medical Eligibility Screening (Step 3 of 6)
      </h4>
      <ProgressBar now={40} label={`40%`} className="mb-3" />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Health Conditions</Form.Label>
          <Form.Select
            name="health_conditions"
            value={formData.health_conditions}
            onChange={handleChange}
            isInvalid={!!errors.health_conditions}
          >
            <option value="">Select Condition</option>
            <option value="None">None</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Hypertension">Hypertension</option>
            <option value="Heart Disease">Heart Disease</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.health_conditions}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Medications</Form.Label>
          <Form.Control
            type="text"
            name="medications"
            value={formData.medications}
            onChange={handleChange}
            isInvalid={!!errors.medications}
          />
          <Form.Control.Feedback type="invalid">
            {errors.medications}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Recent Travel History</Form.Label>
          <Form.Select
            name="travel_history"
            value={formData.travel_history}
            onChange={handleChange}
            isInvalid={!!errors.travel_history}
          >
            <option value="">Select</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.travel_history}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Vaccination Status</Form.Label>
          <div>
            <Form.Check
              type="checkbox"
              label="COVID-19"
              value="COVID-19"
              onChange={handleChange}
              checked={formData.vaccination_status.includes("COVID-19")}
            />
            <Form.Check
              type="checkbox"
              label="Hepatitis B"
              value="Hepatitis B"
              onChange={handleChange}
              checked={formData.vaccination_status.includes("Hepatitis B")}
            />
            <Form.Check
              type="checkbox"
              label="Tetanus"
              value="Tetanus"
              onChange={handleChange}
              checked={formData.vaccination_status.includes("Tetanus")}
            />
          </div>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Next
        </Button>
      </Form>
    </Container>
  );
};

export default Eligibility;
