const UserReadPost = require("../models/userReadPost");

exports.isRead = (req, res, next) => {
  UserReadPost.findOne({
    where: {
      UserId: req.auth.userId,
      PostId: req.params.postId,
    },
  })
    .then((read) => {
      if (read) {
        return res.sendStatus(201).json({
          read: true
        })
      } else {
        //  res.sendStatus(404).json({ message: "Didi not find anything" })
      }
    })
    .catch((error) => {
      console.log(error)

    });
};

exports.read = (req, res, next) => {
  UserReadPost.create({
    UserId: req.auth.userId,
    PostId: req.body.postId,
  })
    .then((read) => {
      console.log(read)
      if (read) {
        return res.sendStatus(201).json({
          read: true
        })
      } else {
        res.sendStatus(404).json({ message: "Didi not find anything" })
      }
    })
    .catch((error) => {
      console.log(error)

    });
}; 
