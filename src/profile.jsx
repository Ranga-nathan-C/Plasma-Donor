import { useState } from "react";
import { Form, Button, Container, ProgressBar } from "react-bootstrap";

const ProfileCompletion = () => {
  const [formData, setFormData] = useState({
    address: "",
    bloodType: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    notifications: false
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.bloodType) newErrors.bloodType = "Please select a blood type";
    if (!formData.emergencyContactName) newErrors.emergencyContactName = "Emergency contact name is required";
    if (!/^\d{10}$/.test(formData.emergencyContactPhone)) newErrors.emergencyContactPhone = "Phone number must be 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Profile completed successfully!");
    }
  };

  return (
    <Container className="mt-5 p-4 border rounded shadow-lg" style={{ maxWidth: "500px", backgroundColor: "#fff" }}>
      <h4 className="text-center mb-3">Profile Completion (Step 2 of 6)</h4>
      <ProgressBar now={40} label={`40%`} className="mb-3" />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} isInvalid={!!errors.address} />
          <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Blood Type</Form.Label>
          <Form.Select name="bloodType" value={formData.bloodType} onChange={handleChange} isInvalid={!!errors.bloodType}>
            <option value="">Select Blood Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.bloodType}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Emergency Contact Name</Form.Label>
          <Form.Control type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} isInvalid={!!errors.emergencyContactName} />
          <Form.Control.Feedback type="invalid">{errors.emergencyContactName}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Emergency Contact Phone</Form.Label>
          <Form.Control type="tel" name="emergencyContactPhone" value={formData.emergencyContactPhone} onChange={handleChange} isInvalid={!!errors.emergencyContactPhone} />
          <Form.Control.Feedback type="invalid">{errors.emergencyContactPhone}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check 
            type="checkbox" 
            label="Opt-in for notifications and alerts"
            name="notifications"
            checked={formData.notifications}
            onChange={handleChange} 
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">Next</Button>
      </Form>
    </Container>
  );
};

export default ProfileCompletion;