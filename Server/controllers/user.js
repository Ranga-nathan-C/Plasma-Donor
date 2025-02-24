const {
  User,
  Profile,
  MedicalInfo,
  Consent,
  Community,
  Verification,
} = require("../models");

// Complete profile
exports.completeProfile = async (req, res) => {
  const { user_id } = req.params;
  const {
    address,
    blood_type,
    emergency_contact_name,
    emergency_contact_phone,
    notification_preferences,
  } = req.body;
  try {
    const profile = await Profile.create({
      user_id,
      address,
      blood_type,
      emergency_contact_name,
      emergency_contact_phone,
      notification_preferences,
    });
    res
      .status(201)
      .json({ message: "Profile completed successfully", profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Submit medical info
exports.submitMedicalInfo = async (req, res) => {
  const { user_id } = req.params;
  const { health_conditions, medications, travel_history, vaccination_status } =
    req.body;
  try {
    const medicalInfo = await MedicalInfo.create({
      user_id,
      health_conditions,
      medications,
      travel_history,
      vaccination_status,
    });
    res
      .status(201)
      .json({ message: "Medical info submitted successfully", medicalInfo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Submit verification documents
exports.submitVerification = async (req, res) => {
  const { user_id } = req.params;
  const { government_id_url, photograph_url, medical_certificate_url } =
    req.body;
  try {
    const verification = await Verification.create({
      user_id,
      government_id_url,
      photograph_url,
      medical_certificate_url,
      verification_status: "Pending",
    });
    res
      .status(201)
      .json({ message: "Verification submitted successfully", verification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Save community engagement data
exports.saveCommunity = async (req, res) => {
  const { user_id } = req.params;
  const { bio, interests, social_media_links } = req.body;
  try {
    const community = await Community.create({
      user_id,
      bio,
      interests,
      social_media_links,
    });
    res
      .status(201)
      .json({ message: "Community data saved successfully", community });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Save consent and agreement
exports.saveConsent = async (req, res) => {
  const { user_id } = req.params;
  const { terms_accepted, privacy_accepted, medical_consent } = req.body;
  try {
    const consent = await Consent.create({
      user_id,
      terms_accepted,
      privacy_accepted,
      medical_consent,
    });
    res.status(201).json({ message: "Consent saved successfully", consent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
