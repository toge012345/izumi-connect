## 1st step

Add your `mongoDb` url in `config.js`

## 2th step

Host this code in any server `eg : render`


## 3ed step

Connect your device with `pair or qr`

## 4th connect

### You can use this function for connecting with your bot MakeId Function

The `MakeId` function is used to restore `creds.json` file 

### Function 

```javascript
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

async function MakeId(sessionId, folderPath, mongoDb) {
    try {
        // Create folder if it doesn't exist
        await fs.mkdir(folderPath, { recursive: true });

        // Send request to restore session
        const response = await axios.post('https://api.lokiser.xyz/mongoose/session/restore', {
            id: sessionId,
            mongoUrl: mongoDb
        });

        // Extract data from response
        const jsonData = response.data.data;

        // Write data to creds.json
        const filePath = path.join(folderPath, "creds.json");
        await fs.writeFile(filePath, JSON.stringify(jsonData));

        console.log("creds.json created successfully.");
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

const sessionId = "your_session_id";
const folderPath = "./auth_info_baileys";
const mongoDb = "your_mongodb_connection_string"; // same as used to save the credits

MakeId(sessionId, folderPath, mongoDb)
    .then(() => {
        console.log("MakeId function executed successfully.");
    })
    .catch((error) => {
        console.error("Error occurred while executing MakeId function:", error.message);
    });
