const express = require("express");
const { check, validationResult} = require("express-validator");
const router = express.Router();
const Stock = require("../models/Stock");
const Pharmacy = require("../models/Pharmacy");


router.post(
    "/addstock",
    [
        check("store_id", "Please Enter valid store_id")
        .not()
        .isEmpty(),
        check("drug_name", "invalid drug_name"),
        check("expiry_date", "invalid expiry_date"),
        check("quantity", "invalid quantity"),
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
            drug_name,
            expiry_date,
            quantity,

        } = req.body;
        
        try {
            let user = await Pharmacy.findOne({
                store_id
            });
            if (!user) {
                return res.status(400).json({
                    message: "pharmacy doesn't Exists"
                });
            }

            user = new Stock({
                store_id,
                drug_name,
                expiry_date,
                quantity,
            })
  
            user.store_id = store_id;
            user.drug_name = drug_name;
            user.expiry_date = expiry_date;
            user.quantity = quantity;
  
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
  
  router.get("/showstock", async (req, res) => {
    try {
      const store_id = req.header("store_id")
      const user = await Stock.find({store_id});
      if (!user) {
            return res.status(400).json({
                message: "No stocks found"
            });
        }
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching Stocks"});
    }
  });


  module.exports = router;
