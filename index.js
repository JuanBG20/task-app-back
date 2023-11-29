require("dotenv").config();
const express = require("express");
const cors = require("cors");
const DBConnect = require("./db/index");
const router = require("./routes/index.routes");
const app = express();

DBConnect(app);

app.use(cors({ origin: true }));
app.use(express.json());
app.use("/", router);
