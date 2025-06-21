const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group',
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: null,
    },
    status: {
      type: String,
      default: 'active',
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

module.exports = mongoose.model('task', taskSchema);
