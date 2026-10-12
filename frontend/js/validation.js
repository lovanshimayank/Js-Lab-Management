// ========================================================
// Form & Data Validation Library (ES6+ Regular Expressions)
// ========================================================

const Validation = {
  // Predefined Regular Expression Patterns
  patterns: {
    // Standard RFC-compliant simplified email pattern
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

    // 10-digit mobile number starting with 6, 7, 8, or 9
    mobile: /^[6-9]\d{9}$/,

    // Alphanumeric username with underscores (3-16 chars)
    username: /^[a-zA-Z0-9_]{3,16}$/,

    // Password: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character
    passwordStrong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

    // Student ID pattern: e.g. JS-2026-001 or any clean alphanumeric code
    studentId: /^[a-zA-Z0-9-_]{3,20}$/,

    // Name: letters and spaces only, 2-50 chars
    name: /^[a-zA-Z\s.]{2,50}$/
  },

  // Validate Student ID
  validateStudentId(id) {
    if (!id || typeof id !== 'string') return 'Student ID is required.';
    if (!this.patterns.studentId.test(id.trim())) {
      return 'Student ID must be 3-20 alphanumeric characters (e.g., JS-2026-001).';
    }
    return null;
  },

  // Validate Name
  validateName(name) {
    if (!name || typeof name !== 'string') return 'Full name is required.';
    if (!this.patterns.name.test(name.trim())) {
      return 'Name must contain only alphabets and spaces (2-50 characters).';
    }
    return null;
  },

  // Validate Email
  validateEmail(email) {
    if (!email || typeof email !== 'string') return 'Email address is required.';
    if (!this.patterns.email.test(email.trim())) {
      return 'Please enter a valid email address (e.g., student@example.edu).';
    }
    return null;
  },

  // Validate Course
  validateCourse(course) {
    if (!course || course.trim().length === 0) return 'Course selection is required.';
    return null;
  },

  // Validate Semester
  validateSemester(semester) {
    if (!semester || semester.trim().length === 0) return 'Semester is required.';
    return null;
  },

  // Complete Student Form Validator
  validateStudentForm(formData) {
    const errors = {};

    const idErr = this.validateStudentId(formData.student_id);
    if (idErr) errors.student_id = idErr;

    const nameErr = this.validateName(formData.name);
    if (nameErr) errors.name = nameErr;

    const emailErr = this.validateEmail(formData.email);
    if (emailErr) errors.email = emailErr;

    const courseErr = this.validateCourse(formData.course);
    if (courseErr) errors.course = courseErr;

    const semErr = this.validateSemester(formData.semester);
    if (semErr) errors.semester = semErr;

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Validate Experiment Form
  validateExperimentForm(formData) {
    const errors = {};

    if (!formData.experiment_name || formData.experiment_name.trim().length < 3) {
      errors.experiment_name = 'Experiment name must be at least 3 characters.';
    }

    if (!formData.module || formData.module.trim().length === 0) {
      errors.module = 'Module name is required.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};

// Make available globally in browser
window.Validation = Validation;
