const generateImg = require("../functions/generateImg");

const handler = (req, res) => {
  switch (req.method) {
    case 'POST':
      generateImg(req, res);
      break;
  
    default:
      res.json({status: 'fail', message: 'resource not found'})
  }
}

module.exports = handler;