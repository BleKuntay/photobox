async function fetchData() {
    const token = localStorage.getItem('authToken'); // Make sure to use 'authToken'
    const tokenExpiry = localStorage.getItem('tokenExpiry');

    // Check if token is available or expired
    if (!token || !tokenExpiry || Date.now() > tokenExpiry) {
        alert('Session expired. Please log in again.');
        window.location.href = 'login.html'; // Redirect to login if token is expired
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/photos', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.status === 401) {
            alert('Session expired. Please log in again.');
            window.location.href = 'login.html'; // Redirect if session expired
            return;
        }

        const data = await response.json();
        console.log(data);
        renderImages(data); // Assuming you have a renderImages function to display photos
    } catch (error) {
        console.error("Error fetching photos:", error);
    }
}

// Example of function to render images
function renderImages(images) {
    const imageContainer = document.querySelector('.js-images-grid');
    imageContainer.innerHTML = ''; // Clear the container first

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.url; // Assuming images have a 'url' property
        imgElement.alt = image.name;
        imageContainer.appendChild(imgElement);
    });
}
