// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const yaml = require('js-yaml');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// API endpoint to create a config YAML
app.post('/create-config', (req, res) => {
    const {
        name,
        fontFamily,
        fontSize,
        backgroundIMGName,
        logoIMGName,
        faviconIMGName,
        numberOfCards,
        cards,
    } = req.body;

    // Validate input
    if (!name || !fontFamily || !fontSize || !backgroundIMGName || !logoIMGName || !faviconIMGName || !numberOfCards || !cards) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Construct the config object
    const config = {
        Name: name,
        FontFamily: fontFamily,
        FontSize: fontSize,
        BackgroundIMGName: backgroundIMGName,
        LogoIMGName: logoIMGName,
        FaviconIMGName: faviconIMGName,
        NumberOfCards: numberOfCards,
        Cards: {}
    };

    // Populate the cards
    for (let i = 0; i < numberOfCards; i++) {
        const cardIndex = i + 1;
        const cardKey = `card${cardIndex}`;
        if (cards[cardKey]) {
            config.Cards[cardKey] = {
                CardName: cards[cardKey].CardName,
                URL: cards[cardKey].URL,
                Port: cards[cardKey].Port,
            };
        }
    }

    // Convert the config object to YAML
    const yamlStr = yaml.dump(config);

    // Write the YAML string to a file
    fs.writeFile('config.yaml', yamlStr, 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error writing the YAML file.' });
        }
        res.json({ message: 'Config YAML created successfully!', config });
    });
});

// API endpoint to read the config YAML
app.get('/read-config', (req, res) => {
    fs.readFile('config.yaml', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading the YAML file.' });
        }

        try {
            const config = yaml.load(data);
            res.json(config);
        } catch (parseError) {
            return res.status(500).json({ error: 'Error parsing the YAML file.' });
        }
    });
});

// API endpoint to edit certain parts of the config YAML
app.put('/edit-config', (req, res) => {
    fs.readFile('config.yaml', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading the YAML file.' });
        }

        try {
            // Load the existing config
            const config = yaml.load(data);

            // Update the config with new values from the request body
            const updates = req.body;

            // Update general config properties
            if (updates.name) config.Name = updates.name;
            if (updates.fontFamily) config.FontFamily = updates.fontFamily;
            if (updates.fontSize) config.FontSize = updates.fontSize;
            if (updates.backgroundIMGName) config.BackgroundIMGName = updates.backgroundIMGName;
            if (updates.logoIMGName) config.LogoIMGName = updates.logoIMGName;
            if (updates.faviconIMGName) config.FaviconIMGName = updates.faviconIMGName;
            if (updates.numberOfCards) config.NumberOfCards = updates.numberOfCards;

            // Update card details if provided
            if (updates.cards) {
                for (const key in updates.cards) {
                    if (config.Cards[key]) {
                        config.Cards[key] = {
                            ...config.Cards[key],
                            ...updates.cards[key],
                        };
                    } else {
                        config.Cards[key] = updates.cards[key];
                    }
                }
            }

            // Convert the updated config object to YAML
            const yamlStr = yaml.dump(config);

            // Write the updated YAML string back to the file
            fs.writeFile('config.yaml', yamlStr, 'utf8', (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error writing the updated YAML file.' });
                }
                res.json({ message: 'Config YAML updated successfully!', config });
            });
        } catch (parseError) {
            return res.status(500).json({ error: 'Error parsing the YAML file.' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
