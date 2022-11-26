const {UserService}=require("./user.service");
const jwt=require('jsonwebtoken');
const bcrypt =require("bcrypt");
/**
 * this object is used to interact with users to create, read, update and delete 
 * @category Controllers
 * @subcategory Usercontroller
 */
const userController={
    /**
     * Register user handler
     * @param {ExpressRequest} req epress request
     * @param {EpressResponse} res express response
     * @param {NextFunction} next express next function
     * @returns {Promise<Any>}
     */
    async register(req,res,next){
        try {
            const body=req.body;

            const dbuser=await UserService.getOneUser({
                name:body.name
            })
            if(dbuser){
                throw new Error("user with same name already exists")
            }
            const dbUserEmail=await UserService.getOneUser({
                email:body.email
            })
            if(dbUserEmail){
                throw new Error("user with same email already exists")
            }
            const response=UserService.createUser(body)
            res.status(200).json({
                code:200,data:response,
                message:'User created successfully '
            });
            return
        } catch (error) {
            console.log(error)
            res.status(400).json({
                code:400,message:'User creation failure'
            })
        }
    },
    async login(req,res,next){
        /**
         * login the users which is in database
         */
        try {
            let body=req.body;
            let dbuser=await UserService.getOneUser({email:body.email});
            if(!dbuser){
                throw "user not found";
            }
            const comparePassword=await bcrypt.compare(body.password,dbuser.password);
            if(!comparePassword){
                throw "invalid credentials";
            }

            const token=jwt.sign({sessionId:dbuser._id},process.env.APP_SECRET,{expiresIn:'12h'});
            res.status(200).json({
                code:200,data:dbuser,message:'User login successfully',token:token
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
               code:400,
               error:{ message:error}
            })
            
        }
        

    },
    async getAll(req,res,next){
        /**
         * get all users which is in database
         */
        try {
            console.log("get all user controller",req.user);
            const data=await UserService.getAllUser();
            res.status(200).json({
                code:200,data:data,message:'User data retrieved successfully'
            })
        } catch (error) {
            res.status(400).json({
                code:400,error:{
                    message:'Error in retrieving user list'
                }
            })
            
        }
    },
    getMyData(req,res,next){
       /**
        * this is to get only my data
        */
            let id=req.params.id;
            UserService.getOneUser({
                _id:id
            }).then(data=>{
                res.status(200).json({
                    code:200,data=data,message:'User data retrieved successfully'
                })
            }).catch(error=>{
                res.status(400).json({
                    code:400,error:{
                        message:'Error in retrieving user data'
                    }
                })
            })
        
    }

}
module.exports={

    userController
}
