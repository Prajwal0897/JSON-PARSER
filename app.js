const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

// Use body-parser middleware to parse JSON
app.use(bodyParser.json());


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API Documentation',
        version: '1.0.0',
      },
    },
    // Path to the API docs
    apis: ['./app.js'], // Update this with your actual file
  };

  const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



// Your existing routes
/**
 * @swagger
 * /parse-json:
 *   post:
 *     summary: Parse JSON endpoint
 *     requestBody:
 *       description: JSON data to be parsed
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Parsed JSON data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
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
