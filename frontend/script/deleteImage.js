// Delete Image Function
function deleteImage(imageId) {
  if (confirm('Are you sure you want to delete this folder?')) {
    // You need to make an API call to delete the folder from the backend
    fetch(`${API_BASE_URL}/photos/${imageId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      alert('Image deleted successfully');
      renderContent(currentFolderId);  // Re-render the folder grid to reflect changes
    })
    .catch(error => console.error('Error deleting folder:', error));
  }
}
