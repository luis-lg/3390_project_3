// backend/server.js (or backend/index.js)
const express = require('express');
const cors = require('cors');
const db  = require('./db'); 

const app = express();
const port = 5000;

app.use(cors());


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
