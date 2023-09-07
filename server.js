const express= require('express');
const dbConnect =require('./configs/db');
const bodyParser=require('body-parser');
require('dotenv').config()
const validateToken=require('./middlewares/validateToken')
const errorHandler=require('./middlewares/errorHandler')
const authRouter=require('./routes/auth');
const loansRouter=require('./routes/loans');
const userRouter=require('./routes/user');
const adminRoutes=require('./routes/admin');

const PORT=process.env.PORT || 4000;
const app=express();
// middlewares
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api',authRouter);
app.use('/api/user',validateToken,userRouter);
app.use('/api/user/loans',validateToken,loansRouter);
app.use('/api/admin/loans',validateToken,adminRoutes);
app.use(errorHandler);

dbConnect();
app.listen(PORT,()=>{
    console.log(`server connected at PORT ${PORT}`);
    
})