const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const passport = require("passport");
const saltRounds = 10;
const jwtSecret =
  "683dd20d4bb0c4ebd7a44130c4f1b0020cce0405a71d4ab25708b61981d75b7247a9b274d3994d1954d52fd3888c986ddebc187cf4b2e5c63737caf94da5c0c4";

if (!jwtSecret) {
  throw new Error("JWT_SECRET environment variable is not set");
}

// Function to generate JWT
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
    expiresIn: "1d",
  });
}

router.post("/signup", async (req, res) => {
  const { name, email, number, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const existingUser = await User.findOne({ where: { email } });
    const existingUser1 = await User.findOne({
      where: { number: number },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    // if (existingUser1) {
    //   return res
    //     .status(400)
    //     .json({ message: "Mobile Number is already registered" });
    // }

    const newUser = await User.create({
      name: name,
      email,
      number: number,
      password: hashedPassword,
    });

    console.log("New user created:", newUser);
    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "Failed to log in after registration" });
      }

      const token = generateToken(newUser);

      res.status(200).json({
        message: "Registration and login successful",
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          number: newUser.number,
        },
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register user" });
  }
});

router.post("/login", passport.authenticate("User"), (req, res) => {
  console.log("User authenticated:", req.user);

  const token = generateToken(req.user);

  res.json({
    message: "Login successful",
    token,
    user: req.user,
  });
});


module.exports = router;
