//Greating New Users with implementing signUp and LogIn function
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = (req, res, next) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: "User added successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } }) // Fing excist users
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "User not found!",
        });
      }

      console.log(req.body.password, user.password)
      bcrypt
        .compare(req.body.password, user.password) // comparer user excist with bcrrypt password
        .then((valid) => {
          console.log(valid)
          if (!valid) {
            return res.status(401).json({
              error: "Incorrect password!",
            });
          }
          const token = jwt.sign(
            { userId: user.id },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "24h",
            }
          );
          res.status(200).json({
            userId: user.id,
            token: token,
            expiresIn: new Date().getTime() + 60 * 60 * 24 * 1000
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};
