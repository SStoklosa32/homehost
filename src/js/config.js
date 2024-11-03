
document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch the config data
    async function fetchConfig() {
        try {
            const response = await fetch('http://localhost:3000/read-config'); // Adjust the URL as necessary
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const config = await response.json(); // Parse the JSON response
    
            // Storing the first part of the data in variables
            const name = config.Name;      
            const numberOfCards = config.NumberOfCards;
            
          
        const WebName = document.getElementById("WebName");
        const WebTitle = document.getElementById("WebTitle");
        
        WebName.innerHTML = name;
        WebTitle.innerHTML = name;
    
        
    
    
    
        
        
        } catch (error) {
            console.error('Error fetching the config:', error);
        }
    }
    
    // Call the function to fetch the config
    fetchConfig();
})

document.getElementById('updateForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form from refreshing the page
    
    
    
    const formData = new FormData();
    formData.append('webname', document.getElementById('WebNameSubmitter').value);
    formData.append('favicon', document.getElementById('FaviconSubmitter').files[0]);
    // Get the new webname from the form
  
    try {
        // Send request to update the web name
        await fetch('http://localhost:3000/edit-config', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: formData.get('webname') })
        });

        // Send request to upload the new favicon
        const response = await fetch('http://localhost:3000/upload-favicon', {
            method: 'PUT',
            body: formData
        });

        const result = await response.json();

        // Display response message
        if (response.ok) {
           alert('Web name and favicon updated successfully!');
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
            alert('Error updating web name or favicon.');
    }
});
