const asyncHandler = require("express-async-handler");
const Loan = require("../models/loans");
const User = require("../models/user");

//@desc get all the loans of a user
//@route GET /api/user/loans/
//@access private
const getLoans = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate("loans");
  user.loans.sort((a, b) => b.date - a.date);
  res.json({
    success: true,
    message: "Loans retrieved successfully",
    loans: user.loans,
  });
});

//@desc create a loan for a user
//@route POST /api/user/loans/
//@access private
const postLoan = asyncHandler(async (req, res) => {
  const { type, amount, term } = req.body;
  const amountPerWeek = parseFloat((amount / term).toFixed(2));
  const repayments = [];
  const currentDate = new Date().getTime();
  for (let i = 0; i < term; i++) {
    repayments[i] = {
      amount: amountPerWeek,
      date: new Date(currentDate + 7 * (i + 1) * 24 * 60 * 60 * 1000),
    };
  }
  const loan = new Loan({
    user: req.user.id,
    type,
    amount,
    term,
    status: "pending",
    repayments,
  });
  await loan.save();
  const user = await User.findById(req.user.id);
  user.loans.push(loan._id);
  await user.save();
  res.json({
    success: true,
    message:
      "Your loan application has been received and is pending approval. ",
  });
});

//@desc get loan detail of a user
//@route GET /api/user/loans/:id
//@access private
const getLoan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const loan = await Loan.findById(id);

  if (loan.status === "pending") {
    return res.json({
      success: false,
      message: "Loan application approval is pending",
      loan: null,
    });
  }
  res.json({
    success: true,
    message: "Loan retrieved successfully",
    loan,
  });
});

//@desc repay a loan
//@route POST /api/user/loans/:id/repay
//@access private
const postRepayLoan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let amount = req.body.amount;
  amount = parseFloat(amount).toFixed(2);
  const loan = await Loan.findById(id);
  loan.paidAmount += Number(amount);

  await loan.save();
  const repayments = loan.repayments;
  for (let i = 0; i < repayments.length && amount > 0.0; i++) {
    if (repayments[i].amount === 0) {
      continue;
    }
    if (repayments[i].amount <= amount) {
      amount = parseFloat((amount - repayments[i].amount).toFixed(2));
      repayments[i].amount = 0.0;
      repayments[i].status = "paid";
    } else {
      repayments[i].amount = parseFloat(
        (repayments[i].amount - amount).toFixed(2)
      );
      amount = 0.0;
    }
  }
  //check if all repayments payed
  let allRepayed = true;
  for (let i = 0; i < repayments.length; i++) {
    if (repayments[i].status !== "paid") {
      allRepayed = false;
    }
  }
  if (allRepayed) {
    loan.status = "paid";
  }
  await loan.save();
  res.json({
    success:true,
    message:"Loan repayment successful",
    loan
  });
});

module.exports = {
  getLoans,
  getLoan,
  postLoan,
  postRepayLoan,
};
