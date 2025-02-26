import { useState } from "react";
import { Form, Button, Container, ProgressBar } from "react-bootstrap";

const MedicalEligibilityScreening = () => {
  const [formData, setFormData] = useState({
    healthConditions: "",
    medications: "",
    travelHistory: "",
    vaccinationStatus: []
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.healthConditions) newErrors.healthConditions = "Please select a health condition";
    if (!formData.medications) newErrors.medications = "Please provide medication details";
    if (!formData.travelHistory) newErrors.travelHistory = "Please select your recent travel history";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        vaccinationStatus: checked
          ? [...formData.vaccinationStatus, value]
          : formData.vaccinationStatus.filter((v) => v !== value)
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Medical eligibility screening completed successfully!");
    }
  };

  return (
    <Container className="mt-5 p-4 border rounded shadow-lg" style={{ maxWidth: "500px", backgroundColor: "#fff" }}>
      <h4 className="text-center mb-3">Medical Eligibility Screening (Step 3 of 6)</h4>
      <ProgressBar now={60} label={`60%`} className="mb-3" />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Health Conditions</Form.Label>
          <Form.Select name="healthConditions" value={formData.healthConditions} onChange={handleChange} isInvalid={!!errors.healthConditions}>
            <option value="">Select Condition</option>
            <option value="None">None</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Hypertension">Hypertension</option>
            <option value="Heart Disease">Heart Disease</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.healthConditions}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Medications</Form.Label>
          <Form.Control type="text" name="medications" value={formData.medications} onChange={handleChange} isInvalid={!!errors.medications} />
          <Form.Control.Feedback type="invalid">{errors.medications}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Recent Travel History</Form.Label>
          <Form.Select name="travelHistory" value={formData.travelHistory} onChange={handleChange} isInvalid={!!errors.travelHistory}>
            <option value="">Select</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.travelHistory}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Vaccination Status</Form.Label>
          <div>
            <Form.Check type="checkbox" label="COVID-19" value="COVID-19" onChange={handleChange} checked={formData.vaccinationStatus.includes("COVID-19")} />
            <Form.Check type="checkbox" label="Hepatitis B" value="Hepatitis B" onChange={handleChange} checked={formData.vaccinationStatus.includes("Hepatitis B")} />
            <Form.Check type="checkbox" label="Tetanus" value="Tetanus" onChange={handleChange} checked={formData.vaccinationStatus.includes("Tetanus")} />
          </div>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">Next</Button>
      </Form>
    </Container>
  );
};

export default MedicalEligibilityScreening;
