const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conversation',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    parentMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'message',
      default: null,
    },
    content: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      enum: ['text', 'file', 'shared_event'],
      required: true,
    },
    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    isThread: {
      type: Boolean,
      default: false,
    },
    threadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'thread',
      default: null,
    },
    reactions: [
      {
        by: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
        reaction: String,
      },
    ],
    media: [
      {
        type: String, 
      },
    ],
    isPinned: {
      type: Boolean,
      default: false,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: null,
    },
    updatedLogs: {
      type: [mongoose.Schema.Types.Mixed], 
      default: [],
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

module.exports = mongoose.model('message', messageSchema);
