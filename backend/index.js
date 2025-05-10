// backend/server.js (or backend/index.js)
const express = require('express');
const cors = require('cors');
const db  = require('./db'); 
const app = express();
const session   = require('express-session');

const port = 5000;

app.use(cors());
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 86400000 }
}));


app.use('/api/users', require('./routes/userRoute'));
app.use('/api/events',require('./routes/eventsRoute'));
app.use('/api/events', require('./routes/rsvpRoute'));
app.use('/api/events', require('./routes/commentsRoute')); 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
