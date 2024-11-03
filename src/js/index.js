
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

async function getCardInfo() {
    try {
        // Fetch the configuration data
        const response = await fetch('http://localhost:3000/read-config');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const config = await response.json();

        // Get the number of cards from the config (with a maximum of 15)
        const numberOfCards = Math.min(config.NumberOfCards, 15);
        


      
        // Loop through each card and extract the name, URL, and port
        for (let i = 1; i <= 15; i++) {
            const cardKey = `card${i}`;
            const cardData = config.Cards[cardKey];

            if (cardData) {
                // Dynamically create variables
                const cardNameVar = `card${i}`;
                const urlVar = `url${i}`;
                const portVar = `port${i}`;

                // Assign the values to dynamically named variables
                window[cardNameVar] = cardData.CardName;
                window[urlVar] = cardData.URL;
                window[portVar] = cardData.Port;

                // Log the values to confirm
                console.log(`${cardNameVar}:`, window[cardNameVar]);
                console.log(`${urlVar}:`, window[urlVar]);
                console.log(`${portVar}:`, window[portVar]);
            }
        }

        try {
        var refCard1 = document.getElementById("cardText1");
        var refUrl1 = document.getElementById("link1");
        refCard1.innerHTML = card1;
        refUrl1.href = url1;
        
        var refCard2 = document.getElementById("cardText2");
        var refUrl2 = document.getElementById("link2");
        refCard2.innerHTML = card2;
        refUrl2.href = url2;
        
        var refCard3 = document.getElementById("cardText3");
        var refUrl3 = document.getElementById("link3");
        refCard3.innerHTML = card3;
        refUrl3.href = url3;
        
        var refCard4 = document.getElementById("card4");
        var refUrl4 = document.getElementById("link4");
        refCard4.innerHTML = card4;
        refUrl4.href = url4;
        
        var refCard5 = document.getElementById("card5");
        var refUrl5 = document.getElementById("link5");
        refCard5.innerHTML = card5;
        refUrl5.href = url5;
        
        var refCard6 = document.getElementById("card6");
        var refUrl6 = document.getElementById("link6");
        refCard6.innerHTML = card6;
        refUrl6.href = url6;
        
        var refCard7 = document.getElementById("card7");
        var refUrl7 = document.getElementById("link7");
        refCard7.innerHTML = card7;
        refUrl7.href = url7;
        
        var refCard8 = document.getElementById("card8");
        var refUrl8 = document.getElementById("link8");
        refCard8.innerHTML = card8;
        refUrl8.href = url8;
        
        var refCard9 = document.getElementById("card9");
        var refUrl9 = document.getElementById("link9");
        refCard9.innerHTML = card9;
        refUrl9.href = url9;
        
        var refCard10 = document.getElementById("card10");
        var refUrl10 = document.getElementById("link10");
        refCard10.innerHTML = card10;
        refUrl10.href = url10;
        
        var refCard11 = document.getElementById("card11");
        var refUrl11 = document.getElementById("link11");
        refCard11.innerHTML = card11;
        refUrl11.href = url11;
        
        var refCard12 = document.getElementById("card12");
        var refUrl12 = document.getElementById("link12");
        refCard12.innerHTML = card12;
        refUrl12.href = url12;
        
        var refCard13 = document.getElementById("card13");
        var refUrl13 = document.getElementById("link13");
        refCard13.innerHTML = card13;
        refUrl13.href = url13;
        
        var refCard14 = document.getElementById("card14");
        var refUrl14 = document.getElementById("link14");
        refCard14.innerHTML = card14;
        refUrl14.href = url14;
        
        var refCard15 = document.getElementById("card15");
        var refUrl15 = document.getElementById("link15");
        refCard15.innerHTML = card15;
        refUrl15.href = url15;


        } catch (error) {
            console.log("reached end ");
            for (let i = 15; i > numberOfCards; i--) {
                console.log(i)
                let refCCard = document.getElementById("card" + i);
                 console.log("Hello")
                    // Hide the card if it exceeds the total number of cards
                    refCCard.style.display = "none";
        }
        
        
    } }catch (error) {
        console.error('Error fetching the card info:', error);
    }
}

// Call the function to get the card info
getCardInfo();




})


