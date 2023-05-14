const { Schema, model } = require('mongoose');

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
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
            //Array of nested documents created with the reactionSchema
            },
        ],
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
      },
);

// Create a virtual property "reaction count" that retreives the length of the reactions array
thoughtSchema
.virtual('reactions')
//Getter
.get(function() {
    return this.reactions.length;
});

// Initialize our Application model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;

