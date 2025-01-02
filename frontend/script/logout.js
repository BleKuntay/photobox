const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", () => {
  localStorage.removeItem('authToken'); // Remove the token
  alert('Logged out successfully');
  window.location.href = '/login.html'; // Redirect to login page
});

function logout() {
    localStorage.removeItem('authToken'); // Remove token
    window.location.href = 'login.html'; // Redirect to login
  }
  
