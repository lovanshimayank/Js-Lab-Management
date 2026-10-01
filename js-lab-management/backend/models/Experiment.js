const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema(
  {
    experiment_name: {
      type: String,
      required: true,
      trim: true
    },

    module: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: '',
      trim: true
    },

    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending'
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

module.exports = mongoose.model('Experiment', experimentSchema);