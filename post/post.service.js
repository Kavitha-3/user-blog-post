const {PostModel}=require("./post.model");

/**
 * this object is a collection of methods which intract with the database related to post{@link Action}
 * @category Services
 * @subcategory PostService
 */
const PostService={
/**
 * this method is used to create a post
 * @param {String} title title for the post
 * @param {String} body body content for the post
 * @param {String} author current logged in user who created this post
 * @returns {Promise<Any>}
 */
    async create(title,body,author){
        return new PostModel({title,body,author}).save()
    },
    async update(id,data){
        return PostModel.updateOne(
            {_id:id},{$set:data}
        )
    },
    async getOne(id){
        return PostModel.findById(id)
    },
    async getMany(filter){
        return PostModel.find(filter)
    },
    async delete(id){
        return PostModel.deleteOne({_id:id})
    }
};

module.exports={
    PostService
}