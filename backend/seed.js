require('dotenv').config();

const db = require('./db');

const Student = require('./models/Student');
const Experiment = require('./models/Experiment');

const students = [
  {
    student_id: 'JS-2026-001',
    name: 'Aman Sharma',
    email: 'aman.sharma@example.edu',
    course: 'B.Tech CSE',
    semester: 'Semester 4'
  },
  {
    student_id: 'JS-2026-002',
    name: 'Riya Patel',
    email: 'riya.patel@example.edu',
    course: 'B.Tech IT',
    semester: 'Semester 4'
  },
  {
    student_id: 'JS-2026-003',
    name: 'Rahul Verma',
    email: 'rahul.verma@example.edu',
    course: 'BCA',
    semester: 'Semester 2'
  }
];

const experiments = [
  {
    experiment_name:
      'Syntax, Variables and Scope in JS',
    module: 'Module 1 - Basics',
    description:
      'Demonstrate var, let, const, hoisting, block scope and functions.',
    status: 'Completed'
  },
  {
    experiment_name:
      'Data Types and Type Conversion',
    module: 'Module 2 - Data & Ops',
    description:
      'Demonstrate primitive vs reference types, typeof, explicit and implicit casting.',
    status: 'Completed'
  },
  {
    experiment_name:
      'Operators and Control Structures',
    module: 'Module 2 - Data & Ops',
    description:
      'Implement arithmetic/relational calculators, if-else grade checks and switch-case.',
    status: 'Completed'
  },
  {
    experiment_name:
      'Loops and Jump Statements',
    module: 'Module 3 - Control Flow',
    description:
      'Execute for, while, do-while, for-of, for-in loops with break and continue.',
    status: 'Completed'
  },
  {
    experiment_name:
      'Error Handling with Try/Catch/Throw',
    module: 'Module 3 - Control Flow',
    description:
      'Safe error handling and validation with custom throw statements.',
    status: 'Pending'
  },
  {
    experiment_name:
      'Math and Date Object Applications',
    module: 'Module 4 - Standard Objects',
    description:
      'Generate random numbers, date formatting, and age calculation routines.',
    status: 'Pending'
  },
  {
    experiment_name:
      'String and Array Manipulations',
    module: 'Module 4 - Standard Objects',
    description:
      'Explore slice, splice, map, filter, reduce, indexOf, and regex parsing.',
    status: 'Pending'
  },
  {
    experiment_name:
      'Functions, Scope and Closures',
    module: 'Module 5 - Advanced Functions',
    description:
      'Implement arrow functions, lexical scoping, and persistent counter closure.',
    status: 'Pending'
  }
];

async function seed() {
  try {
    await db.initDatabase();

    await Student.deleteMany({});
    await Experiment.deleteMany({});

    await Student.insertMany(students);
    await Experiment.insertMany(experiments);

    console.log('======================================');
    console.log('MongoDB seed completed successfully!');
    console.log(`Students: ${students.length}`);
    console.log(`Experiments: ${experiments.length}`);
    console.log('======================================');

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();