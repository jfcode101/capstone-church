import Post from "../models/postModel.js";

// create a new post
export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all the post
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
