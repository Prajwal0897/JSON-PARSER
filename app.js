const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Use body-parser middleware to parse JSON
app.use(bodyParser.json());

// Define a POST route to handle incoming JSON data
app.post('/parse-json', (req, res) => {
  try {
    // Access the JSON data from the request parameter 'myJson'
    const jsonData = req.body.myJson;

    const parsedDat = JSON.parse(jsonData)

    // Do any processing with jsonData here
    // For now, just sending it back as the response
    res.json({ parsedData: parsedDat });
  } catch (error) {
    console.error('Error parsing JSON:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
