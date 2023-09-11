const User = require('../models/user.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

exports.signup = async function signup(req, res) {
  try {
    const userData = await User.findOne({
      email: req.body.email,
    });
    let user = new User(req.body);
    if (user.email === userData?.email) {
      return res.status(409).send({
        message: 'You are already registered with this email, please use another email or try to login.',
      });
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const userDetail = await user.save();
    res.status(200).send({
      message: 'User registered successfully!',
      data: userDetail
    });
  } catch (error) {
    res.status(400).send({
      message: 'Bad request',
      error: error.message,
      stack: error.stack
    });
  }
};

exports.login = async function login(req, res) {
  try {
    const userData = await User.findOne({
      email: req.body.email,
    });
    if (!userData) { 
      return res.status(401).send({
        message: 'You are not registered yet, please register yourselves first' 
      })
    };
    const passwordIsValid = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        message: 'Your entered password is invalid.',
      });
    }
    const payload = {
      id: userData._id,
      name: userData.name,
      email: userData.email
    };
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 3600 * 24 }, (err, token) => {
      if (err) throw err;
      res.status(200).send({
        message: 'Login successfully',
        token,
      });
    });
  } catch (error) {
    res.status(400).send({
      message: 'Bad request',
      error: error.message,
      stack: error.stack,
    });
  }
}