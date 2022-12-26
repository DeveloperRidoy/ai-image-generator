const express = require("express");
const apiRouter = require("./api/apiRouter");
const router = express.Router();
const path = require('path');


// route for generating images from text
router.get("/", (req, res) => {
   res.sendFile('index.html', {root:require.main.path+'/public'});
});
router.use("/api/", apiRouter);

// for 404 request
router.use((req, res) => {
  return res.status(404).json({
    status: "fail", 
    message: "resource not found",
  });
});

module.exports = router;
