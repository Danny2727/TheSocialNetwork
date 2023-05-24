const { Schema, model } = require('mongoose');
const friendSchema = require('./Friend')
var validateEmail = function(email) {
    var validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return validate.test(email)
  };


// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, 
            validate: [validateEmail, "Please enter valid email"]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property "freindCount" that retrives the length of the user's freinds

userSchema
.virtual('freindCount')
// Getter
.get(function () {
    return this.friends.length;
});

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;