function downloadImage(fileUrl, fileName) {
    const a = document.createElement('a'); // Create an <a> element
    a.href = fileUrl;                     // Set the href to the file URL
    a.download = fileName;                // Set the download attribute with the file name
    document.body.appendChild(a);         // Append the <a> to the document body
    a.click();                            // Programmatically click the <a>
    document.body.removeChild(a);         // Remove the <a> after the download
  }
  