const { UserStatus } = require("../models");

// ✅ Create a new user status
const createUserStatus = async (req, res) => {
  const { user_id } = req.params;
  try {
    const { isOnline, latitude, longitude } = req.body;

    const existingStatus = await UserStatus.findOne({
      where: { userId: user_id },
    });
    if (existingStatus) {
      return res
        .status(400)
        .json({ message: "User status already exists. Use update instead." });
    }

    const userStatus = await UserStatus.create({
      userId: user_id,
      isOnline,
      latitude,
      longitude,
    });

    return res
      .status(201)
      .json({ message: "User status created successfully", userStatus });
  } catch (error) {
    console.error("Error creating user status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Update user status
const updateUserStatus = async (req, res) => {
  const { userId } = req.params;
  try {
    const { isOnline, latitude, longitude } = req.body;

    const userStatus = await UserStatus.findOne({ where: { userId } });

    if (!userStatus) {
      return res
        .status(404)
        .json({ error: "User status not found. Create it first." });
    }

    userStatus.isOnline = isOnline;
    userStatus.latitude = latitude ? latitude : userStatus.latitude;
    userStatus.longitude = longitude ? longitude : userStatus.longitude;
    await userStatus.save();

    return res
      .status(200)
      .json({ message: "User status updated successfully", userStatus });
  } catch (error) {
    console.error("Error updating user status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ✅ Get user status by userId
const getUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const userStatus = await UserStatus.findOne({ where: { userId } });

    if (!userStatus) {
      return res.status(404).json({ error: "User status not found" });
    }

    return res.status(200).json(userStatus);
  } catch (error) {
    console.error("Error fetching user status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createUserStatus, updateUserStatus, getUserStatus };
