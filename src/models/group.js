const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    type: {
      type: String,
      enum: ['collaboration', 'announcement'],
      required: true
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task'
      }
    ],
    avatarUrl: {
      type: String,
      default: ''
    },
    managers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('group', groupSchema);
