const {model,Schema,SchemaTypes}=require("mongoose");
/**
 * this object gives the structure of the user-post model
 * @category Models
 * @subcategory PostModel
 */
const PostModel=model("Posts",Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
}));

module.exports={
    PostModel
}