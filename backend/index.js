const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./db");
const cookieSession = require("cookie-session");
const passport = require('passport');
require("./passport");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", 
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }))
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());



const roleRouter = require('./routers/routes/role');
const userRouter = require("./routers/routes/user");
const postRouter = require("./routers/routes/post");
const commentRouter = require("./routers/routes/comment");
const authRoute = require("./Routers/routes/auth");



app.use(roleRouter);
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use("/auth", authRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});