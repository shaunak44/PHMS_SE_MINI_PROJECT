const express = require("express");
const { check, validationResult} = require("express-validator");
const router = express.Router();
const Pharmacy = require("../models/Pharmacy");

router.post(
    "/registerpharmacy",
    [
        check("store_id", "Please Enter valid store_id")
        .not()
        .isEmpty(),
        check("name", "Please enter a name"),
        check("opening_time", "invalid opening_time"),
        check("phone_number", "invalid phone_number"),
        check("address", "invalid address"),
        check("closing_time", "invalid closing_time"),
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
            store_id,
            name,
            opening_time,
            phone_number,
            address,
            closing_time,

        } = req.body;
        
        try {
            let user = await Pharmacy.findOne({
                store_id
            });
            if (user) {
                return res.status(400).json({
                    message: "User already Exists"
                });
            }

            user = new Pharmacy({
                store_id,
                name,
                opening_time,
                phone_number,
                address,
                closing_time,
            })
  
            user.store_id = store_id;
            user.name = name;
            user.opening_time = opening_time;
            user.phone_number = phone_number;
            user.address = address;
            user.closing_time= closing_time;
  
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
  
  module.exports = router;
