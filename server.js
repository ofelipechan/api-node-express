"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("./settings/db");
const cors = require("cors");
const helmet = require("helmet");
const publicRoute = require("./src/routes/public/index");
const privateRoute = require("./src/routes/private/index");

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));

app.use(helmet());

app.use("/api/v1/", privateRoute);
app.use("/api/v1/public", publicRoute);

app.listen(port, host);

const today = new Date(); 
const h = today.getHours(); 
const m = today.getMinutes();
const s = today.getSeconds();
console.log("---------------------------------");
console.warn("(" + h + ":" + m + ":" + s + ")");
console.log("Server running at " + host + ":" + port);
