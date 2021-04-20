const express = require("express");
const { check, validationResult} = require("express-validator");
const Citizen = require("../models/Citizen");
const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post(
    "/registerdoctor",
    [
        check("doctor_id", "Please Enter valid doctor_id")
        .not()
        .isEmpty(),
        check("aadhaar_id", "invalid aadhaar"),
        check("hospital_id", "invalid hospital_id"),
        check("specialization", "invalid specialization"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "ERRORS"
            });
        }
  
        const {
            doctor_id,
            aadhaar_id,
            hospital_id,
            specialization,
        } = req.body;
        
        try {
            let user = await Citizen.findOne({
                aadhaar_id
            });
            if (!user) {
                return res.status(400).json({
                    message: "register as a citizen first"
                });
            }
            user = await Hospital.findOne({
                hospital_id
            });
            if (!user) {
                return res.status(400).json({
                    message: "hospital not registered"
                });
            }

            user = await Doctor.findOne({
                doctor_id
            });
            var user1 = await Doctor.findOne({
                aadhaar_id
            });
            if (user || user1) {
                return res.status(400).json({
                    message: "Already registered"
                });
            }

            user = new Doctor({
                doctor_id,
                aadhaar_id,
                hospital_id,
                specialization,
            })
  
            user.doctor_id = doctor_id;
            user.aadhaar_id = aadhaar_id;
            user.hospital_id = hospital_id;
            user.specialization = specialization;
            
            await user.save();
  
            res.status(200).json({
              message: "Data saved"
            });
  
            
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
  );

router.post(
    "/login",
    [
        check("aadhaar_id", "Please enter a valid AADHAAR Number").isLength({
            min:10
        }),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "ERRORS"
            });
        }
  
        const {
            aadhaar_id, 
            password,
        } = req.body;
        
        try {
            let user = await Citizen.findOne({
                aadhaar_id
            });
            if (!user) {
                return res.status(400).json({
                    message: "register as a citizen first"
                });
            }
            let user1 = await Doctor.findOne({
                aadhaar_id
            });
            if (!user1) {
                return res.status(400).json({
                    message: "Not registered as Doctor"
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect Password !"
                });
  
            res.status(200).json({
              message: "Welcome"
            });
  
            
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server Error");
        }
    }
  );

  router.get("/viewpatient", async (req, res) => {
    try {
      const aadhaar_id = req.header("aadhaar_id")
      const user = await Citizen.find({aadhaar_id});
      if (!user) {
            return res.status(400).json({
                message: "Citizen not Found"
            });
        }
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user"});
    }
  });

  router.get("/doctorInfo", async (req, res) => {
    try {
      const aadhaar_id = req.header("aadhaar_id")
      const user = await Doctor.find({aadhaar_id});
      if (!user) {
            return res.status(400).json({
                message: "Doctor not Found"
            });
        }
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user"});
    }
  });

  router.get("/getdoctorinfo", async (req, res) => {
    try {
      const user = await Doctor.find();
      if (!user) {
            return res.status(400).json({
                message: "Doctor not Found"
            });
        }
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user"});
    }
  });

  
  module.exports = router;