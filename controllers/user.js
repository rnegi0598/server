const asyncHandler = require("express-async-handler");

//@desc get current logged in user
//@route GET /api/user/
//@access private
const currentUser =asyncHandler( async (req, res) => {
  res.json({user:req.user});
});

module.exports = { currentUser };
