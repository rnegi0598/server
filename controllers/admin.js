const asyncHandler = require("express-async-handler");
const Loan = require("../models/loans");

//@desc get all the loans of all the users
//@route GET /api/admin/loans
//@access private
const getLoans = asyncHandler(async (req, res) => {
  const loans = await Loan.find().populate("user");
  loans.sort((a, b) => b.date - a.date);
  res.json({
    success: true,
    message: "Loans retrieved successfully",
    loans,
  });
});

//@desc approve a loan
//@route POST /api/admin/loans/:id/approve
//@access private
const approveLoan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const loan = await Loan.findById(id);
  loan.status = "approved";
  await loan.save();
  res.json({ success: true, message: "Loan approved successfully", loan });
});

module.exports = { getLoans, approveLoan };
