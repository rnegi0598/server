const jwt=require('jsonwebtoken');

const validateToken=(req,res,next)=>{
    const authorization=req.headers.authorization || req.headers.Authorization;
    // console.log(authorization);
    const token=authorization.split(" ")[1];

    if(!token){
        throw new Error('token does not exist')
    }
    const decoded=jwt.verify(token,process.env.SECRET_TOKEN);
    if(req.url==='/admin' && decoded.role !=='admin'){
       throw new Error('user is not an admin') 
    }
    req.user=decoded;
    next();

}


module.exports=validateToken;