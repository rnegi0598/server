const express=require('express');
const {currentUser}=require('../controllers/user')
const router=express.Router();

// Define routes related to authentication

router.get('/',currentUser);

module.exports=router;