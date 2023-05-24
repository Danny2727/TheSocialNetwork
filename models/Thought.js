const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reaction")

// Schema to create Thougt Model
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
            //Use a getter method to format the timestamp on query
            get: timestamp => timestamp.toUTCString()
            
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            reactionSchema
        ],
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      },
);

// Create a virtual property "freindCount" that retrives the length of the user's freinds

thoughtSchema
.virtual('reactionCount')
// Getter
.get(function () {
    return this.rections.length;
});

// Initialize our User model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;

