function convertButton() {
  const homeScreen = document.getElementById("homeScreen");
  homeScreen.style.display = "none";

  const homeform = document.getElementById("homeform");
  homeform.style.display = "block";
}

function checkFileSelection() {
  const fileInput = document.getElementById("dropzone-file");
  const selectedFileName = document.getElementById("selectedFileName");
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
      selectedFileName.textContent = '';
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
