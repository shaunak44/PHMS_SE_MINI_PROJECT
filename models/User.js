//FILENAME : User.js

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  aadhaar: {
    type: Number,
    //required: true
  },
  email: {
    type: String,
    //required: true
  },
  password: {
    type: String,
    //required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  name:{
    type: String,
  },
  address:{
    type: String,
  },
  phoneNumber:{
    type: Number,
  }
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
