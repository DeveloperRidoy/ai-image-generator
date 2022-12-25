const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const generateImg = require("./api/generate-img");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// environmental variables
dotenv.config();

// body parser
app.use(bodyParser.json());
 


// routes
app.use("/", express.static("public"));
app.post("/api/generate-img", generateImg);

// for 404 request
app.use((req, res) => {
  return res
    .status(404)
    .json({ status: "fail", message: "resource not found" });
});

// run app on available port
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));
