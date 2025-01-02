document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://sigmaboy.cloud'; // Adjust the URL as necessary
  
    document.getElementById('signup-form').addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const email = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Send the email and password to the backend
      const userData = { email, password };
  
      try {
        const response = await fetch(`${API_BASE_URL}/users/register`, {  // Updated endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        const data = await response.json();
        authToken = data.access_token;  // Store token in the global variable

        alert('Sign up successful');

        // Log the token to the console for debugging purposes
        window.location.href = 'login.html'; // Redirect to the home page after successful signup
      } catch (error) {
        console.error('Sign Up Error:', error);
        alert(error.message || 'Something went wrong during sign up.');
      }
    });
});
