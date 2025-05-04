// backend/server.js (or backend/index.js)
const express = require('express');
const cors = require('cors');
const db  = require('./db'); 
const app = express();
const usersRoute = require('./routes/userRoute');

const port = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRoute);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
