const express = require("express");
const apiRouter = require("./api/apiRouter");
const router = express.Router();
const path = require("path");
const { default: _default } = require("concurrently");

// for serving static assets
router.use("/", express.static(path.resolve(__dirname + "./../public")));

// for serving api requests
router.use("/api/", apiRouter);


// for 404 request
router.use((req, res) => {
  return res.status(404).json({
    status: "fail",
    message: "resource not found",
  });
});

module.exports = router;
