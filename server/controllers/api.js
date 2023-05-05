const Post = require("../models/post");
const fs = require("fs");
module.exports = class API {
  //fectall
  static async fetchAllPost(req, res) {
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  //fect by id
  static async fetchByid(req, res) {
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  //create post
  static async create(req, res) {
    const post = req.body;
    const imageName = req.file.filename;
    post.image = imageName;
    try {
      await Post.create(post);
      res.status(201).json({ message: "User created successfully!" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  //update post
  static async update(req, res) {
    const id = req.params.id;
    let new_image = "";
    if (req.file) {
      new_image = req.file.filename;
      try {
        fs.unlinkSync("./uploads/" + req.body.old_image);
      } catch (error) {
        console.log(error);
      }
    } else {
      new_image = req.body.old_image;
    }
    const newPost = req.body;
    newPost.image = new_image;
    try {
      await Post.findByIdAndUpdate(id, newPost);
      res.status(200).json({ message: "User update successly!" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  //delete post
  static async delete(req, res) {
    const id = req.params.id;
    try {
      const result = await Post.findByIdAndDelete(id);
      if (result.image != "") {
        try {
          fs.unlinkSync("./uploads/" + result.image);
        } catch (error) {
          console.log(error);
        }
      }
      res.status(200).json({ message: "User delete successly!" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};
