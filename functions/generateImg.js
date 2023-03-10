const { Configuration, OpenAIApi } = require("openai");

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
    let response;
    const payload = {
      prompt: text,
      n: Number(num_of_images),
      size: `${size}x${size}`,
    };
    try {
      response = await openai.createImage(payload);
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: "failed request to openai",
        payload,
      });
    }

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
      detail: JSON.stringify(error.message),
    });
  }
};

module.exports = generateImg;
