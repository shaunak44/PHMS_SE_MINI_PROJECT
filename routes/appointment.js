const express = require("express");
const { check, validationResult} = require("express-validator");
const router = express.Router();
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Citizen = require("../models/Citizen");

router.post(
    "/book",
    [
        check("doctor_id", "invalid doctor_id"),
        check("slot", "inCorrect slot"),
        
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
           slot,
           aadhaar_id,
        } = req.body;
        
        try {
            let user = await Doctor.findOne({
                doctor_id
            });
            if (!user) {
                return res.status(400).json({
                    message: "Doctor doesn't Exists"
                });
            }
            
            user = await Appointment.findOne({
                slot
            });
            if(user && doctor_id == user.doctor_id){
                return res.status(400).json({
                    message: "Already booked slot"
                });
            }

            user = new Appointment({
                doctor_id,
                slot,
                aadhaar_id,
            })
            user.doctor_id = doctor_id;
            user.slot = slot;
            user.aadhaar_id = aadhaar_id;
            user.save();

            res.status(200).json({
              message: "Data saved"
            })
  
            
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
  );


  router.post(
    "/getinfo",
    [
        check("aadhaar_id", "invalid aadhaar_id"),
        
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
        } = req.body;
        
        try {
            
            user = await Appointment.find({
                aadhaar_id
            });
            
  
            res.status(200).json({
              appointments: user,
            });
  
            
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
  );

  router.get("/doctorappointmentinfo", async (req, res) => {
    try {
      const doctor_id = req.header("doctor_id")
      const user = await Appointment.find({doctor_id});
      if (!user) {
            return res.status(400).json({
                message: "Appointment not Found"
            });
        }
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching appointment"});
    }
  });

  router.post(
    "/confirmstatus",
    [
        check("aadhaar_id", "invalid aadhaar_id"),
        check("doctor_id", "invalid doctor_id"),
        check("slot", "invalid slot"),
        
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
           doctor_id,
           slot,
        } = req.body;
        
        try {
            
            let user = await Appointment.findOne({
                aadhaar_id, doctor_id, slot
            });

            if(!user){
                res.status(400).json({
                    message: "Bad request",
                });
            }
            user.status = true;
            user.save()
            user = await Citizen.find({
                aadhaar_id
            })
  
            res.status(200).json({
              message: "confirmed sucessfully1",
              user: user
            });
            
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
  );




module.exports = router;
