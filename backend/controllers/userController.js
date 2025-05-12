const bcrypt = require('bcrypt');
const User = require('../models/usersModel');

exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.addUser({
      username,
      password: hashedPassword,
      email
    });

    res.status(201).json({
      message: "User created successfully.",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        created_at: newUser.created_at
      }
    });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Failed to register user." });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Username and password are required.' });
    }

    const user = await User.getUserbyName(username);

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    req.session.userId = user.id;

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
    });
  } catch (err) {
    if (err.message === 'User not found') {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    next(err);
  }
};

exports.logout = (req, res, next) => {
  // destroy session
  req.session.destroy(err => {
    if (err) return next(err);
    // clear cooki
    res.clearCookie('connect.sid');       
    res.json({ message: 'Logged out successfully.' });
  });
};
