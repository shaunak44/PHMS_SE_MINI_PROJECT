// Filename : user.js

const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Citizen = require("../models/Citizen");
const auth = require("../middleware/auth");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
    "/signup",
    [
        check("aadhaar_id", "Please Enter a AADHAAR Number")
        .not()
        .isEmpty().isLength({
            min:10
        }),
        check("email_id", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            aadhaar_id,
            email_id,
            password
        } = req.body;
        try {
            let citizen = await Citizen.findOne({
                aadhaar_id
            });
            if (citizen) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            citizen = new Citizen({
                aadhaar_id,
                email_id,
                password
            });

            const salt = await bcrypt.genSalt(10);
            citizen.password = await bcrypt.hash(password, salt);

            await citizen.save();

            const payload = {
                citizen: {
                    id: citizen.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
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
        errors: errors.array()
      });
    }

    const { aadhaar_id, password } = req.body;
    try {
      let citizen = await Citizen.findOne({
        aadhaar_id
      });
      if (!citizen)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, citizen.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        citizen: {
          id: citizen.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

router.post(
  "/createprofile",
  [
      check("name", "Please Enter valid name")
      .not()
      .isEmpty(),
      check("address", "Please enter a valid address"),
      check("phoneNo", "Please enter a valid phoneNo").isLength({
          min: 10
      }),
      check("age", "Please enter a valid age"),
      check("weight", "inCorrect weight"),
      check("height", "inCorrect height"),
      check("last_checkup_date", "inCorrect date"),
      check("spo2", "inCorrect spo2"),
      check("temperature", "inCorrect temp"),
      check("pulse_rate", "incorrect pulse rate"),
      check("cormorbidity", "pulse rate"),
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
          name,
          address,
          phoneNo,
          aadhaar_id,
          age, 
          height,
          weight, 
          last_checkup_date,
          spo2,
          temperature,
          pulse_rate,
          comorbidity,
      } = req.body;
      
      try {
          let user = await Citizen.findOne({
              aadhaar_id
          });
          if (!user) {
              return res.status(400).json({
                  message: "User doesn't Exists"
              });
          }

          user.name = await name;
          user.address = await address;
          user.phoneNo = await phoneNo;
          user.age = await age;
          user.height = await height;
          user.weight = await weight;
          user.last_checkup_date = await last_checkup_date;
          user.spo2 = await spo2;
          user.temperature = await temperature;
          user.pulse_rate = await pulse_rate;
          user.comorbidity = await comorbidity;
          user.bmi = (user.weight/user.height)*10000;

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



router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await Citizen.findById(req.citizen.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user"});
  }
});



module.exports = router;