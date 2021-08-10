const {PostService}=require("./post.service");
/**
 * this object is used to interact with users by create,read,update and delete
 * @category Controllers
 * @subcategory Post Controllers
 */
const PostController={
    /**
     * 
     * @param {String} title title for the post
     * @param {String} body body content for the post
     * @param {String} author current logged in user who created the post
     */
    async create(req,res,next){
        try {
            let {title,body}=req.body;
            let author=req.user._id;
            const data=await PostService.create(title,body,author);
            res.status(201).json({
                data:"Post created"
            })
        } catch (error) {
            res.status(500).json({
                error:{
                    message:error
                }
            })
            
        }
    },
    async update(req,res,next){
        try {
            let postId=req.params.id;
            let body=req.body;
            const data=await PostService.update(postId,body);
            res.status(200).json({
                data
            })
        } catch (error) {
            res.status(500).json({
                error:{
                    message:error
                }
            })
        }
    },
 async getOne(req,res,next){
     try {
         let postId=req.params.id;
         const data=await PostService.getOne(postId);
         res.status(200).json({
             post:data
         })
     } catch (error) {
         res.status(500).json({
             error:{
                 message:error
             }
         })
     }
  },
  async getMany(req,res,next){
      try {
          const data=await PostService.getMany({});
          res.status(200).json({
              posts:data
          })
      } catch (error) {
          res.status(500).json({
              error:{
                  message:error
              }
          })
      }
  },
  async getUserPost(req,res,next){
      try {
          const userId=req.params.id;
          console.log(userId);
          const data=await PostService.getMany({author:userId});
          res.status(200).json({
              posts:data
          })
      } catch (error) {
          res.status(500).json({
              error:{
                  message:error
              }
          })
      }
  },
async deleteOne(req,res,next){
    try {
        const id=req.params.id;
        const data=await PostService.delete(id);
        res.status(200).json({
            data
        })
    } catch (error) {
        res.status(500).json({
            error:
            {
                message:error
            }
        })
    }
}
};

module.exports={
    PostController
}