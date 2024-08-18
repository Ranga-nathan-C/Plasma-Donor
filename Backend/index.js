const port = 2100;
const app = require("./app");
app.listen(port, function () {
  console.log("server is running on port " + port);
});
