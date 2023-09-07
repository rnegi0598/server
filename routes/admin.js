const express=require('express');
const {getLoans,approveLoan}=require('../controllers/admin')
const router=express.Router();


// Define routes related to admin functionality
router.get('/', getLoans);
router.post('/:id/approve',approveLoan);



module.exports=router;