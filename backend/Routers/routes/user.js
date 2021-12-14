const express = require("express");
const {
  register,
  login,
  getUsers,
  removeUser,
  activate,
  forgotPassword,
  resetPassword,
} = require("./../controllers/user");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/account/activate", activate);
userRouter.post("/password/forgot", forgotPassword);
userRouter.post("/password/reset", resetPassword);
userRouter.get("/users", authentication, authorization, getUsers);
userRouter.delete("/users/:id", authentication, authorization, removeUser);

module.exports = userRouter;
