async function uploadAndRun() {
  const xmlFiles = document.getElementById("xmlFiles").files;
  const excelFile = document.getElementById("excelFile").files[0];
  const output = document.getElementById("output");
  const reportLink = document.getElementById("reportLink");

  output.textContent = "Validating files...";

  if (xmlFiles.length === 0 || !excelFile) {
    output.textContent = "Please upload at least one XML file and one Excel file.";
    return;
  }

  const formData = new FormData();
  for (let i = 0; i < xmlFiles.length; i++) {
    formData.append("xmlFiles", xmlFiles[i]);
  }
  formData.append("excelFile", excelFile);

  output.textContent = "Uploading files and running analysis...";

  try {
    const response = await fetch("https://safterpfileupload.azurewebsites.net/api/upload-files", {
      method: "POST",
      body: formData
    });


    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();
    output.textContent = result.summary || "Processing complete.";
    if (result.report_url) {
      reportLink.href = result.report_url;
      reportLink.style.display = "inline";
    }
  } catch (error) {
    output.textContent = "An error occurred: " + error.message;
    console.error(error);
  }
}
