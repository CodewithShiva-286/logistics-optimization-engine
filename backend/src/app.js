const express = require("express");
const cors = require("cors");
const testRoutes = require("./routes/test.routes");
const requestRoutes = require("./routes/request.routes");
const driverRoutes = require("./routes/driver.routes");
const matchRoutes = require("./routes/match.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", testRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/match", matchRoutes);

module.exports = app;
