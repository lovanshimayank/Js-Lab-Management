// ========================================================
// Experiments Route - MongoDB
// ========================================================

const express = require('express');
const router = express.Router();

const Experiment = require('../models/Experiment');

// GET /api/experiments
router.get('/', async (req, res, next) => {
  try {
    const {
      q,
      status,
      module: expModule
    } = req.query;

    const filter = {};

    // Search experiment name / description / module
    if (q && q.trim()) {
      const search = q.trim();

      filter.$or = [
        {
          experiment_name: {
            $regex: search,
            $options: 'i'
          }
        },
        {
          description: {
            $regex: search,
            $options: 'i'
          }
        },
        {
          module: {
            $regex: search,
            $options: 'i'
          }
        }
      ];
    }

    // Filter by status
    if (status && ['Pending', 'Completed'].includes(status)) {
      filter.status = status;
    }

    // Filter by exact module
    if (expModule && expModule.trim()) {
      filter.module = expModule.trim();
    }

    const experiments = await Experiment.find(filter)
      .sort({ _id: -1 })
      .lean();

    const data = experiments.map(experiment => ({
      id: experiment._id.toString(),
      experiment_name: experiment.experiment_name,
      module: experiment.module,
      description: experiment.description,
      status: experiment.status,
      created_at: experiment.created_at
    }));

    res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/experiments
router.post('/', async (req, res, next) => {
  try {
    const {
      experiment_name,
      module: expModule,
      description,
      status
    } = req.body;

    if (!experiment_name || !expModule) {
      return res.status(400).json({
        success: false,
        message: 'Experiment Name and Module are required.'
      });
    }

    const expStatus =
      status === 'Completed'
        ? 'Completed'
        : 'Pending';

    const experiment = await Experiment.create({
      experiment_name: experiment_name.trim(),
      module: expModule.trim(),
      description: (description || '').trim(),
      status: expStatus
    });

    res.status(201).json({
      success: true,
      message: 'Experiment created successfully!',
      data: {
        id: experiment._id.toString(),
        experiment_name: experiment.experiment_name,
        module: experiment.module,
        description: experiment.description,
        status: experiment.status,
        created_at: experiment.created_at
      }
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/experiments/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (
      !status ||
      !['Pending', 'Completed'].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message:
          'Status must be either "Pending" or "Completed".'
      });
    }

    const experiment =
      await Experiment.findByIdAndUpdate(
        id,
        { status },
        {
          new: true,
          runValidators: true
        }
      );

    if (!experiment) {
      return res.status(404).json({
        success: false,
        message: 'Experiment not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: `Experiment status updated to ${status}.`,
      data: {
        id: experiment._id.toString(),
        experiment_name: experiment.experiment_name,
        module: experiment.module,
        description: experiment.description,
        status: experiment.status,
        created_at: experiment.created_at
      }
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/experiments/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedExperiment =
      await Experiment.findByIdAndDelete(id);

    if (!deletedExperiment) {
      return res.status(404).json({
        success: false,
        message: 'Experiment not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Experiment deleted successfully!'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;