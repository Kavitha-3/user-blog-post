const {model,Schema}=require("mongoose");
/**
 * this object gives the structure for the user model
 * @category Models
 * @subcategory UserModel
 */
const UserModel= model("user",Schema({
name:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
},
password:{
    type:String,
    required:true,
}

}))

module.exports={
    UserModel}