const loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent form submission

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    // Sending 'email' instead of 'username'
    const response = await fetch('https://sigmaboy.cloud/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: username, password }),
    });

    if (!response.ok) throw new Error('Login failed');

    const data = await response.json();
    const token = data.access_token;

    // Store the token in localStorage
    localStorage.setItem('authToken', token);

    // Log the token to the console for debugging purposes
    console.log("Token successfully retrieved:", token);

    alert('Login successful');
    // Optionally, redirect the user to another page
    window.location.href = 'home.html';
  } catch (error) {
    console.error('Login error:', error);
    alert('Failed to log in');
  }
});
