// /index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config()

// IMPORT MODELS
const citizen = require("./routes/citizen"); //new addition
const hospital = require("./routes/hospital"); //new addition
const pharmacy = require("./routes/pharmacy"); //new addition
const operator = require("./routes/operator"); //new addition
const stock = require("./routes/stock"); //new addition
const doctor = require("./routes/doctor"); //new addition
const appointment = require("./routes/appointment"); //new addition





const app = express();
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/node-react-starter`);

app.use(bodyParser.json());

//IMPORT ROUTES

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

app.use("/citizen", citizen);
app.use("/hospital", hospital);
app.use("/pharmacy", pharmacy);
app.use("/operator", operator);
app.use("/stock", stock);
app.use("/doctor", doctor);
app.use("/appointment", appointment);

// const PORT = process.env.PORT || 9000;
const PORT = process.env.PORT
console.log(`"***\nENV PORT IS ${PORT} ***\n"`);


 //const PORT = process.env.PORT || 5000;
//const PORT = 9000
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});