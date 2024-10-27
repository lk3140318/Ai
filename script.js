// Load the JSON file with website data
async function loadWebsiteData() {
    const response = await fetch('data.json');
    return await response.json();
}

// Search function to find matching websites
async function search() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('searchResults');
    
    // Clear previous results
    resultsDiv.innerHTML = '';

    if (!query) {
        resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    const websites = await loadWebsiteData();
    const filteredResults = websites.filter(website => 
        website.title.toLowerCase().includes(query) || 
        website.category.toLowerCase().includes(query)
    );

    // Display results
    if (filteredResults.length > 0) {
        filteredResults.forEach(result => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result');
            resultDiv.innerHTML = `<a href="${result.url}" target="_blank">${result.title}</a> - ${result.category}`;
            resultsDiv.appendChild(resultDiv);
        });
    } else {
        resultsDiv.innerHTML = '<p>No results found.</p>';
    }
}
