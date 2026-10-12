# JS Lab Management System

A complete, lightweight, and beginner-friendly full-stack web application designed for a college **JavaScript Laboratory Course**.

This project serves two primary purposes:
1. **A Usable Laboratory Management Dashboard:** Manage students and syllabus experiments with full Create, Read, Update, and Delete (CRUD) operations backed by a MySQL database and an Express REST API.
2. **An Interactive JavaScript Concepts Lab:** A hands-on browser testing ground where every topic in the JavaScript curriculum is demonstrated with live execution, explanation, input controls, and clean syntax code.

---

## 1. Features

- **Dashboard:**
  - Real-time statistics: Total Students, Total Experiments, Completed Experiments, and Pending Experiments.
  - Interactive "JavaScript Concepts Covered" grid linking directly to practical demos.
  - Live visual indicator for MySQL database connection status.
- **Students Management:**
  - Register new students with validation (ID, Name, Email, Course, Semester).
  - List all enrolled students dynamically using native `fetch()`.
  - Search students in real time by name, ID, or course.
  - Delete student records with confirmation.
- **Experiments Management:**
  - Add laboratory syllabus experiments with module categorization.
  - Filter experiments by keyword or status (`Pending` vs `Completed`).
  - 1-click status toggling (`Pending` &harr; `Completed`).
  - Delete experiment entries.
- **Interactive JavaScript Concepts Lab:**
  - **Module 1 (Basics):** Statements, semicolons, expressions, identifiers, `var` vs `let` vs `const`, lexical/block/function scoping, reserved keywords, and hoisting.
  - **ECMAScript Timeline:** Comprehensive evolution timeline from 1995 (Mocha/LiveScript) to modern ES2025 with 1-3 features per release; JS vs ECMAScript explanation; ES5 vs ES6+ side-by-side comparison.
  - **Module 2 (Data Types & Casting):** Primitives (`string`, `number`, `boolean`, `undefined`, `null`, `bigint`, `symbol`) vs Reference (`object`, `array`, `function`); live `typeof` Type Checker; implicit coercion vs explicit casting (`Number()`, `String()`, `Boolean()`, `parseInt()`, `parseFloat()`).
  - **Operators:** Arithmetic (`+`, `-`, `*`, `/`, `%`, `**`), Relational (loose `==` vs strict `===`, `!=`, `<`, `>`), Logical (`&&`, `||`, `!`), and Assignment (`+=`, etc.).
  - **Module 3 (Control Flow & Loops):** Grade Calculator (`if...else if...else`), Day Selector (`switch`), loops (`for`, `while`, `do...while`, `for...of`, `for...in`), jump statements (`break`, `continue`, `return`).
  - **Error Handling:** `try`, `catch`, `finally`, `throw` with age input validation; safe UI display without exposing server stack traces.
  - **Module 4 (Standard Objects):** Number literals & methods (`toFixed`, `toPrecision`, `toString`), Math object methods and random number generator formula, Date object methods and live Age Calculator.
  - **Strings & Arrays:** String methods (`slice`, `substring`, `indexOf`, `includes`, `replace`, `trim`, `split`, `charAt`), Interactive Array Editor with `push`, `pop`, `shift`, `unshift`, `slice`, `splice`, `join`, `map`, `filter`, `reduce`, `find`.
  - **Module 5 (Advanced Functions):** Function declarations vs expressions vs arrow functions, parameters vs arguments, function calculator, closure counter with state memory, and regular expressions with practical validators (Email, Mobile, Password, Username).

---

## 2. Technology Stack

- **Frontend:** HTML5, CSS3 (Variables, Flexbox & Grid), Vanilla JavaScript (ES6+ native DOM & `fetch`). No heavy frameworks (no React/Vue/Angular).
- **Backend:** Node.js, Express.js.
- **Database:** MySQL Server 8.0+.
- **Database Driver:** `mysql2` (with promise pool and parameterized queries).
- **Environment Management:** `dotenv`.
- **CORS Handling:** `cors`.

---

## 3. Project Structure

```text
js-lab-management/
│
├── frontend/
│   ├── index.html          # Main single-page interface
│   ├── css/
│   │   └── style.css       # Clean, modern stylesheet
│   └── js/
│       ├── app.js          # App controller & fetch() integration
│       ├── concepts.js     # JavaScript Concepts Lab execution engine
│       └── validation.js   # Form & regex validation library
│
├── backend/
│   ├── server.js           # Express app setup & API routing
│   ├── db.js               # MySQL2 pool & query helper (with demo fallback)
│   ├── routes/
│   │   ├── students.js     # Student CRUD REST routes
│   │   └── experiments.js  # Experiment CRUD REST routes
│   ├── package.json        # Backend dependencies & start script
│   ├── .env.example        # Sample environment variables
│   └── .env                # Local environment variables (untracked)
│
├── database/
│   └── schema.sql          # MySQL database & table definitions + starter data
│
├── README.md               # Documentation & viva study guide
└── .gitignore              # Ignored files (node_modules, .env)
```

---

## 4. Prerequisites

