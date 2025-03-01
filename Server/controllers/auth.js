const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a new user

exports.register = async (req, res) => {
  const { full_name, email, phone_number, password, date_of_birth, gender } =
    req.body;

  try {
    // Check if email already exists
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    // Check if phone number already exists
    const existingPhone = await User.findOne({ where: { phone_number } });
    if (existingPhone) {
      return res
        .status(400)
        .json({ error: "Phone number is already in use, Try to Login" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      full_name,
      email,
      phone_number,
      password: hashedPassword,
      date_of_birth,
      gender,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ error: "Invalid password" });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token,user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
