const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// CORS middleware (if your frontend and backend are on different domains or ports)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// API endpoint to handle chat messages
app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  
  // Here you can add your logic to handle the incoming message
  console.log('Received message:', message);

  // For now, we'll just echo back the received message
  const reply = `You said: ${message}`;

  res.json({ reply });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
