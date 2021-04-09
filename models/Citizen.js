//FILENAME : Citizen.js

const mongoose = require("mongoose");

const CitizenSchema = mongoose.Schema({
  aadhaar_id: {
    type: Number,
    required: true
  },
  email_id: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name:{
    type: String,
  },
  address:{
    type: String,
  },
  phoneNumber:{
    type: Number,
  },
  age:{
    type: Number,
  },
  weight:{
    type: Number,
  },
  height:{
    type: Number,
  },
  bmi:{
    type: Number,
  },
  last_checkup_date:{
    type: Date,
  },
  spo2:{
    type: Number,
  },
  temperature:{
    type: Number,
  },
  pulse_rate:{
    type: Number,
  },
  comorbidity:{
    type: String,
  },
});

// export model user with UserSchema
module.exports = mongoose.model("citizen", CitizenSchema);
