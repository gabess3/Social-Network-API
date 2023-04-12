const { Schema, model } = require("mongoose");
const Reaction = require("./reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    username: {
      type: String,
      required: true,
    },

    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

thoughtSchema.virtual("formatCreatedAt").get(function () {
  return new Date(this.createdAt).toLocaleDateString();
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
