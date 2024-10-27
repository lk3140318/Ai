const ads = [
  '<img src="ads/ad1.jpg" alt="Ad 1" />', // Replace with your ad image paths
  '<img src="ads/ad2.jpg" alt="Ad 2" />',
  '<img src="ads/ad3.jpg" alt="Ad 3" />'
];

let currentAdIndex = 0;
const adDisplayInterval = 8300; // 8300 milliseconds = 8.3 seconds

function showNextAd() {
  const adsContainer = document.getElementById('adsContainer');
  adsContainer.innerHTML = ads[currentAdIndex];
  currentAdIndex = (currentAdIndex + 1) % ads.length; // Loop back to the first ad
}

// Start showing ads
let adInterval = setInterval(showNextAd, adDisplayInterval);

// Function to handle the text search
async function search() {
  const query = document.getElementById('searchInput').value.trim();
  const category = document.getElementById('categorySelect').value;

  if (!query) {
    alert('Please enter a search term');
    return;
  }

  // Stop displaying ads when searching
  clearInterval(adInterval);
  document.getElementById('adsContainer').innerHTML = '';

  try {
    const response = await fetch(`/search?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`);
    const results = await response.json();
    displayResults(results);
  } catch (error) {
    console.error('Error fetching search results:', error);
    alert('An error occurred while fetching results. Please try again later.');
  }
}

// Function to handle image upload
function uploadImage() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please upload an image file');
    return;
  }

  const formData = new FormData();
  formData.append('image', file);

  // Send the uploaded image to the server
  fetch('/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Automatically trigger search based on the uploaded image
    if (data.success) {
      const searchQuery = data.searchQuery || ''; // Extract search query if provided
      document.getElementById('searchInput').value = searchQuery; // Populate search input
      search(); // Call search function to fetch results
    } else {
      alert('Failed to process image. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error uploading image:', error);
    alert('An error occurred while uploading the image. Please try again later.');
  });
}

function displayResults(results) {
  const resultsDiv = document.getElementById('searchResults');
  resultsDiv.innerHTML = '';

  if (results.length === 0) {
    resultsDiv.innerHTML = '<p>No results found</p>';
    return;
  }

  results.forEach(result => {
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');

    // Assuming the result has a content and optional image field
    resultDiv.innerHTML = `
      <p>${result.content}</p>
      ${result.image ? `<img src="${result.image}" alt="Image Result" />` : ''}
    `;
    resultsDiv.appendChild(resultDiv);
  });
}

// Start showing the first ad immediately
showNextAd();
