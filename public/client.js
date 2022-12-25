// html elements
const form = document.getElementById("form");
const textArea = document.getElementById("text");
const submitBtn = document.getElementById("submit");
const sizeInput = document.getElementById("size");
const countInput = document.getElementById("count");
const errorDiv = document.getElementById("error");
const displayBox = document.getElementById("display-box");
const loadingScreen = document.getElementById("loading-screen");

// functions

// toggle submit button depending on textarea is empty or not
const toggleSubmitBtn = () => {
  submitBtn.disabled = textArea.value == "";
};

// generate image based on provided text
const generateImage = async (e) => {
  e.preventDefault();
  try {

    // remove all previous images
    displayBox.innerHTML = '';

    // set loading screen
    loadingScreen.classList.remove("hidden");

    // data
    const text = textArea.value;
    const num_of_images = countInput.value;
    const size = sizeInput.value;

    const res = await fetch("/api/generate-img", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        num_of_images,
        size,
      }),
    });
    const data = await res.json();

    // hide loading screen
    loadingScreen.classList.add("hidden");

    // show error message on fail
    if (data.status === "fail") {
      errorDiv.classList.remove("hidden");
      errorDiv.innerText = data.message;
      return;
    }

    // hide error message on success
    errorDiv.classList.add("hidden");

    // create and add generated images to the displaybox
    data.data.images.forEach((img) => {
      const image = document.createElement('img'); 
      image.style.borderRadius = '5px';
      image.src = img.url;
      displayBox.appendChild(image);
    });
  } catch (error) {
    const errorMsg =
      error.response?.data.message ||
      error.message ||
      "cannot connect to the server. Make sure you have an active internet connection";

    errorDiv.classList.remove("hidden");
    errorDiv.innerText = errorMsg;
  }
};

// check for invalid input
const checkCount = (e) => {
  if (e.target.value > 10 || e.target.value < 1) e.target.value = 10;
};
const checkSize = (e) => {
  const value = Number(e.target.value);
  if (value !== 256 && value !== 512 && value !== 1024) e.target.value = 256;
};

// event listeneres
textArea.addEventListener("keyup", toggleSubmitBtn);
countInput.addEventListener("change", checkCount);
sizeInput.addEventListener("change", checkSize);
form.addEventListener("submit", generateImage);
