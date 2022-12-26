const express = require("express");
const apiRouter = require("./api/apiRouter");
const router = express.Router();
const path = require('path');
// route for generating images from text
router.use("/", express.static('public/')); 
router.use('/api/', apiRouter)
console.log(path.join(__dirname, '../public'));
// for 404 request 
router.use((req, res) => { 
  return res
    .status(404)
    .json({ status: "fail", message: "resource not found" });
});

module.exports = router;
