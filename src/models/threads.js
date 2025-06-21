const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema(
  {
    rootMessageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'message',
      required: true
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conversation',
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('thread', threadSchema);
