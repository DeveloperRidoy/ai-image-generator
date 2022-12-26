const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const router = require("./routes/router");

// environmental variables
dotenv.config();

// body parser
app.use(bodyParser.json());

// routes
app.use(router);     

// run app on available port
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
