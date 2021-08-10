const {Router} =require ("express");
const {Authorization}=require("../middlewares/Authorization");
const {userController}=require("./user.controller");
/**
 * to initialize post routes
 * @category Routes
 * @subcategory UserRoute
 */
const userRoute=Router();

userRoute.get('/',Authorization,userController.getAll);
userRoute.get('/me',Authorization,userController.getMyData);
userRoute.post('/register',userController.register);
userRoute.post('/login',userController.login);

module.exports={
   userRoute
}