const express = require('express');
const resLog = express.Router();
const jwt = require('jsonwebtoken');


const resLogData = require('../model/login');

resLog.use(express.json());
resLog.use(express.urlencoded({ extended: true }));

// SIGNUP
resLog.post('/register', async (req, res) => {
  try {
    const input = req.body;
    const user = new resLogData(input);
    await user.save();
    res.status(200).json({
      message: 'Registration Successful',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Registration declined',
    });
  }
});

// LOGIN
resLog.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const logUser = await resLogData.findOne({ email: email });
    if (!logUser) {
      res.status(500).json({
        message: 'User not found',
      });
    } else {
      if (logUser.password === password) {
        jwt.sign({
          email:email,
          id:logUser._id
        },
        "employeeApp",
        {expiresIn:'1d'},
        (error,token)=>{
          if (error) {
            res.status(200).json({message:'Token not generated'})
          } else {
            res.json({
              message: 'Login Successful',
              token:token,data:logUser
            })}})
        } else {
        res.status(500).json({
          message: 'Login failed',
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred',
    });
  }
});

// Error handling middleware
resLog.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = resLog;