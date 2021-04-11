const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const Citizen = require("../models/Citizen");
const Hospital = require("../models/Hospital");
const router = express.Router();
const Pharmacy = require("../models/Pharmacy");
const HospitalOperator = require("../models/HospitalOperator");
const PharmacyOperator = require("../models/PharmacyOperator");

router.post(
    "/registeroperator",
    [
        check("operator_type", "Please Enter valid operator_type")
        .not()
        .isEmpty(),
        check("aadhaar_id", "invalid aadhaar_id"),
        check("store_id", "invalid store_id").isLength({
            min: 1
        }),
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
            operator_type,
            aadhaar_id,
            store_id,
        } = req.body;
        
        try {
            let user = await Citizen.findOne({
                aadhaar_id
            });
            if (!user) {
                return res.status(400).json({
                    message: "Please register as Citizen"
                });
            }
           

            if(operator_type == 'hospital_operator'){
                let hospital_id = store_id
                user = await Hospital.findOne({
                    hospital_id
                })
                if(!user){
                    return res.status(400).json({
                        message: "Hospital Not registered"
                    }); 
                }
                user = new HospitalOperator({
                    aadhaar_id,
                    hospital_id
                })
                user.aadhaar_id = aadhaar_id;
                user.hospital_id = hospital_id;
                await user.save();
                res.status(200).json({
                    message: "Data saved"
                });
            } 
            else if(operator_type == 'pharmacy_operator'){
                user = await Pharmacy.findOne({
                    store_id
                })
                if(!user){
                    return res.status(400).json({
                        message: "Pharmacy Not registered"
                    }); 
                }
                user = new PharmacyOperator({
                    aadhaar_id,
                    store_id
                })
                user.aadhaar_id = aadhaar_id;
                user.store_id = store_id;
                await user.save();
                res.status(200).json({
                    message: "Data saved"
                });
            }
            
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
  );

  router.post(
    "/pharmacylogin",
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
            let user1 = await PharmacyOperator.findOne({
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

  router.get("/pharmacyme", async (req, res) => {
    try {
        const aadhaar_id = req.header("aadhaar_id")
        const user = await PharmacyOperator.find({aadhaar_id});
        if (!user) {
              return res.status(400).json({
                  message: "Operator not Found"
              });
          }
        res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user"});
    }
  });
  
  module.exports = router;
