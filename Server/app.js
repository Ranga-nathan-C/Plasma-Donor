const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
// Handle WebSocket connections
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});


app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const userStatusRoutes = require("./routes/userStatusroutes");
const requestRoutes = require("./routes/request");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/userstatus", userStatusRoutes);
app.use("/api/request", requestRoutes);


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (userId) => {
    socket.join(userId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const alertNearbyUsers = (nearbyUsers, bloodGroup, hospitalName) => {
  nearbyUsers.forEach((user) => {
    io.to(user.id).emit("bloodRequest", {
      message: `Urgent Blood Request! ${bloodGroup} needed at ${
        hospitalName || "the given location"
      }.`,
    });
  });
};

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
