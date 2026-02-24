const fs = require('fs');
const http = require('http');
const axios = require('axios');

// URL for Open-Meteo API (Latitude/Longitude for a sample location, e.g., London)
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current_weather=true';
const FILE_PATH = 'weather_log.txt';
const PORT = 3000;

/**
 * 3. Core Functionality: Fetch Weather Data
 * 
 * Using Axios (Promise-based) to fetch data asynchronously.
 * 
 * EVENT LOOP EXPLANATION:
 * When axios.get() is called, the network request is offloaded to the system kernel.
 * The Node.js thread continues executing the rest of the file without waiting.
 * Once the data arrives, the .then() callback is added to the Microtask Queue
 * and executed by the Event Loop when the Call Stack is empty.
 */
function fetchAndSaveWeather() {
    console.log('1. Starting weather fetch...');
    
    axios.get(WEATHER_URL)
        .then(response => {
            console.log('2. Weather data received from API.');
            const weatherData = JSON.stringify(response.data, null, 2);

            // 4. File System: Save Data to File
            // fs.writeFile is asynchronous.
            // usage: fs.writeFile(file, data, callback)
            
            /* 
             * EVENT LOOP EXPLANATION (fs module):
             * This file I/O operation is sent to the Node.js Thread Pool (libuv).
             * The main thread is free to handle other tasks (like incoming HTTP requests).
             * When the write is complete, the callback is pushed to the I/O Callback Queue.
             */
            fs.writeFile(FILE_PATH, weatherData, (err) => {
                if (err) {
                    console.error('Error writing to file:', err);
                } else {
                    console.log(`3. Weather data saved to ${FILE_PATH}`);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
        });

    console.log('4. End of fetchAndSaveWeather function (Note: execution finishes before data arrives!)');
}

/**
 * 5. Server: Simple HTTP Server
 * 
 * Creates a server that listens on port 3000.
 */
const server = http.createServer((req, res) => {
    // Handling the root route
    if (req.url === '/') {
        
        /* 
         * EVENT LOOP EXPLANATION (Server Request):
         * Each request is handled asynchronously.
         * The callback function (this code block) is executed when a request event occurs.
         */
        
        fs.readFile(FILE_PATH, 'utf8', (err, data) => {
            if (err) {
                // If file doesn't exist yet, we can try to fetch it or show an error
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Weather data not found. Please wait for the fetch to complete or check logs.');
                return;
            }
            
            // Successfully read file
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    
    // Trigger the initial fetch
    fetchAndSaveWeather();
});
