const { Schema, Types } = require('mongoose');
// Schema to create Post model
const friendSchema = new Schema(
  {
    friendId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    FriendBody: {
      type: String,
      minLength: 0,
    },
  },
  {
    toJSON: {
      virtuals: false,
    },
    id: true,
  }
);



module.exports = friendSchema;