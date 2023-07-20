const express = require('express');
const empLog = express.Router();
const jwt = require('jsonwebtoken');

const empLogData = require('../model/employee');

empLog.use(express.json());
empLog.use(express.urlencoded({ extended: true }));

// ADD CREDENTIALS
empLog.post('/addEmployee', (req, res) => {
  try {
    let input = req.body;
    const newEmployee = new empLogData(input);
    
        newEmployee.save();
        res.status(200).json({
          message: 'Employee added successfully'})}
   
   catch (error) {
    res.status(500).json({
      message: 'Unable to add details'
    });
  }
});

// VIEW ALL CREDENTIALS
empLog.get('/viewAllEmployee/:token', async(req, res) => {

  let data = await empLogData.find();


  try {
    jwt.verify(req.params.token, 'employeeApp', (error, decoded) => {
      if (decoded && decoded.email) {
        res.status(200).json(data);
      } else {
       res.status(500).json({message:'Unauthorized user'}) 
      }
      console.log(error)
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
});

// VIEW INDIVIDUAL EMPLOYEE DETAILS
empLog.get('/viewEmployee/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await empLogData.findById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({
      data: employee,
      message: 'Employee Found'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE EMPLOYEE
empLog.put('/updateEmployee/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;
    let updateData = { $set: req.body };

    await empLogData.findByIdAndUpdate(employeeId, updateData);
    res.status(200).json({ message: 'Details updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE EMPLOYEE
empLog.delete('/deleteEmployee/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;
    const deletedEmployee = await empLogData.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
empLog.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = empLog;
