const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

if (!token) {
  alert('You need to log in first!');
  window.location.href = 'login.html'; // Redirect to login if no token
}

async function fetchData() {
  const response = await fetch('http://localhost:3000/protected-endpoint', {
    headers: {
      'Authorization': `Bearer ${token}`, // Send token with request
    },
  });

  if (response.status === 401) {
    alert('Session expired. Please log in again.');
    window.location.href = 'login.html'; // Redirect to login if token is expired
  }

  const data = await response.json();
  console.log(data);
}

