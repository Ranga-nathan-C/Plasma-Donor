const express = require("express");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5173" })); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
