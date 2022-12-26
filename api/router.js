const express = require('express'); 
const generateImg = require('./functions/generateImg');
const router = express.Router(); 


// route for generating images from text
router.post('/generate-img', generateImg);


module.exports = router;