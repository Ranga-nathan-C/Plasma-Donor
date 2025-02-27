import { useState } from "react";
import { Form, Button, Container, ProgressBar } from "react-bootstrap";

const Engagement = () => {
  const user_id = JSON.parse(sessionStorage.getItem("user")).user.id;

  const [formData, setFormData] = useState({
    bio: "",
    interests: [],
    social_media_links: "",
  });

  const interestsOptions = [
    "Volunteering",
    "Health Awareness",
    "Blood Donation Events",
    "Community Support",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((interest) => interest !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${user_id}/community`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit community engagement details",error);
      }

      alert("Community Engagement details submitted successfully!");
      window.location.href = "/Verification";
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
      <h4 className="text-center mb-3">
        Community Engagement (Step 5 of 6) - Optional
      </h4>
      <ProgressBar now={80} label={`80%`} className="mb-3" />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Profile Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself (optional)"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Interests</Form.Label>
          {interestsOptions.map((interest) => (
            <Form.Check
              key={interest}
              type="checkbox"
              label={interest}
              name="interests"
              value={interest}
              onChange={handleChange}
              checked={formData.interests.includes(interest)}
            />
          ))}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Social Media Links</Form.Label>
          <Form.Control
            type="text"
            name="social_media_links"
            value={formData.social_media_links}
            onChange={handleChange}
            placeholder="Enter your social media profile link (optional)"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Engagement;
