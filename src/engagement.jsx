import { useState } from "react";
import { Form, Button, Container, ProgressBar } from "react-bootstrap";

const CommunityEngagement = () => {
  const [formData, setFormData] = useState({
    profileBio: "",
    interests: [],
    socialMediaLinks: ""
  });

  const interestsOptions = ["Volunteering", "Health Awareness", "Blood Donation Events", "Community Support"];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Community Engagement details submitted!");
  };

  return (
    <Container className="mt-5 p-4 border rounded shadow-lg" style={{ maxWidth: "500px", backgroundColor: "#fff" }}>
      <h4 className="text-center mb-3">Community Engagement (Step 5 of 6) - Optional</h4>
      <ProgressBar now={100} label={`100%`} className="mb-3" />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Profile Bio</Form.Label>
          <Form.Control as="textarea" rows={3} name="profileBio" value={formData.profileBio} onChange={handleChange} placeholder="Tell us about yourself (optional)" />
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
          <Form.Control type="text" name="socialMediaLinks" value={formData.socialMediaLinks} onChange={handleChange} placeholder="Enter your social media profile link (optional)" />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">Submit</Button>
      </Form>
    </Container>
  );
};

export default CommunityEngagement;
