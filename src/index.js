require('dotenv').config();
const express = require("express");
const routesUser = require("./routes/UserRoutes");
const routesProfile = require("./routes/ProfileRoutes");
const routesPermission = require("./routes/PermissionRoutes");
const CONFIG = require("./config/config");
const app = express();
const cors = require("cors");

require("./database");
app.use(cors());
app.use(express.json());
app.use(routesUser);
app.use(routesProfile);
app.use(routesPermission);
app.listen(3000);
console.log("Server on port ", process.env.PORT || CONFIG.PORT);