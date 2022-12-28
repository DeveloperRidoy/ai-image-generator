const generateImg = require("../functions/generateImg");

const handler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      await generateImg(req, res);
      break;
  
    default:
      res.json({status: 'fail', message: 'resource not found'})
  }
}

module.exports = handler;