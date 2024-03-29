const jwt=require('jsonwebtoken');
const { UserService } = require("../users/user.service");

/**
 * this middleware will check the token, validate it and get the user from the database
 * and pass it through the  request and if any of this process fail then it will send a
 * failure response
 * @param {ExpressRequest} req Express middleware request
 * @param {ExpressResponse} res Express middleware response 
 * @param {NextFunction} next Express middleware next function 
 */
const Authorization=async(req,res,next)=>{
    try {
        let auth=req.headers.authorization;
    
        const verify=jwt.verify(auth,process.env.APP_SECRET);

        let id=verify.sessionId;
        let dbuser=await UserService.getOneUser({_id:id})
        if(!dbuser){
            throw "invalid token"
        }
        req["user"]={
            _id:dbuser._id,
            name:dbuser.name,
            email:dbuser.email,
        };
        next()
    } catch (error) {
        console.log(error);
        res.status(40
0).json({
            error:{
                message:error
                
            }
        })
        
    }
}
module.exports={
    Authorization
}
