const {UserModel}=require("./user.model");
const bcrypt=require('bcrypt');
/**
 * This object is a collection of methods which interact with the database related to users
 * @category Services
 * @subcategory UserService
 */
const UserService={
    /**
     * this is used to get all users in database
     */
   async getAllUser(){
        return UserModel.find({})
    },
    /**
     *this is used to get user by id
     */
    async getOneUser(condition){
        return UserModel.findOne(condition)
    },
    /**
     * this is used to create user
     */
    createUser(user){
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(user.password,salt);
        let newUser=new UserModel();
        newUser.name=user.name;
        newUser.email=user.email;
        newUser.password=hash;
        newUser.save();
        return "user saved";
    },
    /**
     * this is used to update one user
     */
    async updateUser(condition,newValue){
        return UserModel.updateUser(condition,{$set:newValue,})
        
    },


};
module.exports={
    UserService
}