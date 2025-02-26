import {useState}  from "react";
import { Form, Button, Container, ProgressBar } from "react-bootstrap";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    gender: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Invalid email format";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Phone number must be 10 digits";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Please select a gender";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
    }
  };

  return (
    <Container className="mt-5 p-4 border rounded shadow-lg" style={{ maxWidth: "500px", backgroundColor: "#fff" }}>
      <h4 className="text-center mb-3">Registration (Step 1 of 6)</h4>
      <ProgressBar now={20} label={`20%`} className="mb-3" />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} isInvalid={!!errors.fullName} />
          <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} isInvalid={!!errors.phone} />
          <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} isInvalid={!!errors.password} />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} isInvalid={!!errors.dob} />
          <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select name="gender" value={formData.gender} onChange={handleChange} isInvalid={!!errors.gender}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">Next</Button>
      </Form>
    </Container>
  );
};

export default RegistrationForm;