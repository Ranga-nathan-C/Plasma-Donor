import { useState } from "react";
import { Form, Button, Container, ProgressBar, Collapse } from "react-bootstrap";

const ConsentAndAgreements = () => {
  const [formData, setFormData] = useState({
    termsAccepted: false,
    privacyAccepted: false,
    medicalConsent: false,
  });

  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState({ terms: false, privacy: false, medical: false });

  const validate = () => {
    let newErrors = {};
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the Terms and Conditions";
    if (!formData.privacyAccepted) newErrors.privacyAccepted = "You must accept the Privacy Policy";
    if (!formData.medicalConsent) newErrors.medicalConsent = "You must provide Medical Consent";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Consent and Agreements completed successfully!");
    }
  };

  return (
    <Container className="mt-5 p-4 border rounded shadow-lg" style={{ maxWidth: "500px", backgroundColor: "#fff" }}>
      <h4 className="text-center mb-3">Consent and Agreements (Step 4 of 6)</h4>
      <ProgressBar now={80} label={`80%`} className="mb-3" />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label onClick={() => setOpen({ ...open, terms: !open.terms })} style={{ cursor: "pointer", color: "blue" }}>Terms and Conditions</Form.Label>
          <Collapse in={open.terms}><div className="border p-2">By proceeding, you agree to our terms and conditions.</div></Collapse>
          <Form.Check type="checkbox" label="I accept the Terms and Conditions" name="termsAccepted" onChange={handleChange} checked={formData.termsAccepted} isInvalid={!!errors.termsAccepted} />
          <Form.Control.Feedback type="invalid">{errors.termsAccepted}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label onClick={() => setOpen({ ...open, privacy: !open.privacy })} style={{ cursor: "pointer", color: "blue" }}>Privacy Policy</Form.Label>
          <Collapse in={open.privacy}><div className="border p-2">Your data is protected under our privacy policy.</div></Collapse>
          <Form.Check type="checkbox" label="I accept the Privacy Policy" name="privacyAccepted" onChange={handleChange} checked={formData.privacyAccepted} isInvalid={!!errors.privacyAccepted} />
          <Form.Control.Feedback type="invalid">{errors.privacyAccepted}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label onClick={() => setOpen({ ...open, medical: !open.medical })} style={{ cursor: "pointer", color: "blue" }}>Medical Consent</Form.Label>
          <Collapse in={open.medical}><div className="border p-2">I consent to sharing my health data for donation eligibility.</div></Collapse>
          <Form.Check type="checkbox" label="I provide Medical Consent" name="medicalConsent" onChange={handleChange} checked={formData.medicalConsent} isInvalid={!!errors.medicalConsent} />
          <Form.Control.Feedback type="invalid">{errors.medicalConsent}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">Next</Button>
      </Form>
    </Container>
  );
};

export default ConsentAndAgreements;
