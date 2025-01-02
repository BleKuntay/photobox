async function renameImage(photoId, oldName) {
  const token = localStorage.getItem('authToken');  // Get the token from localStorage
  const newName = prompt('Enter new folder name:', oldName);

  try {
    const response = await fetch(`${API_BASE_URL}/photos/${photoId}/rename`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Include the auth token
      },
      body: JSON.stringify({ newName }),  // Send the new name in the request body
    });

    if (!response.ok) {
      throw new Error('Failed to rename photo');
    }

    const updatedPhoto = await response.json();
    console.log('Updated photo:', updatedPhoto);  // Log the updated photo details
    renderContent(currentFolderId);
    return updatedPhoto;
  } catch (error) {
    console.error('Error renaming photo:', error);
    return null;
  }
}
