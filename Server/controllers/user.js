const multer = require("multer");
const path = require("path");

const {
  User,
  Profile,
  MedicalInfo,
  Consent,
  Community,
  Verification,
} = require("../models");

exports.getUserDetails = async (req, res) => {
  const { id } = req.params; // Extract id from request parameters

  try {
    // Fetch user details using 'id' (not user_id)
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch profile and community details using the same 'id'
    const profile = await Profile.findOne({ where: { user_id: id } });
    const community = await Community.findOne({ where: { user_id: id } });

    // Respond with user details, handling missing profile/ community
    res.status(200).json({
      name: user.full_name,
      email: user.email,
      phonenumber: user.phone_number,
      dob: user.date_of_birth,
      gender: user.gender,
      address: profile?.address || "Not provided",
      blood_type: profile?.blood_type || "Not provided",
      bio: community?.bio || "Not provided",
      interests: community?.interests || "Not provided",
      social_media_links: community?.social_media_links || "Not provided",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch user donation history
// exports.getDonationHistory = async (req, res) => {
//   const { user_id } = req.params;
//   try {
//     const donations = await Donation.findAll({
//       where: { user_id },
//       order: [["donation_date", "DESC"]],
//     });

//     res.status(200).json(donations);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Fetch upcoming events
// exports.getUpcomingEvents = async (req, res) => {
//   try {
//     const events = await Event.findAll({
//       where: {
//         event_date: { [Op.gte]: new Date() }, // Fetch future events
//       },
//       order: [["event_date", "ASC"]],
//     });

//     res.status(200).json(events);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

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

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file to avoid conflicts
  },
});

const upload = multer({ storage: storage });

// Submit verification documents
exports.submitVerification = [
  upload.fields([
    { name: "government_id", maxCount: 1 },
    { name: "photograph", maxCount: 1 },
    { name: "medical_certificate", maxCount: 1 },
  ]),
  async (req, res) => {
    const { user_id } = req.params;

    try {
      // Get file paths
      const government_id_url = req.files["government_id"]
        ? `/uploads/${req.files["government_id"][0].filename}`
        : null;
      const photograph_url = req.files["photograph"]
        ? `/uploads/${req.files["photograph"][0].filename}`
        : null;
      const medical_certificate_url = req.files["medical_certificate"]
        ? `/uploads/${req.files["medical_certificate"][0].filename}`
        : null;

      // Save verification data to the database
      const verification = await Verification.create({
        user_id,
        government_id_url,
        photograph_url,
        medical_certificate_url,
        verification_status: "Pending",
      });

      res.status(201).json({
        message: "Verification submitted successfully",
        verification,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];
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
