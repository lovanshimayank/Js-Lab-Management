// ========================================================
// Express Server - JS Lab Management System
// MongoDB Version
// ========================================================

require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');

const db = require('./db');

const Student = require('./models/Student');
const Experiment = require('./models/Experiment');

const studentsRouter = require('./routes/students');
const experimentsRouter = require('./routes/experiments');

const app = express();

const PORT = process.env.PORT || 5000;

// --------------------------------------------------------
// Middleware
// --------------------------------------------------------

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);

// Serve frontend
app.use(
  express.static(
    path.join(__dirname, '../frontend')
  )
);

// --------------------------------------------------------
// Health / Database Status
// --------------------------------------------------------

app.get('/api/status', (req, res) => {
  res.status(200).json({
    success: true,
    application: 'JS Lab Management System',
    version: '1.0.0',
    db: db.getStatus()
  });
});

// --------------------------------------------------------
// Dashboard Statistics
// --------------------------------------------------------

app.get('/api/stats', async (req, res, next) => {
  try {
    const [
      totalStudents,
      totalExperiments,
      completedExperiments,
      pendingExperiments
    ] = await Promise.all([
      Student.countDocuments(),

      Experiment.countDocuments(),

      Experiment.countDocuments({
        status: 'Completed'
      }),

      Experiment.countDocuments({
        status: 'Pending'
      })
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalExperiments,
        completedExperiments,
        pendingExperiments,
        dbStatus: db.getStatus()
      }
    });
  } catch (error) {
    next(error);
  }
});

// --------------------------------------------------------
// API Routes
// --------------------------------------------------------

app.use(
  '/api/students',
  studentsRouter
);

app.use(
  '/api/experiments',
  experimentsRouter
);

// --------------------------------------------------------
// Frontend fallback
// --------------------------------------------------------

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      message:
        `API endpoint "${req.path}" not found.`
    });
  }

  res.sendFile(
    path.join(
      __dirname,
      '../frontend/index.html'
    )
  );
});

// --------------------------------------------------------
// Error Handler
// --------------------------------------------------------

app.use((err, req, res, next) => {
  console.error(
    '[Server Error]',
    err.message
  );

  const statusCode =
    err.status || 500;

  res.status(statusCode).json({
    success: false,
    message:
      err.message ||
      'An unexpected internal server error occurred.'
  });
});

// --------------------------------------------------------
// Start Server AFTER MongoDB connects
// --------------------------------------------------------

async function startServer() {
  try {
    await db.initDatabase();

    app.listen(PORT, () => {
      console.log(
        '========================================================'
      );

      console.log(
        ` JS Lab Management System Server Running on Port ${PORT}`
      );

      console.log(
        ` Web Application: http://localhost:${PORT}`
      );

      console.log(
        ` API Base URL:    http://localhost:${PORT}/api`
      );

      console.log(
        '========================================================'
      );
    });
  } catch (error) {
    console.error(
      '[Startup Error]',
      error.message
    );

    process.exit(1);
  }
}

startServer();