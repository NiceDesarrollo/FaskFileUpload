//*Send form
const form = document.getElementById("audioForm");
const submitButton = form.querySelector("button");
const audioInput = form.querySelector("#dropzone-file");
const loadingSpinner = document.getElementById("loadingSpinner");
const fileInput = document.getElementById("dropzone-file");
const selectedFileName = document.getElementById("selectedFileName");
const textResponseCard = document.getElementById("textResponseCard");
const textResponse = document.getElementById("textResponse");
const infoCopyClipboardText = document.getElementById("infoCopyClipboardText");




form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission

  const file = audioInput.files[0];

  // Validate file selection
  if (!file) {
    alert("Please select an audio file.");
    return;
  }

  // Check if the file type is valid (adjust as needed)
  if (!file.type.startsWith("audio/")) {
    alert("Only audio files are allowed.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  form.style.display = "none";
  loadingSpinner.style.display = "inline-block";

  try {
    const response = await fetch("http://34.31.51.194:8080/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      textResponseCard.style.display = "flex";
      infoCopyClipboardText.style.display = "block";  
      textResponse.textContent = data.text;
    } else {
      form.style.display = "block";
      alert("Error sending the file.");
    }
  } catch (error) {
    form.style.display = "block";
    console.error("Error:", error);
    alert("An error occurred while sending the file.");
  }

  fileInput.value = ""; // Clear the file selection (optional, based on your needs)
  selectedFileName.textContent = "";
  loadingSpinner.style.display = "none";
});

function convertButton() {
  const homeScreen = document.getElementById("homeScreen");
  homeScreen.style.display = "none";

  const homeform = document.getElementById("homeform");
  homeform.style.display = "block";
}

function convertButtonAgain() {
  const textResponseCard = document.getElementById("textResponseCard");
  textResponseCard.style.display = "none";

  const audioForm = document.getElementById("audioForm");
  audioForm.style.display = "block";
}

function checkFileSelection() {
  var uploadFileText = document.getElementById("uploadFileText");

  const selectedFile = fileInput.files;

  if (selectedFile) {
    // Perform your actions here, like displaying information about the file
    const allowedExtensions = ["mp3", "mp4"]; // Allowed audio extensions
    const fileExtension = selectedFile[0].name.split(".").pop().toLowerCase(); // Get file extension

    if (!allowedExtensions.includes(fileExtension)) {
      // Handle invalid extension
      console.error(
        "Invalid file type. Please select an MP3 or MP4 audio file."
      );
      fileInput.value = ""; // Clear the file selection (optional, based on your needs)
      selectedFileName.textContent = "";

      let alertError = document.getElementById("alertError");
      // Add the animation class before showing the alert
      alertError.classList.add("alert-animation");
      alertError.style.display = "block";
      setTimeout(() => {
        alertError.classList.remove("alert-animation");
        alertError.style.display = "none";
      }, "5000");

      return; // Prevent further processing if extension is invalid
    }

    //*Nombre del archivo seleccionado
    selectedFileName.textContent = selectedFile[0].name;

    //*Texto del boton informativo del input
    uploadFileText.textContent = "Cambiar archivo";
  } else {
    console.log("No file selected");
  }
}

function copyToClipboard() {
  const sectionText = document.getElementById("textResponse").textContent;
  const input = document.createElement("input");
  input.value = sectionText;
  document.body.appendChild(input);
  input.select();
  navigator.clipboard.writeText(sectionText).then(() => {
    infoCopyClipboardText.textContent = 'Texto copiado \u{2705}'
    setTimeout(() => {
      infoCopyClipboardText.textContent = 'Haz click en el texto para copiarlo'
    }, "5000");
  }, () => {
    console.log("Failed to copy the text!");
  });
  document.body.removeChild(input);
}
