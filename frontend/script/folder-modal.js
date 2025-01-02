// Function to show the folder creation modal
function showFolderModal() {
    const modal = document.getElementById('folder-form-modal');
    modal.style.display = 'flex';  // Display the modal
  }
  
  // Function to close the folder modal
  function closeFolderModal() {
    const modal = document.getElementById('folder-form-modal');
    modal.style.display = 'none';  // Hide the modal
  }
  
  async function createFolder() {
    const folderName = document.getElementById('folder-name').value.trim();
  
    if (!folderName) {
      alert('Folder name cannot be empty!');
      return;
    }
  
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('You need to log in first!');
      window.location.href = 'login.html';
      return;
    }
  
    const payload = { name: folderName, parentId: currentFolderId };
  
    try {
      const response = await fetch('http://localhost:3000/folders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Error Details:', errorDetails);
        throw new Error('Failed to create folder');
      }
  
      const result = await response.json();
      console.log('Folder created successfully:', result);
      alert(`Folder "${result.name}" created successfully!`);
  
      document.getElementById('folder-name').value = '';
      closeFolderModal();
      renderContent(currentFolderId); // Refresh current folder view
    } catch (error) {
      console.error('Error creating folder:', error);
      alert('Failed to create folder. Please try again.');
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    // Listen for click events on elements with the class 'folder-add-btn'
    document.querySelector('.folder-add-btn').addEventListener('click', showFolderModal);
  });
  
  
  // Attach this to your "Create Folder" button inside the modal
  document.getElementById('create-folder-btn').addEventListener('click', createFolder);
  