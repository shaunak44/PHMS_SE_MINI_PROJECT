const express = require("express");
const { check, validationResult} = require("express-validator");
const router = express.Router();
const Hospital = require("../models/Hospital");

router.post(
    "/registerhospital",
    [
        check("hospital_id", "Please Enter valid hospital_id")
        .not()
        .isEmpty(),
        check("name", "Please enter a name"),
        check("no_of_beds", "invalid no_of_beds").isLength({
            min: 1
        }),
        check("phone_number", "invalid phone_number"),
        check("address", "invalid address"),
        check("type", "invalid type"),
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
            hospital_id,
            name,
            no_of_beds,
            phone_number,
            address,
            type,

        } = req.body;
        
        try {
            let user = await Hospital.findOne({
                hospital_id
            });
            if (user) {
                return res.status(400).json({
                    message: "User already Exists"
                });
            }

            user = new Hospital({
                hospital_id,
                name,
                no_of_beds,
                phone_number,
                address,
                type,
            })
  
            user.hospital_id = hospital_id;
            user.name = name;
            user.no_of_beds = no_of_beds;
            user.phone_number = phone_number;
            user.address = address;
            user.type = type;
  
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

  router.get("/viewstats", async (req, res) => {
    try {
        const hosp = await Hospital.find();
        if (!hosp) {
            return res.status(400).json({
                message: "Hospital not Found"
            });
        }
        res.json(hosp);
    } catch (e) {
        res.send({ message: "Error in Fetching Hosp"});
    }
});

  
  module.exports = router;
