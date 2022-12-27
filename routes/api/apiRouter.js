const express = require("express");
const apiRouter = express.Router();
const { Configuration, OpenAIApi } = require("openai");

// function for generating image from text
const generateImg = async (req, res) => {
  try {
    const { text, num_of_images, size } = req.body;

    // check if all reuired fields are provided
    if (!text)
      return res
        .status(400)
        .json({ status: "fail", message: "please provide text" });
    if (!num_of_images)
      return res
        .status(400)
        .json({ status: "fail", message: "please provide num_of_images" });
    if (!size || (size !== "256" && size !== "512" && size !== "1024"))
      return res.status(400).json({
        status: "fail",
        message: "please provide size of either 256, 512 or 1024",
      });

    // check api key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey)
      return res
        .status(400)
        .json({ status: "fail", message: "please provide api key" });

    // create openai configuration with the api key
    const configuration = new Configuration({ apiKey });
    const openai = new OpenAIApi(configuration);

    // make request
    const response = await openai.createImage({
      prompt: text,
      n: Number(num_of_images),
      size: `${size}x${size}`,
    });

    // return response
    return res.json({
      status: "success",
      message: "BeepBoop, successfully geneated image based on the info!",
      data: {
        num_of_images,
        images: response.data.data,
      },
    });
  } catch (error) {
    console.log("server error: ", error);
    return res.status(500).json({
      status: "fail",
      message: "server error",
      error: JSON.stringify(error)
    });
  }
};

// routes 
apiRouter.post("/generate-img", generateImg);

module.exports = apiRouter;