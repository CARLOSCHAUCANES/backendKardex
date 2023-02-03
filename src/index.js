require('dotenv').config();
const express = require("express");
const routes = require("./routes/UserRoutes");
const CONFIG = require("./config/config");
const app = express();
const cors = require("cors");

require("./database");
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3000);
console.log("Server on port ", process.env.PORT || CONFIG.PORT);