const mongoose = require('mongoose');

MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(()=>{console.log(`MongoDB connection successful`)})
.catch(()=>{console.log(`MongoDB connection error!!! Not Connected`)})