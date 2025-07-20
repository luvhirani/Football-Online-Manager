const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const handleAuth = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
  } else {
    const hashed = await bcrypt.hash(password, 10);
    user = await User.create({ email, password: hashed });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};

module.exports = {handleAuth}