import { useState } from "react";
import {
  Form,
  Button,
  Container,
  ProgressBar,
  Row,
  Col,
} from "react-bootstrap";

const Registration = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    password: "",
    date_of_birth: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.full_name) newErrors.full_name = "Full Name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email format";
    if (!formData.phone_number.match(/^\d{10}$/))
      newErrors.phone_number = "Phone number must be 10 digits";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (!formData.date_of_birth)
      newErrors.date_of_birth = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Please select a gender";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();
        console.log("Server Response:", data);

        if (response.ok) {
          alert("Registration successful!");
          window.location.href = "/Profile";
        } else {
          alert(`Error: ${data.error || "Something went wrong"}`);
        }
        sessionStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to connect to the server.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 p-3 bg-light"
    >
      <div
        className="w-100 p-4 rounded shadow bg-white"
        style={{ maxWidth: "500px" }}
      >
        <h4 className="text-center mb-3">Registration (Step 1 of 6)</h4>
        <ProgressBar now={0} label={`0%`} className="mb-4" />

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={12} className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                isInvalid={!!errors.full_name}
                placeholder="Enter your full name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.full_name}
              </Form.Control.Feedback>
            </Col>

            <Col xs={12} className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                placeholder="example@mail.com"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Col>

            <Col xs={12} className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                isInvalid={!!errors.phone_number}
                placeholder="10-digit phone number"
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone_number}
              </Form.Control.Feedback>
            </Col>

            <Col xs={12} className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                placeholder="Minimum 6 characters"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Col>

            <Col xs={12} className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                isInvalid={!!errors.date_of_birth}
              />
              <Form.Control.Feedback type="invalid">
                {errors.date_of_birth}
              </Form.Control.Feedback>
            </Col>

            <Col xs={12} className="mb-4">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                isInvalid={!!errors.gender}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.gender}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Next"}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Registration;
