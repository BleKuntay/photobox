function showContextMenuFolder(event, folderId) {
  event.stopPropagation(); // Prevent the click event from bubbling up

  // Find the corresponding context menu for this folder
  const contextMenu = document.querySelector(`#contextMenu-${folderId}`);

  if (!contextMenu) {
    console.error('Context menu not found for folder:', folderId);
    return;
  }

  // Toggle visibility of the context menu
  const isVisible = contextMenu.style.display === 'block';
  document.querySelectorAll('.context-menu').forEach((menu) => {
    menu.style.display = 'none'; // Hide all other menus
  });

  contextMenu.style.display = isVisible ? 'none' : 'block';

  // Position the menu near the clicked button
  const buttonRect = event.target.getBoundingClientRect();
  contextMenu.style.left = `${buttonRect.left - 100}px`;
  contextMenu.style.top = `${buttonRect.bottom + 5}px`; // Slightly below the button
}

// Hide all context menus when clicking outside
document.addEventListener('click', function () {
  document.querySelectorAll('.context-menu').forEach((menu) => {
    menu.style.display = 'none';
  });
});
