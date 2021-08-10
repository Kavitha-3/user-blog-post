const {Router}=require("express");
const {Authorization}=require("../middlewares/Authorization");
const {PostController}=require("./post.controller");
/**
 * initializing post routes
 * @category Routes
 * @subcategory PostRoute
 */
const PostRoute=Router();

PostRoute.post("/",Authorization,PostController.create);
PostRoute.get("/user/:id",PostController.getUserPost);
PostRoute.get("/",PostController.getMany);
PostRoute.get("/:id",PostController.getOne);
PostRoute.delete("/:id",Authorization,PostController.deleteOne);

module.exports={
    PostRoute
}