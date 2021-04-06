// Filename : user.js

const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User");
const auth = require("../middleware/auth");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
    "/signup",
    [
        check("aadhaar", "Please Enter a AADHAAR Number")
        .not()
        .isEmpty().isLength({
            min:10
        }),
        check("email", "Please enter a valid email").isEmail(),
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
            aadhaar,
            email,
            password
        } = req.body;
        try {
            let user = await User.findOne({
                aadhaar
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                aadhaar,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
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
    check("aadhaar", "Please enter a valid AADHAAR Number").isLength({
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

    const { aadhaar, password } = req.body;
    try {
      let user = await User.findOne({
        aadhaar
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
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
          name,
          address,
          phoneNo,
          aadhaar,
      } = req.body;
      
      try {
          let user = await User.findOne({
              aadhaar
          });
          if (!user) {
              return res.status(400).json({
                  message: "User doesn't Exists"
              });
          }

          user.name = await name;
          user.address = await address;
          user.phoneNo = await phoneNo;

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
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});



module.exports = router;
