const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const LocalStrategy = require("passport-local");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const app = express();
const flash = require("connect-flash");
const bcrypt = require("bcrypt");
const userRouter = require("./router/User");
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());

const { User } = require("./models");
app.use(
  session({
    secret: "my-super-secret-key-54862547158632541257",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "User",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const Admin = await User.findOne({
          where: { email: email },
        });

        if (!Admin) {
          return done(null, false, { message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, Admin.password);

        if (isMatch) {
          return done(null, Admin);
        } else {
          return done(null, false, { message: "Invalid password" });
        }
      } catch (error) {
        return done(null, false, {
          message: "Account does not exists for this mail",
        });
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user);
  done(null, { id: user.id, type: user.constructor.name }); // Pass type to distinguish between models
});

passport.deserializeUser((obj, done) => {
  console.log("Deserializing user:", obj);
  const { id, type } = obj;

  if (type === "User") {
    User.findByPk(id)
      .then((user) => {
        console.log("Deserialized user:", user);
        done(null, user);
      })
      .catch((err) => {
        console.error("Failed to deserialize HouseOwner:", err);
        done(err);
      });
  } else {
    done(new Error("No such user type"));
  }
});


app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

app.use("/Admin", userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: "Internal Server Error",
    error: err.message,
  });
});

module.exports = app;