Before running the project, make sure you have installed:
1. **Node.js** (v18.0.0 or higher) - [Download Node.js](https://nodejs.org/)
2. **MySQL Server** (Community Edition or XAMPP / WampServer) - [Download MySQL](https://dev.mysql.com/downloads/mysql/)

Verify installation in your terminal:
```bash
node -v
npm -v
mysql --version
```

---

## 5. Database Setup (MySQL)

### Step 1: Start MySQL Server
Make sure your MySQL service is running (via Windows Services, MySQL Command Line, or XAMPP Control Panel).

### Step 2: Import the Database Schema
Open your terminal or command prompt, navigate to `js-lab-management/database/`, and run:

```bash
# Log into MySQL and run the schema script
mysql -u root -p < schema.sql
```
*(If your root user has no password, you can run: `mysql -u root < schema.sql`)*

Alternatively, open **MySQL Workbench** or **phpMyAdmin**, open `database/schema.sql`, and execute it.

This will automatically create:
- Database: `js_lab_db`
- Tables: `students` and `experiments`
- Pre-populated starter sample records.

---

## 6. Environment Variable Setup

In the `backend/` directory, verify or create the `.env` file:

```ini
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=js_lab_db
DB_PORT=3306
```

*(Note: If your MySQL `root` user does not have a password, leave `DB_PASSWORD=` blank).*

---

## 7. How to Install and Run

### Step 1: Install Backend Dependencies
Open your terminal in the `backend` folder:

```bash
cd js-lab-management/backend
npm install
```

### Step 2: Start the Server
Run:
```bash
npm start
```
You will see output similar to:
```text
========================================================
 JS Lab Management System Server Running on Port 5000
 Web Application: http://localhost:5000
 API Base URL:    http://localhost:5000/api
========================================================
[Database] Successfully connected to MySQL database: "js_lab_db"
```

### Step 3: Open in Browser
Open your browser and navigate to:
```text
http://localhost:5000
```
The Express server serves both the REST API and the frontend dashboard automatically.

> **Viva Resilience Feature:** If you run the project without starting MySQL, the backend automatically informs you in the console and falls back to an in-memory demo store. This guarantees that your project and practical demo will never crash in front of an examiner!

---

## 8. REST API Endpoints

| Method | Endpoint | Description | Request Body (JSON) |
|---|---|---|---|
| `GET` | `/api/status` | Check server and MySQL database connectivity | None |
| `GET` | `/api/stats` | Aggregated dashboard statistics | None |
| `GET` | `/api/students` | Get all students (supports `?q=query`) | None |
| `POST` | `/api/students` | Register a new student | `{ student_id, name, email, course, semester }` |
| `DELETE` | `/api/students/:id` | Delete student by primary key ID | None |
| `GET` | `/api/experiments` | Get all experiments (supports `?q=&status=`) | None |
| `POST` | `/api/experiments` | Create new lab experiment | `{ experiment_name, module, description, status }` |
| `PUT` | `/api/experiments/:id` | Update experiment status | `{ status: "Pending" \| "Completed" }` |
| `DELETE` | `/api/experiments/:id`| Delete experiment by primary key ID | None |

---

## 9. Security Best Practices Implemented

1. **SQL Injection Defense:** All queries utilize **parameterized statements** (`?` placeholders in `mysql2`).
2. **Input Validation:** Data is checked both on the client side (`validation.js`) and validated on the server side (`routes/students.js`).
3. **No Leaked Stack Traces:** Centralized Express error handler returns safe JSON messages to clients instead of raw database stack traces.
4. **Credential Isolation:** Database credentials reside exclusively in `.env` and are excluded from Git via `.gitignore`.
5. **Cross-Site Scripting (XSS) Prevention:** Output rendering uses `App.escapeHtml()` and `textContent` rather than direct `innerHTML` injection of unescaped user inputs.

---

## 10. Practical / Viva Voce Explanation Guide

Here are common viva questions and sample answers:

### Q1: What is the difference between `var`, `let`, and `const`?
- `var` is function-scoped (or global), can be re-declared and updated, and its declaration is hoisted with a default value of `undefined`.
- `let` is block-scoped (`{ ... }`), can be re-assigned but not re-declared in the same block, and resides in the **Temporal Dead Zone (TDZ)** before declaration.
- `const` is block-scoped and immutable (cannot be re-assigned). It must be initialized when declared.

### Q2: What is a Closure in JavaScript?
A closure is the combination of a function bundled together with references to its surrounding lexical state. In our **Closure Counter** demo, `createCounter()` creates a private variable `count`. Even after `createCounter()` finishes execution, the returned inner function still retains access to `count` in memory.

### Q3: What is the difference between `==` and `===`?
- `==` (Loose Equality) performs type coercion before comparison (e.g., `5 == "5"` is `true`).
- `===` (Strict Equality) checks both the value and the data type without coercion (e.g., `5 === "5"` is `false`).

### Q4: How does the frontend communicate with the backend?
Through the asynchronous `fetch()` API. When the user submits a form or clicks delete, JavaScript prevents the default page reload (`e.preventDefault()`), sends an HTTP request with JSON payload to Express, waits for the response using `async/await`, and updates only the necessary DOM elements.

### Q5: What is Hoisting?
Hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their containing scope during the compilation phase before code execution.

---

## 11. Common Errors and Solutions

1. **`connect ECONNREFUSED 127.0.0.1:3306`**
   - **Cause:** MySQL Server is stopped or not running on port 3306.
   - **Fix:** Start MySQL service using Windows Services or XAMPP.
2. **`ER_ACCESS_DENIED_ERROR`**
   - **Cause:** Incorrect MySQL username or password in `backend/.env`.
   - **Fix:** Check `DB_USER` and `DB_PASSWORD` in `backend/.env`.
3. **`ER_BAD_DB_ERROR: Unknown database 'js_lab_db'`**
   - **Cause:** Schema was not imported.
   - **Fix:** Run `mysql -u root -p < database/schema.sql`.
4. **Port 5000 Already in Use (`EADDRINUSE`)**
   - **Fix:** Change `PORT=5001` inside `backend/.env` and re-run `npm start`.

---

## 12. Complete Syllabus Practical Mapping Table

| Syllabus Topic | Practical Feature in Project | Source Code Location |
|---|---|---|
| **JavaScript Basics & Syntax** | Statements, comments, semicolons, identifiers, expressions | `frontend/js/concepts.js` (`runSyntaxDemo`) |
| **Variables (`var`, `let`, `const`)** | Interactive variable mutability & re-declaration tester | `frontend/js/concepts.js` (`runVariableDemo`) |
| **Variable Scope** | Global vs Function vs Block Scope demonstrator | `frontend/js/concepts.js` (`runScopeDemo`) |
| **Keywords & Reserved Words** | Predefined language keyword explorer & explanation | `frontend/index.html` & `frontend/js/concepts.js` |
| **Hoisting** | `var` hoisting vs `let`/`const` Temporal Dead Zone demo | `frontend/js/concepts.js` (`runHoistingDemo`) |
| **JavaScript History / ECMAScript** | Interactive 1995-2025 timeline, JS vs ECMAScript, ES5 vs ES6 | `frontend/index.html` (Timeline & Comparison) |
| **Data Types** | Primitives & Reference types, `typeof` operator | `frontend/js/concepts.js` (`runTypeChecker`) |
| **Type Conversion** | Implicit (`"5" + 2`, `"5" - 2`) & Explicit (`Number()`, `parseInt()`, etc.) | `frontend/js/concepts.js` (`runTypeConversion`) |
| **Operators** | Arithmetic, Relational (`==` vs `===`), Logical, Assignment | `frontend/js/concepts.js` (`runOperatorCalc`) |
| **Conditionals** | Grade Calculator (`if...else if...else`) & Day Selector (`switch`) | `frontend/js/concepts.js` (`runGradeCalculator`, `runDaySelector`) |
| **Loops** | `for`, `while`, `do...while`, `for...of`, `for...in` | `frontend/js/concepts.js` (`runLoopDemo`) |
| **Jump Statements** | Loop jumps (`break`, `continue`) and function `return` | `frontend/js/concepts.js` (`runJumpDemo`) |
| **Error Handling** | `try`, `catch`, `finally`, `throw` with age validator | `frontend/js/concepts.js` (`runErrorDemo`) |
| **Numbers** | Literals (`10`, `0xFF`, `2e3`), `toFixed()`, `toPrecision()` | `frontend/js/concepts.js` (`runNumberMethodsDemo`) |
| **Math Object** | `round`, `floor`, `ceil`, `sqrt`, `pow`, random integer generator | `frontend/js/concepts.js` (`runMathDemo`) |
| **Date Object** | Live date/time components, age calculator from DOB | `frontend/js/concepts.js` (`initDateLab`, `runAgeCalculator`) |
| **Strings** | `length`, `slice`, `substring`, `indexOf`, `replace`, `trim`, `split` | `frontend/js/concepts.js` (`runStringDemo`) |
| **Arrays** | `push`, `pop`, `shift`, `unshift`, `splice`, `map`, `filter`, `reduce` | `frontend/js/concepts.js` (`runArrayOperation`) |
| **Functions** | Function declarations, expressions, arrow functions, params/args | `frontend/js/concepts.js` (`runFunctionDemo`) |
| **Function Scope** | Enclosed variables and local scoping | `frontend/js/concepts.js` (`runScopeDemo`) |
| **Closures** | Counter with private lexical memory (`increment`, `reset`) | `frontend/js/concepts.js` (`createCounter`, `runClosureAction`) |
| **Regular Expressions** | Regex patterns, `test()`, `exec()`, email, mobile & password checks | `frontend/js/validation.js` & `frontend/js/concepts.js` |
| **Database Connectivity** | MySQL connection pool, parameterized queries, schema | `backend/db.js` & `database/schema.sql` |
| **REST APIs & Full-Stack CRUD**| Express routes, async/await, native `fetch()`, status toggle | `backend/routes/`, `frontend/js/app.js` |
