const express = require("express");
const apiRouter = require("./api/apiRouter");
const router = express.Router();
const { dirname } = require('path');
// route for generating images from text
router.use("/", express.static(dirname(require.main.filename) + "/public"));
router.use("/api/", apiRouter);

// for 404 request 
router.use((req, res) => {
  return res
    .status(404)
    .json({
      status: "fail",
      message: "resource not found",
      paths: require.main.paths,
      path: require.main.path,
      fileName: require.main.filename,
    });
});

module.exports = router;
