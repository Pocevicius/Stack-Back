const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = require("../models/userModel");

module.exports.SIGN_UP = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new userSchema({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" },
        { algorithm: "RS256" }
      );
      user
        .save()
        .then((result) => {
          return res.status(200).json({
            response: "User was created successfully",
            user: result,
            jwt_token: token,
          });
        })
        .catch((err) => {
          console.log("err", err);
          res.status(400).json({ response: "Missing email or password is wrong" });
        });
    };

    module.exports.LOGIN = async (req, res) => {
        try {
          const user = await userSchema.findOne({ email: req.body.email });
      
          const isPasswordMatch = await bcrypt.compare(
            req.body.password,
            user.password
          );
          if (isPasswordMatch) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id,
              },
              process.env.JWT_SECRET,
              { expiresIn: "1h" },
              { algorithm: "RS256" }
            );
           
      
            return res.status(200).json({
              status: "login successful",
              jwt_token: token,
            });
          }
          return res
            .status(404)
            .json({ status: "login failed,incorrect email or password" });
        } catch (err) {
          console.log("req.body", req.body);
      
          console.log("err", err);
          return res
            .status(404)
            .json({ status: "login failed,incorrect email or password" });
        }
      };
      
    
