const express = require("express");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const consentRoutes = require("./routes/consent");
const communityRoutes = require("./routes/community");
const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/consent", consentRoutes);
app.use("/api/community", communityRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
