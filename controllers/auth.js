const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//@desc login in the user
//@route POST /api/login
//@access public
const postLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.statusCode = 400;
    throw new Error("incomplete fields");
  }
  //check if user email exists
  const user = await User.findOne({ email });
  if (!user) {
    res.statusCode = 401;
    throw new Error("user email not found");
  }

  //check password match
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.statusCode = 401;
    throw new Error("password did not match");
  }

  //user logged in  send access token
  //access token must be send by client
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role ? user.role : "user",
    },
    process.env.SECRET_TOKEN,
    { expiresIn: "60m" }
  );

  res.json({
    success: true,
    message: "User logged in successfully",
    token,
  });
});

//@desc register the user
//@route POST /api/register
//@access public
const postRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.statusCode = 400;
    throw new Error("Incomplete fields");
  }

  //check if email already exists
  const user = await User.findOne({ email });
  if (user) {
    res.statusCode = 400;
    throw new Error("User already exists");
  }
  //create new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.json({
    success: true,
    message: "User registered successfully",
    user:newUser,
  });
});

module.exports = { postLogin, postRegister };
