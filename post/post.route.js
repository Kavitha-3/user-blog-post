const {Router}=require("express");
const {Authorization}=require("../middlewares/Authorization");
const {PostController}=require("./post.controller");
/**
 * initializing post routes
 * @category Routes
 * @subcategory PostRoute
 */
const PostRoute=Router();

PostRoute.post("/createpost",Authorization,PostController.create);
PostRoute.get("/user/:id",PostController.getUserPost);
PostRoute.get("/getallpost",PostController.getMany);
PostRoute.get("/getpost/:id",PostController.getOne);
PostRoute.delete("/delete/:id",Authorization,PostController.deleteOne);

module.exports={
    PostRoute
}
