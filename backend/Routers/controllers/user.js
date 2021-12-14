const userModel = require("./../../db/models/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { sendMail } = require("../../helper/sendEmail");
const OAuth2 = google.auth.OAuth2;

const SECRET_KEY = process.env.SECRET_KEY;
const CLIENT_URL = "http://localhost:3000";

const getUsers = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const removeUser = (req, res) => {
  const { id } = req.params;
  userModel
    .findByIdAndUpdate(id, { $set: { isDeleted: true } })
    .then((result) => {
      if (result) {
        res.status(200).json("user removed");
      } else {
        res.status(200).json("user does not exist");
      }
    })
    .catch((err) => {
      res.status(200).json(err);
    });
};

const register = async (req, res) => {
  const { username, email, password, password2 } = req.body;
  let errors = [];

  if (!username || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 8) {
    errors.push({ msg: "Password must be at least 8 characters" });
  }

  if (errors.length > 0)
    return res.status(200).json({
      errors,
      username,
      email,
      password,
      password2,
    });

  userModel.findOne({ email: email }).then(async (user) => {
    if (user) {
      errors.push({ msg: "Email ID already registered" });
      return res.status(200).json({
        errors,
        username,
        email,
        password,
        password2,
      });
    }

    const token = jwt.sign({ username, email, password }, SECRET_KEY, {
      expiresIn: "30m",
    });

    const output = `
                <h2>Please click on below link to activate your account</h2>
                <p>${CLIENT_URL}/activate/${token}</p>
                <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
                `;

    const mailOptions = {
      from: `"Auth Admin" <${process.env.FROM_EMAIL}>`, // sender address
      to: email, // list of receivers
      subject: "Account Verification: NodeJS Auth ✔", // Subject line
      generateTextFromHTML: true,
      html: output, // html body
    };

    try {
      await sendMail(mailOptions);
      res.status(200).json({
        message: "Activation link sent to email ID. Please activate to log in.",
      });
    } catch (error) {
      console.log(error.message);
      errors.push({
        msg: "Something went wrong on our end. Please try again later.",
      });
      res.json({ errors });
    }
  });
};

const activate = (req, res) => {
  const token = req.body.token;
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.json({ err: "Incorrect or expired link! Please register again." });
      } else {
        const { username, email, password } = decodedToken;
        userModel.findOne({ email: email }).then((user) => {
          if (user) {
            res.json({ err: "Email ID already registered! Please log in." });
          } else {
            const newUser = new userModel({
              username,
              email,
              password,
            });

            bcryptjs.genSalt(10, (err, salt) => {
              bcryptjs.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                  .save()
                  .then((user) => {
                    res.json({ success: user });
                  })
                  .catch((err) => console.log(err));
              });
            });
          }
        });
      }
    });
  } else {
    console.log("Account activation error!");
  }
};

const forgotPassword = (req, res) => {
  const { email } = req.body;

  let errors = [];

  if (!email) {
    errors.push({ msg: "Please enter an email ID" });
  }

  if (errors.length > 0) {
    res.json({ errors });
  } else {
    userModel.findOne({ email: email }).then((user) => {
      if (!user) {
        errors.push({ msg: "User with Email ID does not exist!" });
        res.json({ errors });
      } else {
        const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
          expiresIn: "30m",
        });
        const output = `
                <h2>Please click on below link to reset your account password</h2>
                <p>${CLIENT_URL}/reset-password/${token}</p>
                <p><b>NOTE: </b> The activation link expires in 30 minutes.</p>
                `;

        userModel.updateOne({ resetLink: token }, async (err, success) => {
          if (err) {
            errors.push({ msg: "Error resetting password!" });
            res.json({ errors });
          } else {
            const mailOptions = {
              from: `"Auth Admin" <${process.env.FROM_EMAIL}>`, // sender address
              to: email, // list of receivers
              subject: "Account Password Reset: NodeJS Auth ✔", // Subject line
              generateTextFromHTML: true,
              html: output, // html body
            };
            try {
              await sendMail(mailOptions);
              res.status(200).json({
                message:
                  "Password reset link sent to email ID. Please follow the instructions.",
              });
            } catch (error) {
              console.log(error.message);
              errors.push({
                msg: "Something went wrong on our end. Please try again later.",
              });
              res.json({ errors });
            }
          }
        });
      }
    });
  }
};

const gotoReset = (req, res) => {
  const { token } = req.params;

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.json({ error: "Incorrect or expired link! Please try again." });
      } else {
        const { _id } = decodedToken;
        userModel.findById(_id, (err, user) => {
          if (err) {
            res.json({
              error: "User with email ID does not exist! Please try again.",
            });
          } else {
            res.json({ success: _id });
          }
        });
      }
    });
  } else {
    console.log("Password reset error!");
  }
};
///set passord
const resetPassword = (req, res) => {
  var { password, password2, token } = req.body;
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.json({ error: "Incorrect or expired link! Please try again." });
      } else {
        const { _id } = decodedToken;
        userModel.findById(_id, (err, user) => {
          if (err) {
            res.json({
              error: "User with email ID does not exist! Please try again.",
            });
          } else {
            if (!password || !password2) {
              res.json({ error: "Please enter all fields." });
            } else if (password.length < 8) {
              res.json({ error: "Password must be at least 8 characters." });
            } else if (password != password2) {
              res.json({ error: "Passwords does not match." });
            } else {
              bcryptjs.genSalt(10, (err, salt) => {
                bcryptjs.hash(password, salt, (err, hash) => {
                  if (err) throw err;
                  password = hash;

                  userModel.findByIdAndUpdate(
                    { _id },
                    { password },
                    function (err, result) {
                      if (err) {
                        res.json({ error: "Error resetting password!" });
                      } else {
                        res.json({ message: "Password reset successfully!" });
                      }
                    }
                  );
                });
              });
            }
          }
        });
      }
    });
  } else {
    console.log("Password reset error!");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  let errors = [];

  if (!username || !password) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password.length < 8) {
    errors.push({ msg: "Password must be at least 8 characters" });
  }

  if (errors.length > 0)
    return res.status(200).json({
      errors,
    });

  const user = await userModel.findOne({ username: username });

  if (!user) {
    errors.push({ msg: "username not found" });
    return res.status(400).json({
      errors,
    });
  }

  bcryptjs.compare(password, user.password, (err, result) => {
    if (!result) {
      errors.push({ msg: "Invalid username or password..." });
      return res.status(400).json({
        errors,
      });
    }
    const token = jwt.sign({ username, password }, SECRET_KEY, {
      expiresIn: "30m",
    });
    res.send({
      user,
      token,
    });
  });
};

const logout = (req, res) => {
  req.logout();
  res.json({ logout: "You are logged out" });
};

module.exports = {
  register,
  login,
  getUsers,
  removeUser,
  activate,
  logout,
  resetPassword,
  gotoReset,
  forgotPassword,
};
