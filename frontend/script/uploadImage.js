async function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const token = localStorage.getItem('authToken');
  if (!token) {
    alert('You need to log in first!');
    window.location.href = 'login.html';
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', file.name);
  formData.append('parentId', currentFolderId); // Add current folder ID

  try {
    const response = await fetch('http://localhost:3000/photos/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error uploading photo:', errorText);
      throw new Error(`Failed to upload photo: ${errorText}`);
    }

    const result = await response.json();
    console.log('Upload successful:', result);
    renderContent(currentFolderId); // Refresh the grid
  } catch (error) {
    console.error('Error uploading photo:', error);
    alert('Failed to upload photo. Please try again.');
  }
}

// This function triggers the hidden file input when the button is clicked
function triggerFileInput() {
  document.getElementById('file-input-upload').click();  // Use the correct ID here
}

