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
        let arr=String(auth).split(" ");
        if(arr.length !=2) {
            throw "token invalid"
        }
        if(arr[0]!=="Barear"){

            throw "token not valid"
        }
        const verify=jwt.verify(arr[1],process.env.APP_SECRET);

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
        res.status(500).json({
            error:{
                message:error
                
            }
        })
        
    }
}
module.exports={
    Authorization
}