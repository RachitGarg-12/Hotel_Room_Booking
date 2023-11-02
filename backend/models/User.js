// define a user schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    roomType: String,
    roomNumber: String,
    startTime: String, 
    endTime: String, 
  });
  
// define a user model
const User = mongoose.model("User", userSchema);
module.exports=User;