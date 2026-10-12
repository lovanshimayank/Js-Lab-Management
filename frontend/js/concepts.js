// ========================================================
// JavaScript Concepts Lab - Interactive Engine
// All demonstrations execute REAL JavaScript logic
// ========================================================

const ConceptsLab = {
  // ------------------------------------------------------
  // 1. JavaScript Syntax & Variables Demonstrations
  // ------------------------------------------------------
  runSyntaxDemo() {
    const out = document.getElementById('out-syntax');
    // Actual statements, expressions, comments, and identifiers
    const greeting = "Hello, JavaScript Student!"; // statement + string literal identifier
    const count = 5 + 3; // expression evaluated to 8

    out.textContent = 
      `// 1. Identifier declaration & Assignment Statement\n` +
      `let greeting = "${greeting}";\n\n` +
      `// 2. Arithmetic Expression\n` +
      `let count = 5 + 3; // Evaluated value: ${count}\n\n` +
      `// 3. Statement Execution\n` +
      `console.log(greeting); // Output: ${greeting}\n` +
      `Statements terminate with semicolons (;), while expressions yield a value.`;
  },

  runVariableDemo() {
    const varType = document.getElementById('var-select').value;
    const out = document.getElementById('out-variable');

    if (varType === 'var') {
      // var demonstration: function-scoped and re-declarable
      var x = 10;
      var x = 20; // Re-declared without error
      out.textContent = 
        `var x = 10;\n` +
        `var x = 20; // Allowed: var can be re-declared and updated!\n` +
        `Final Value: ${x}\nScope: Function-scoped (or globally scoped if declared outside a function).`;
    } else if (varType === 'let') {
      // let demonstration: block-scoped and re-assignable, but not re-declarable in same scope
      let y = 15;
      y = 30; // Re-assigned
      out.textContent = 
        `let y = 15;\n` +
        `y = 30; // Allowed: let can be re-assigned.\n` +
        `// let y = 40; // ERROR! Cannot re-declare 'y' in the same block scope.\n` +
        `Final Value: ${y}\nScope: Block-scoped { ... }.`;
    } else if (varType === 'const') {
      // const demonstration: block-scoped and immutable binding
      const z = 50;
      out.textContent = 
        `const z = 50;\n` +
        `// z = 100; // TypeError: Assignment to constant variable!\n` +
        `Final Value: ${z}\nScope: Block-scoped. Must be initialized during declaration.`;
    }
  },

  runScopeDemo() {
    const out = document.getElementById('out-scope');
    const globalVar = "I am Global (accessible anywhere)";
    let log = [];

    log.push(`1. Global Scope: "${globalVar}"`);

    function testFunctionScope() {
      const functionScoped = "I am Function Scoped (local to testFunctionScope)";
      log.push(`2. Inside Function: "${functionScoped}" and "${globalVar}"`);

      if (true) {
        let blockScoped = "I am Block Scoped (only inside this if-block)";
        var functionScopedVar = "I am declared with var inside block (hoisted to function)";
        log.push(`3. Inside Block: "${blockScoped}"`);
      }

      log.push(`4. After Block: functionScopedVar is accessible -> "${functionScopedVar}"`);
      log.push(`5. After Block: trying to access blockScoped directly throws ReferenceError.`);
    }

    testFunctionScope();
    out.textContent = log.join('\n');
  },

  runHoistingDemo() {
    const out = document.getElementById('out-hoisting');
    // Explaining var vs let/const hoisting
    let explanation = 
      `// --- 1. var Hoisting Demonstration ---\n` +
      `console.log(hoistedVar); // Output: undefined (declaration is hoisted, not value)\n` +
      `var hoistedVar = "Initialized now";\n` +
      `console.log(hoistedVar); // Output: "Initialized now"\n\n` +
      `// --- 2. let / const Hoisting Demonstration ---\n` +
      `// console.log(hoistedLet); // ReferenceError: Cannot access 'hoistedLet' before initialization!\n` +
      `// Temporal Dead Zone (TDZ) exists from start of block until let is initialized.\n` +
      `let hoistedLet = "Declared with let";\n` +
      `console.log(hoistedLet); // Output: "Declared with let"`;

    out.textContent = explanation;
  },

  // ------------------------------------------------------
  // 2. Data Types & Type Checker
  // ------------------------------------------------------
  runTypeChecker() {
    const input = document.getElementById('type-input').value;
    const out = document.getElementById('out-type-checker');

    let parsedVal;
    let category = "Primitive";
    let detectedType = "";

    // Parse input safely
    if (input === 'undefined') {
      parsedVal = undefined;
      detectedType = typeof undefined;
    } else if (input === 'null') {
      parsedVal = null;
      detectedType = 'object (JS legacy quirk for null)';
    } else if (input === 'true' || input === 'false') {
      parsedVal = (input === 'true');
      detectedType = typeof parsedVal;
    } else if (!isNaN(Number(input)) && input.trim() !== '') {
      parsedVal = Number(input);
      detectedType = typeof parsedVal;
    } else if (input.startsWith('[') && input.endsWith(']')) {
      try {
        parsedVal = JSON.parse(input);
        detectedType = Array.isArray(parsedVal) ? 'array (Reference Object)' : typeof parsedVal;
        category = "Reference";
      } catch (e) {
        parsedVal = input;
        detectedType = typeof input;
      }
    } else if (input.startsWith('{') && input.endsWith('}')) {
      try {
        parsedVal = JSON.parse(input);
        detectedType = 'object (Reference Object)';
        category = "Reference";
      } catch (e) {
        parsedVal = input;
        detectedType = typeof input;
      }
    } else {
      parsedVal = input;
      detectedType = typeof input;
    }

    out.textContent = 
      `Input Value:   ${input}\n` +
      `Detected Type: ${detectedType}\n` +
      `Category:      ${category}\n` +
      `typeof result: ${typeof parsedVal}`;
  },

  runTypeConversion() {
    const rawVal = document.getElementById('conversion-input').value;
    const convType = document.getElementById('conversion-target').value;
    const out = document.getElementById('out-conversion');

    const origType = typeof rawVal;
    let converted;
    let convTypeOf;
    let methodUsed = "";

    switch (convType) {
      case 'Number':
        converted = Number(rawVal);
        convTypeOf = typeof converted;
        methodUsed = `Number("${rawVal}")`;
        break;
      case 'parseInt':
        converted = parseInt(rawVal, 10);
        convTypeOf = typeof converted;
        methodUsed = `parseInt("${rawVal}", 10)`;
        break;
      case 'parseFloat':
        converted = parseFloat(rawVal);
        convTypeOf = typeof converted;
        methodUsed = `parseFloat("${rawVal}")`;
        break;
      case 'String':
        converted = String(rawVal);
        convTypeOf = typeof converted;
        methodUsed = `String(${rawVal})`;
        break;
      case 'Boolean':
        // JS explicit boolean conversion rules
        converted = (rawVal === 'false' || rawVal === '0') ? false : Boolean(rawVal);
        convTypeOf = typeof converted;
        methodUsed = `Boolean("${rawVal}")`;
        break;
      case 'implicit_plus':
        converted = rawVal + 10;
        convTypeOf = typeof converted;
        methodUsed = `"${rawVal}" + 10 (String concatenation)`;
        break;
      case 'implicit_minus':
        converted = rawVal - 2;
        convTypeOf = typeof converted;
        methodUsed = `"${rawVal}" - 2 (Numeric coercion)`;
        break;
      case 'implicit_multiply':
        converted = rawVal * 3;
        convTypeOf = typeof converted;
        methodUsed = `"${rawVal}" * 3 (Numeric coercion)`;
        break;
      default:
        converted = rawVal;
        convTypeOf = typeof converted;
    }

    out.textContent = 
      `Operation / Method: ${methodUsed}\n` +
      `------------------------------------\n` +
      `Original Value:     "${rawVal}"\n` +
      `Original Type:      ${origType}\n` +
      `Converted Value:    ${converted}\n` +
      `Converted Type:     ${convTypeOf}\n` +
      `Is NaN:             ${Number.isNaN(converted)}`;
  },

  // ------------------------------------------------------
  // 3. Operators Calculator
  // ------------------------------------------------------
  runOperatorCalc() {
    const aInput = document.getElementById('op-a').value;
    const bInput = document.getElementById('op-b').value;
    const op = document.getElementById('op-select').value;
    const out = document.getElementById('out-operator');

    const numA = Number(aInput);
    const numB = Number(bInput);
    let result;
    let explanation = "";

    switch (op) {
      // Arithmetic
      case '+': result = numA + numB; explanation = `${numA} + ${numB} = ${result}`; break;
      case '-': result = numA - numB; explanation = `${numA} - ${numB} = ${result}`; break;
      case '*': result = numA * numB; explanation = `${numA} * ${numB} = ${result}`; break;
      case '/': result = numB !== 0 ? (numA / numB) : 'Division by zero!'; explanation = `${numA} / ${numB} = ${result}`; break;
      case '%': result = numA % numB; explanation = `Remainder: ${numA} % ${numB} = ${result}`; break;
      case '**': result = numA ** numB; explanation = `Power: ${numA} ** ${numB} = ${result}`; break;
      // Relational
      case '==': result = (aInput == bInput); explanation = `"${aInput}" == "${bInput}" (Loose equality with coercion) -> ${result}`; break;
      case '===': result = (aInput === bInput); explanation = `"${aInput}" === "${bInput}" (Strict equality, type check) -> ${result}`; break;
      case '!=': result = (aInput != bInput); explanation = `"${aInput}" != "${bInput}" -> ${result}`; break;
      case '!==': result = (aInput !== bInput); explanation = `"${aInput}" !== "${bInput}" (Strict inequality) -> ${result}`; break;
      case '>': result = numA > numB; explanation = `${numA} > ${numB} -> ${result}`; break;
      case '<': result = numA < numB; explanation = `${numA} < ${numB} -> ${result}`; break;
      case '>=': result = numA >= numB; explanation = `${numA} >= ${numB} -> ${result}`; break;
      case '<=': result = numA <= numB; explanation = `${numA} <= ${numB} -> ${result}`; break;
      // Logical
      case '&&': result = Boolean(numA && numB); explanation = `${Boolean(numA)} && ${Boolean(numB)} -> ${result}`; break;
      case '||': result = Boolean(numA || numB); explanation = `${Boolean(numA)} || ${Boolean(numB)} -> ${result}`; break;
      case '!': result = !Boolean(numA); explanation = `!${Boolean(numA)} -> ${result}`; break;
      // Assignment
      case '+=': let tempAdd = numA; tempAdd += numB; result = tempAdd; explanation = `a += b => ${result}`; break;
      case '-=': let tempSub = numA; tempSub -= numB; result = tempSub; explanation = `a -= b => ${result}`; break;
      case '*=': let tempMul = numA; tempMul *= numB; result = tempMul; explanation = `a *= b => ${result}`; break;
      case '/=': let tempDiv = numA; tempDiv /= numB; result = tempDiv; explanation = `a /= b => ${result}`; break;
      default: result = 'Select operator';
    }

    out.textContent = `Result: ${result}\nDetail: ${explanation}`;
  },

  // ------------------------------------------------------
  // 4. Control Structures & Loops
  // ------------------------------------------------------
  runGradeCalculator() {
    const marksInput = document.getElementById('marks-input').value;
    const out = document.getElementById('out-grade');
    const marks = Number(marksInput);

    if (isNaN(marks) || marks < 0 || marks > 100) {
      out.textContent = "Error: Please enter a valid mark between 0 and 100.";
      return;
    }

    let grade = "";
    let remarks = "";

    // if...else if...else control structure
    if (marks >= 90) {
      grade = "A+";
      remarks = "Outstanding Performance";
    } else if (marks >= 80) {
      grade = "A";
      remarks = "Excellent Work";
    } else if (marks >= 70) {
      grade = "B";
      remarks = "Good Effort";
    } else if (marks >= 60) {
      grade = "C";
      remarks = "Average";
    } else if (marks >= 40) {
      grade = "D";
      remarks = "Pass";
    } else {
      grade = "F";
      remarks = "Fail - Needs Improvement";
    }

    out.textContent = 
      `Marks:   ${marks} / 100\n` +
      `Grade:   ${grade}\n` +
      `Remarks: ${remarks}\n\n` +
      `Evaluated using:\nif (marks >= 90) { ... } else if (marks >= 80) { ... } else { ... }`;
  },

  runDaySelector() {
    const dayNum = parseInt(document.getElementById('day-select').value, 10);
    const out = document.getElementById('out-day');

    let dayName = "";
    let labSchedule = "";

    // switch statement demonstration
    switch (dayNum) {
      case 1:
        dayName = "Monday";
        labSchedule = "JS Lab Session: Syntax, Variables and Scope";
        break;
      case 2:
        dayName = "Tuesday";
        labSchedule = "JS Lab Session: Data Types and Type Conversion";
        break;
      case 3:
        dayName = "Wednesday";
        labSchedule = "JS Lab Session: Operators & Control Flow";
        break;
      case 4:
        dayName = "Thursday";
        labSchedule = "JS Lab Session: Loops and Jump Statements";
        break;
      case 5:
        dayName = "Friday";
        labSchedule = "JS Lab Session: Functions and Closures Practical";
        break;
      case 6:
        dayName = "Saturday";
        labSchedule = "Weekend Project Work & Review";
        break;
      case 7:
        dayName = "Sunday";
        labSchedule = "Laboratory Closed (Holiday)";
        break;
      default:
        dayName = "Invalid Day";
        labSchedule = "None";
    }

    out.textContent = 
      `Day:      ${dayName} (Value: ${dayNum})\n` +
      `Activity: ${labSchedule}\n\n` +
      `Evaluated using switch(dayNum) with case 1 to 7 and break statements.`;
  },

  runLoopDemo() {
    const loopType = document.getElementById('loop-select').value;
    const count = parseInt(document.getElementById('loop-count').value, 10) || 5;
    const out = document.getElementById('out-loop');

    let results = [];
    const students = ["Aman", "Riya", "Rahul"];

    if (loopType === 'for') {
      results.push(`// Standard 'for' loop (count: ${count})`);
      for (let i = 1; i <= count; i++) {
        results.push(`Iteration ${i}: for loop counter i = ${i}`);
      }
    } else if (loopType === 'while') {
      results.push(`// 'while' loop (condition checked before execution)`);
      let i = 1;
      while (i <= count) {
        results.push(`Iteration ${i}: while loop counter i = ${i}`);
        i++;
      }
    } else if (loopType === 'dowhile') {
      results.push(`// 'do...while' loop (always runs at least once)`);
      let i = 1;
      do {
        results.push(`Iteration ${i}: executed in do...while block`);
        i++;
      } while (i <= count);
    } else if (loopType === 'forof') {
      results.push(`// 'for...of' loop (Iterates over iterable values e.g. Array)`);
      results.push(`const students = ["Aman", "Riya", "Rahul"];`);
      for (const student of students) {
        results.push(`Student: ${student}`);
      }
    } else if (loopType === 'forin') {
      results.push(`// 'for...in' loop (Iterates over object / array keys/properties)`);
      const studentObj = { id: 'JS-101', name: 'Aman', semester: '4th' };
      for (const prop in studentObj) {
        results.push(`Property '${prop}': ${studentObj[prop]}`);
      }
    }

    out.textContent = results.join('\n');
  },

  runJumpDemo() {
    const jumpType = document.getElementById('jump-select').value;
    const out = document.getElementById('out-jump');
    let results = [];

    if (jumpType === 'break') {
      results.push(`// break statement terminates loop when i === 3`);
      for (let i = 1; i <= 5; i++) {
        if (i === 3) {
          results.push(`-> Hit break at i = ${i}! Exiting loop completely.`);
          break;
        }
        results.push(`Item: ${i}`);
      }
    } else if (jumpType === 'continue') {
      results.push(`// continue statement skips current iteration when i === 3`);
      for (let i = 1; i <= 5; i++) {
        if (i === 3) {
          results.push(`-> Hit continue at i = ${i}! Skipping this iteration.`);
          continue;
        }
        results.push(`Item: ${i}`);
      }
    } else if (jumpType === 'return') {
      function checkEligibility(score) {
        if (score < 40) {
          return "return early: Not Eligible (Score < 40)";
        }
        return "return: Eligible for Certificate";
      }
      results.push(`// return statement exits function and optionally returns value`);
      results.push(`checkEligibility(25) => "${checkEligibility(25)}"`);
      results.push(`checkEligibility(85) => "${checkEligibility(85)}"`);
    }

    out.textContent = results.join('\n');
  },

  // ------------------------------------------------------
  // 5. Error Handling Lab
  // ------------------------------------------------------
  runErrorDemo() {
    const ageInput = document.getElementById('error-age-input').value;
    const out = document.getElementById('out-error');

    let log = [];

    try {
      log.push("[try block started]");
      const age = Number(ageInput);

      if (ageInput.trim() === '') {
        throw new Error("Age input cannot be empty.");
      }
      if (isNaN(age)) {
        throw new Error("Age must be a valid number.");
      }
      if (age < 0) {
        throw new Error("Age cannot be negative.");
      }
      if (age > 120) {
        throw new Error("Age cannot exceed 120 years.");
      }
      if (age < 18) {
        throw new Error("Access Denied: Must be at least 18 years old to enroll in advanced JS lab.");
      }

      log.push(`Success! Age ${age} is valid. Enrollment approved.`);
    } catch (error) {
      log.push(`[catch block executed]`);
      // Safely display error message without exposing raw internal server stack traces
      log.push(`Caught Error: ${error.message}`);
    } finally {
      log.push(`[finally block executed] (Cleanup or final confirmation complete).`);
    }

    out.textContent = log.join('\n');
  },

  // ------------------------------------------------------
  // 6. Numbers & Math Object Lab
  // ------------------------------------------------------
  runNumberMethodsDemo() {
    const rawNum = parseFloat(document.getElementById('num-input').value) || 123.45678;
    const out = document.getElementById('out-numbers');

    out.textContent = 
      `Input Number:           ${rawNum}\n` +
      `toFixed(2):             ${rawNum.toFixed(2)} (Rounds to 2 decimal places as string)\n` +
      `toPrecision(4):         ${rawNum.toPrecision(4)} (Formats to 4 significant digits)\n` +
      `toString():             "${rawNum.toString()}"\n` +
      `toString(16) [Hex]:     "0x${Math.floor(rawNum).toString(16)}"\n` +
      `Number Literals Demo:   Decimal: 10, Float: 10.5, Hex: 0xFF (${0xFF}), Exp: 2e3 (${2e3})`;
  },

  runMathDemo() {
    const minVal = parseInt(document.getElementById('math-min').value, 10) || 1;
    const maxVal = parseInt(document.getElementById('math-max').value, 10) || 100;
    const sample = parseFloat(document.getElementById('math-sample').value) || 24.6;
    const out = document.getElementById('out-math');

    // Random Number formula: Math.floor(Math.random() * (max - min + 1)) + min
    const randomInt = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;

    out.textContent = 
      `Math Operations for sample ${sample}:\n` +
      `Math.round(${sample}):  ${Math.round(sample)}\n` +
      `Math.floor(${sample}):  ${Math.floor(sample)}\n` +
      `Math.ceil(${sample}):   ${Math.ceil(sample)}\n` +
      `Math.sqrt(64):         ${Math.sqrt(64)}\n` +
      `Math.pow(2, 5):        ${Math.pow(2, 5)}\n` +
      `Math.max(10, 50, 20):  ${Math.max(10, 50, 20)}\n` +
      `Math.min(10, 50, 20):  ${Math.min(10, 50, 20)}\n\n` +
      `Random Integer between [${minVal}, ${maxVal}]: ${randomInt}\n` +
      `Formula: Math.floor(Math.random() * (${maxVal} - ${minVal} + 1)) + ${minVal}`;
  },

  // ------------------------------------------------------
  // 7. Date Object & Age Calculator
  // ------------------------------------------------------
  initDateLab() {
    const outNow = document.getElementById('out-date-now');
    if (!outNow) return;

    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    outNow.textContent = 
      `new Date():         ${now.toString()}\n` +
      `getFullYear():      ${now.getFullYear()}\n` +
      `getMonth():         ${now.getMonth()} (${months[now.getMonth()]}, 0-indexed)\n` +
      `getDate():          ${now.getDate()}\n` +
      `getDay():           ${now.getDay()} (${days[now.getDay()]})\n` +
      `getHours():         ${now.getHours()}\n` +
      `getMinutes():       ${now.getMinutes()}\n` +
      `getSeconds():       ${now.getSeconds()}\n` +
      `toISOString():      ${now.toISOString()}`;
  },

  runAgeCalculator() {
    const dobInput = document.getElementById('dob-input').value;
    const out = document.getElementById('out-age');

    if (!dobInput) {
      out.textContent = "Please select a valid date of birth.";
      return;
    }

    const birthDate = new Date(dobInput);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    out.textContent = 
      `Date of Birth: ${birthDate.toDateString()}\n` +
      `Today's Date:  ${today.toDateString()}\n` +
      `Calculated Age: ${age} years old\n\n` +
      `Calculated using Date.getFullYear() and month/day offset comparison.`;
  },

  // ------------------------------------------------------
  // 8. Strings Lab
  // ------------------------------------------------------
  runStringDemo() {
    const str = document.getElementById('str-input').value || "  JavaScript Lab Management  ";
    const op = document.getElementById('str-op-select').value;
    const out = document.getElementById('out-string');

    let result;
    let snippet = "";

    switch (op) {
      case 'length':
        result = str.length;
        snippet = `str.length`;
        break;
      case 'toUpperCase':
        result = str.toUpperCase();
        snippet = `str.toUpperCase()`;
        break;
      case 'toLowerCase':
        result = str.toLowerCase();
        snippet = `str.toLowerCase()`;
        break;
      case 'slice':
        result = str.slice(2, 12);
        snippet = `str.slice(2, 12)`;
        break;
      case 'substring':
        result = str.substring(2, 12);
        snippet = `str.substring(2, 12)`;
        break;
      case 'indexOf':
        result = str.indexOf("Lab");
        snippet = `str.indexOf("Lab")`;
        break;
      case 'includes':
        result = str.includes("Script");
        snippet = `str.includes("Script")`;
        break;
      case 'replace':
        result = str.replace("Lab", "Laboratory");
        snippet = `str.replace("Lab", "Laboratory")`;
        break;
      case 'trim':
        result = str.trim();
        snippet = `str.trim()`;
        break;
      case 'split':
        result = JSON.stringify(str.trim().split(" "));
        snippet = `str.trim().split(" ")`;
        break;
      case 'charAt':
        result = str.charAt(2);
        snippet = `str.charAt(2)`;
        break;
      default:
        result = str;
    }

    out.textContent = 
      `Input String: "${str}"\n` +
      `Operation:    ${snippet}\n` +
      `Output:       ${result}`;
  },

  // ------------------------------------------------------
  // 9. Arrays Lab
  // ------------------------------------------------------
  currentArray: [1, 2, 3, 4, 5],

  runArrayOperation(action) {
    const valInput = document.getElementById('arr-val-input');
    const val = parseInt(valInput.value, 10);
    const out = document.getElementById('out-array');
    let message = "";

    switch (action) {
      case 'push':
        if (isNaN(val)) return alert("Please enter a valid number to push.");
        this.currentArray.push(val);
        message = `numbers.push(${val}) executed. Added to end.`;
        break;
      case 'pop':
        const popped = this.currentArray.pop();
        message = `numbers.pop() executed. Removed last element (${popped}).`;
        break;
      case 'shift':
        const shifted = this.currentArray.shift();
        message = `numbers.shift() executed. Removed first element (${shifted}).`;
        break;
      case 'unshift':
        if (isNaN(val)) return alert("Please enter a valid number to unshift.");
        this.currentArray.unshift(val);
        message = `numbers.unshift(${val}) executed. Added to beginning.`;
        break;
      case 'map':
        const mapped = this.currentArray.map(x => x * 2);
        message = `numbers.map(x => x * 2) => [${mapped.join(', ')}]`;
        break;
      case 'filter':
        const filtered = this.currentArray.filter(x => x % 2 === 0);
        message = `numbers.filter(x => x % 2 === 0) [Evens] => [${filtered.join(', ')}]`;
        break;
      case 'reduce':
        const sum = this.currentArray.reduce((acc, curr) => acc + curr, 0);
        message = `numbers.reduce((acc, curr) => acc + curr, 0) [Sum] => ${sum}`;
        break;
      case 'find':
        const found = this.currentArray.find(x => x > 3);
        message = `numbers.find(x => x > 3) => ${found}`;
        break;
      case 'slice':
        const sliced = this.currentArray.slice(1, 3);
        message = `numbers.slice(1, 3) => [${sliced.join(', ')}]`;
        break;
      case 'splice':
        // Remove 1 element at index 1 and insert 99
        this.currentArray.splice(1, 1, 99);
        message = `numbers.splice(1, 1, 99) executed. Replaced index 1 with 99.`;
        break;
      case 'join':
        message = `numbers.join(" - ") => "${this.currentArray.join(" - ")}"`;
        break;
      case 'reset':
        this.currentArray = [1, 2, 3, 4, 5];
        message = `Array reset to initial state: [1, 2, 3, 4, 5]`;
        break;
    }

    out.textContent = 
      `Current Array State: [${this.currentArray.join(', ')}]\n` +
      `Array Length:        ${this.currentArray.length}\n` +
      `Operation Result:    ${message}`;
  },

  // ------------------------------------------------------
  // 10. Functions & Closures
  // ------------------------------------------------------
  runFunctionDemo() {
    const a = parseFloat(document.getElementById('fn-a').value) || 10;
    const b = parseFloat(document.getElementById('fn-b').value) || 5;
    const fnType = document.getElementById('fn-type-select').value;
    const out = document.getElementById('out-function');

    let result;
    let snippet = "";

    if (fnType === 'declaration') {
      // Function declaration (hoisted)
      function addDeclaration(x, y) {
        return x + y;
      }
      result = addDeclaration(a, b);
      snippet = 
        `// 1. Function Declaration (hoisted to top of scope)\n` +
        `function addDeclaration(a, b) {\n` +
        `  return a + b;\n` +
        `}\n` +
        `addDeclaration(${a}, ${b}) => ${result}`;
    } else if (fnType === 'expression') {
      // Function expression (not hoisted)
      const addExpression = function(x, y) {
        return x + y;
      };
      result = addExpression(a, b);
      snippet = 
        `// 2. Function Expression (anonymous function assigned to variable)\n` +
        `const addExpression = function(a, b) {\n` +
        `  return a + b;\n` +
        `};\n` +
        `addExpression(${a}, ${b}) => ${result}`;
    } else if (fnType === 'arrow') {
      // Arrow function (concise ES6 syntax, lexical 'this')
      const addArrow = (x, y) => x + y;
      result = addArrow(a, b);
      snippet = 
        `// 3. Arrow Function (ES6 concise syntax)\n` +
        `const addArrow = (a, b) => a + b;\n` +
        `addArrow(${a}, ${b}) => ${result}`;
    }

    out.textContent = 
      `${snippet}\n\n` +
      `Parameters: 'a' and 'b' are named in function definition.\n` +
      `Arguments:  ${a} and ${b} are real values passed into call.`;
  },

  // Closure Counter Implementation
  counterClosureInstance: null,

  createCounter() {
    let count = 0; // lexical private variable preserved in closure

    return {
      increment: function() {
        count++;
        return count;
      },
      decrement: function() {
        count--;
        return count;
      },
      reset: function() {
        count = 0;
        return count;
      },
      getCount: function() {
        return count;
      }
    };
  },

  initClosureCounter() {
    this.counterClosureInstance = this.createCounter();
  },

  runClosureAction(action) {
    if (!this.counterClosureInstance) {
      this.initClosureCounter();
    }

    const out = document.getElementById('out-closure');
    let val;

    if (action === 'increment') {
      val = this.counterClosureInstance.increment();
    } else if (action === 'decrement') {
      val = this.counterClosureInstance.decrement();
    } else if (action === 'reset') {
      val = this.counterClosureInstance.reset();
    } else {
      val = this.counterClosureInstance.getCount();
    }

    out.textContent = 
      `Counter Value: ${val}\n\n` +
      `Why this works:\n` +
      `The inner methods form a CLOSURE over the outer 'count' variable.\n` +
      `Even after createCounter() has finished executing, 'count' remains\n` +
      `alive in memory and accessible only through the returned functions!`;
  },

  // ------------------------------------------------------
  // 11. Regular Expressions Lab
  // ------------------------------------------------------
  runRegexValidator() {
    const valType = document.getElementById('regex-preset').value;
    const testInput = document.getElementById('regex-input').value;
    const out = document.getElementById('out-regex');

    let pattern;
    let description;

    switch (valType) {
      case 'email':
        pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        description = "Standard Email (user@domain.ext)";
        break;
      case 'mobile':
        pattern = /^[6-9]\d{9}$/;
        description = "10-Digit Mobile (starts with 6, 7, 8, or 9)";
        break;
      case 'password':
        pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        description = "Strong Password (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special)";
        break;
      case 'username':
        pattern = /^[a-zA-Z0-9_]{3,16}$/;
        description = "Alphanumeric Username with underscores (3-16 chars)";
        break;
      default:
        pattern = /hello/i;
        description = "Case-insensitive 'hello'";
    }

    const isMatch = pattern.test(testInput);
    const execResult = pattern.exec(testInput);

    out.textContent = 
      `Target Validator: ${description}\n` +
      `Regular Expression: ${pattern.toString()}\n` +
      `Input Tested:       "${testInput}"\n` +
      `pattern.test():     ${isMatch ? "SUCCESS (Matched! ✅)" : "FAILED (No Match ❌)"}\n` +
      `pattern.exec():     ${execResult ? JSON.stringify(execResult[0]) : "null"}\n` +
      `String.match():     ${testInput.match(pattern) ? "Matched" : "null"}`;
  }
};

// Global assignment
window.ConceptsLab = ConceptsLab;
