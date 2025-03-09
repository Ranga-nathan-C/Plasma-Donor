const express = require("express");
const { Request, User, UserStatus } = require("../models");
const { Op } = require("sequelize");
const { sendSMS, sendEmail } = require("../utils/smsService");

const router = express.Router();

// Haversine Formula for Distance Calculation
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Handle Request Submission
const axios = require("axios");

router.post("/create/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const {
      patientName,
      bloodGroup,
      location, // String (e.g., "New York, USA")
      contact,
      requesterName,
      relation,
      hospitalName,
      numberOfPatients,
      urgency,
      message,
    } = req.body;

    // Convert location string to latitude & longitude
    const getCoordinates = async (address) => {
      const API_URL = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}`;
      const response = await axios.get(API_URL);
      if (response.data.length === 0) throw new Error("Invalid location");
      return {
        latitude: parseFloat(response.data[0].lat),
        longitude: parseFloat(response.data[0].lon),
      };
    };

    const { latitude, longitude } = await getCoordinates(location);

    // Create new blood request
    const newRequest = await Request.create({
      patientName,
      bloodGroup,
      location,
      contact,
      requesterName,
      relation,
      hospitalName,
      numberOfPatients,
      urgency: urgency || "Normal",
      message,
      userId,
    });

    // Find all online users within 30 km
    const nearbyUsers = await UserStatus.findAll({ where: { isOnline: true } });

    const eligibleUsers = nearbyUsers.filter(
      (user) =>
        getDistance(latitude, longitude, user.latitude, user.longitude) <= 30
    );

    // Send SMS to eligible users
    // eligibleUsers.forEach((user) => {
    //   sendSMS(
    //     user.phone,
    //     `Urgent Blood Request! ${bloodGroup} needed at ${
    //       hospitalName || "the given location"
    //     }. Please help!`
    //   );
    // });

    // Send Email & SMS to all registered users
    const allUsers = await User.findAll({
      attributes: ["email", "phone_number"],
    });

    allUsers.forEach((user) => {
      sendEmail(
        user.email,
        "Urgent Blood Request",
        `Urgent Blood Request! ${bloodGroup} needed at ${
          hospitalName || location
        }. 
        Patient: ${patientName}, Requested by: ${requesterName} (${relation}). 
        Urgency: ${urgency}. Number of Patients: ${numberOfPatients}. 
        Contact: ${contact}. Message: ${message}`
      );

      // sendSMS(
      //   user.phone,
      //   `Urgent: ${bloodGroup} needed at ${
      //     hospitalName || location
      //   }. Check your email for details.`
      // );
    });

    res.status(201).json({ message: "Request Created & Notifications Sent!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
