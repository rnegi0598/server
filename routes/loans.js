const express=require('express');
const {getLoans,getLoan,postLoan,postRepayLoan}=require('../controllers/loans')
const router=express.Router();


//get all loans of logged in user
router.get('/',getLoans)
//create a loan
router.post('/',postLoan);
//get a loan
router.get('/:id',getLoan);
// add repayment
router.post('/:id/repay',postRepayLoan);


module.exports=router;