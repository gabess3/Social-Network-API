const { User, Thought } = require("../models");

module.exports = {
  // Get All Thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((response) => res.json(response))
      .catch((err) => res.status(500).json(err));
  },

  // Get Single Thought by ID
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.ObjectId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Post a new thought
  createNewThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json("Created the thought!")
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update thought by ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this id." })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete Thought by ID
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with this id." })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Something went wrong.",
            })
          : res.json({ message: "Thought successfully deleted." })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Adds a reaction to corresponding thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found! No reaction was added." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Deletes reaction from corresponding thought
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found! Reaction was not removed." })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
