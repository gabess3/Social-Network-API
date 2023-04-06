const { User, Thought } = require('../models');

module.exports = {
    // Get All Users
    getAllUsers(req, res) {
        User.find()
        .then(response => res.json(response))
        .catch((err) => res.status(500).json(err));
    },

    // Get Single User with Thought and Friend data
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.ObjectId })
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user found with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },

    // Create a new user
    createNewUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // Update user by ID
    updateUser(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with this id!' })
                : res.json(user)
            )
            .catch((err) => {
            console.log(err);
            res.status(500).json(err);
            });
    },

    // Delete a user and its associated thoughts
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.ObjectId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: 'User and associated thoughts have been deleted.' }))
          .catch((err) => res.status(500).json(err));
      },
}