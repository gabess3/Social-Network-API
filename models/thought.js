const { Schema, model } = require('mongoose');
const Reaction = require('./reaction');

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
            required: true, 
            unique: true, 
        },

        username: {
                type: String,
                required: true,
        },

        reactions: [Reaction]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;