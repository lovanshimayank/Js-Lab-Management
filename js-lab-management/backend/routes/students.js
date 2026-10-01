// ========================================================
// Students Route - MongoDB
// ========================================================

const express = require('express');
const router = express.Router();

const Student = require('../models/Student');

// GET /api/students
// Retrieve all students or search students
router.get('/', async (req, res, next) => {
  try {
    const { q } = req.query;

    let filter = {};

    if (q && q.trim()) {
      const search = q.trim();

      filter = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { student_id: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { course: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const students = await Student.find(filter)
      .sort({ _id: -1 })
      .lean();

    // Convert MongoDB _id to id so your existing frontend keeps working
    const data = students.map(student => ({
      id: student._id.toString(),
      student_id: student.student_id,
      name: student.name,
      email: student.email,
      course: student.course,
      semester: student.semester,
      created_at: student.created_at
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

// POST /api/students
// Add a new student
router.post('/', async (req, res, next) => {
  try {
    const {
      student_id,
      name,
      email,
      course,
      semester
    } = req.body;

    if (!student_id || !name || !email || !course || !semester) {
      return res.status(400).json({
        success: false,
        message:
          'All fields (Student ID, Name, Email, Course, Semester) are required.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format provided.'
      });
    }

    const student = await Student.create({
      student_id: student_id.trim(),
      name: name.trim(),
      email: email.trim(),
      course: course.trim(),
      semester: semester.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Student added successfully!',
      data: {
        id: student._id.toString(),
        student_id: student.student_id,
        name: student.name,
        email: student.email,
        course: student.course,
        semester: student.semester,
        created_at: student.created_at
      }
    });
  } catch (error) {
    // MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Student ID or Email already exists in the database.'
      });
    }

    next(error);
  }
});

// DELETE /api/students/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found.'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully!'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;