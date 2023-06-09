const Post = require("../models/post");

// Greating Post
exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host"); // Building url
  const post = new Post({
    UserId: req.auth.userId,
    title: req.body.title,
    description: req.body.description,
    imageUrl: url + "/images/" + req.file.filename,
  });
  post
    .save()
    .then(() => {
      res.status(201).json(
        post
      );
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

// Getting all post on Home page
exports.getAllpost = (req, res, next) => {
  Post.findAll()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};
