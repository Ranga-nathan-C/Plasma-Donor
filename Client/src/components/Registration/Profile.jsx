import { useState } from "react";
import { Form, Button, Container, ProgressBar } from "react-bootstrap";

const Profile = () => {
  const user_id = JSON.parse(sessionStorage.getItem("user")).user.id;
  const [formData, setFormData] = useState({
    address: "",
    blood_type: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    notification_preferences: { email: true, sms: false },
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.blood_type)
      newErrors.blood_type = "Please select a blood type";
    if (!formData.emergency_contact_name)
      newErrors.emergency_contact_name = "Emergency contact name is required";
    if (!/^\d{10}$/.test(formData.emergency_contact_phone))
      newErrors.emergency_contact_phone = "Phone number must be 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "email" || name === "sms") {
      setFormData((prev) => ({
        ...prev,
        notification_preferences: {
          ...prev.notification_preferences,
          [name]: checked, // Update email or SMS preference
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      console.log(user_id);
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${user_id}/profile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          alert("Profile completed successfully!");
          window.location.href = "/Eligibility";
        } else {
          alert("Error: " + data.error);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit the form.");
      }
    }
  };

  return (
    <Container
      className="mt-5 p-4 border rounded shadow-lg"
      style={{ maxWidth: "500px", backgroundColor: "#fff" }}
    >
      <h4 className="text-center mb-3">Profile Completion (Step 2 of 6)</h4>
      <ProgressBar now={20} label={`20%`} className="mb-3" />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            Address Ex: 123, Main St, Malumichampatti, Coimbatore
          </Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            isInvalid={!!errors.address}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Blood Type</Form.Label>
          <Form.Select
            name="blood_type"
            value={formData.blood_type}
            onChange={handleChange}
            isInvalid={!!errors.blood_type}
          >
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
          <Form.Control.Feedback type="invalid">
            {errors.blood_type}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Emergency Contact Name</Form.Label>
          <Form.Control
            type="text"
            name="emergency_contact_name"
            value={formData.emergency_contact_name}
            onChange={handleChange}
            isInvalid={!!errors.emergency_contact_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.emergency_contact_name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Emergency Contact Phone</Form.Label>
          <Form.Control
            type="tel"
            name="emergency_contact_phone"
            value={formData.emergency_contact_phone}
            onChange={handleChange}
            isInvalid={!!errors.emergency_contact_phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.emergency_contact_phone}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Notification Preferences</Form.Label>
          <Form.Check
            type="checkbox"
            label="Receive Email Notifications"
            name="email"
            checked={formData.notification_preferences.email}
            onChange={handleChange}
          />
          <Form.Check
            type="checkbox"
            label="Receive SMS Notifications"
            name="sms"
            checked={formData.notification_preferences.sms}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={handleSubmit}
          className="w-100"
        >
          Next
        </Button>
      </Form>
    </Container>
  );
};

export default Profile;
