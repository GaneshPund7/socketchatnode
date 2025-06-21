 const mongoose = require('mongoose');
const conversationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['private', 'group', 'public'],
    },
    userBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    userTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group',
    },
    sharedMedia: {
      type: [mongoose.Schema.Types.Mixed], 
      default: [],
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('conversation', conversationSchema);
