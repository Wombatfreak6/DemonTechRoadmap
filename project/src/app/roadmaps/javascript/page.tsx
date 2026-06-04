"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type ThemeVars = CSSProperties & Record<`--${string}`, string>;
type Topic = {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
  explanation: string;
  subtopics: string[];
  keyPoints: string[];
  practice: string;
  resources: number;
};
type Lesson = {
  theory: string[];
  code: string;
  codeNotes: string[];
};

const navItems = ["Roadmaps", "Resources", "Guides", "Docs", "Community"];

const topics: Topic[] = [
  {
    id: "what-is-javascript",
    title: "What is JavaScript?",
    level: "Beginner",
    summary: "Understand the language, where it runs, and how to execute your first program.",
    explanation:
      "JavaScript is the language that makes web pages interactive. It runs in every browser and also powers servers, CLIs, desktop apps, mobile apps, and edge functions through runtimes like Node.js, Electron, React Native, Deno, and Cloudflare Workers.",
    subtopics: ["Browser runtime", "Node.js", "ECMAScript", "First program", "Script tags"],
    keyPoints: [
      "Created by Brendan Eich and standardized as ECMAScript.",
      "Dynamic typing means values carry types at runtime.",
      "Functions are first-class values, so they can be passed and returned.",
    ],
    practice: "Run console.log in the browser console, a Node.js file, and an HTML script tag.",
    resources: 5,
  },
  {
    id: "variables-data-types",
    title: "Variables & Data Types",
    level: "Beginner",
    summary: "Learn let, const, var, primitive values, type conversion, and type checks.",
    explanation:
      "Variables store values, while data types explain what kind of value you are working with. This section builds the foundation for predictable code by covering declarations, primitives, coercion, and safe type checks.",
    subtopics: ["let / const / var", "Primitive types", "Type conversion", "typeof", "Array.isArray"],
    keyPoints: [
      "Prefer const by default and use let when a binding must change.",
      "Primitive values include string, number, boolean, bigint, symbol, null, and undefined.",
      "Know the difference between explicit conversion and automatic coercion.",
    ],
    practice: "Build a small profile object and print each value with its detected type.",
    resources: 8,
  },
  {
    id: "operators",
    title: "Operators",
    level: "Beginner",
    summary: "Use arithmetic, comparison, logical, nullish, optional chaining, and spread operators.",
    explanation:
      "Operators are the compact symbols and keywords that combine, compare, transform, and safely access values. They are tiny, but they shape almost every JavaScript expression you write.",
    subtopics: ["Arithmetic", "Comparison", "Logical operators", "Nullish coalescing", "Optional chaining"],
    keyPoints: [
      "Use strict equality to avoid surprise coercion.",
      "Logical operators return values, not only booleans.",
      "Optional chaining helps safely read nested data from APIs.",
    ],
    practice: "Create validation logic for a signup form using comparison and logical operators.",
    resources: 6,
  },
  {
    id: "strings",
    title: "Strings",
    level: "Beginner",
    summary: "Create, combine, search, slice, and format text with modern string methods.",
    explanation:
      "Strings represent text. You will use them for UI labels, form inputs, API data, URLs, messages, and templates, so learning common methods early pays off everywhere.",
    subtopics: ["Quotes", "Template literals", "slice", "includes", "replace"],
    keyPoints: [
      "Template literals make interpolation and multiline strings cleaner.",
      "String methods return new strings because strings are immutable.",
      "Search and transform methods are essential for user input handling.",
    ],
    practice: "Write a username formatter that trims input, lowercases it, and checks invalid words.",
    resources: 5,
  },
  {
    id: "arrays",
    title: "Arrays",
    level: "Beginner",
    summary: "Store ordered lists and master mutating, non-mutating, and destructuring patterns.",
    explanation:
      "Arrays hold ordered collections. They are central to rendering lists, processing API results, filtering search data, and building transformations with methods like map, filter, reduce, find, and sort.",
    subtopics: ["Array creation", "push / pop", "map", "filter", "destructuring"],
    keyPoints: [
      "Some methods mutate the original array; others return a new value.",
      "map transforms, filter selects, reduce accumulates.",
      "Destructuring makes it easier to pull values from positions.",
    ],
    practice: "Build a todo list array and implement add, complete, remove, and filter operations.",
    resources: 9,
  },
  {
    id: "objects",
    title: "Objects",
    level: "Beginner",
    summary: "Model real-world entities with properties, methods, destructuring, and nested data.",
    explanation:
      "Objects are key-value structures used to represent almost everything in JavaScript: users, config, API responses, component props, errors, and more. They become much more powerful once you understand references and methods.",
    subtopics: ["Object literals", "Dot vs bracket access", "Object methods", "Nested data", "Destructuring"],
    keyPoints: [
      "Objects are reference values, so copying needs care.",
      "Methods are functions stored on objects.",
      "Destructuring and shorthand syntax keep object-heavy code readable.",
    ],
    practice: "Create a shopping cart object with methods for adding items and calculating totals.",
    resources: 7,
  },
  {
    id: "control-flow",
    title: "Control Flow",
    level: "Beginner",
    summary: "Control decisions and repetition with if, switch, loops, break, and continue.",
    explanation:
      "Control flow decides which code runs and how often it runs. Once you understand branches and loops, you can turn static values into real program behavior.",
    subtopics: ["if / else", "switch", "for", "while", "break / continue"],
    keyPoints: [
      "Use if statements for ranges and complex conditions.",
      "Use switch when one value maps to many discrete cases.",
      "Loops are useful, but array methods are often clearer for list transforms.",
    ],
    practice: "Build a quiz scorer that loops over answers and returns a grade message.",
    resources: 6,
  },
  {
    id: "functions-in-depth",
    title: "Functions In Depth",
    level: "Intermediate",
    summary: "Master declarations, expressions, parameters, closures, HOFs, IIFEs, and currying.",
    explanation:
      "Functions are JavaScript's core abstraction. They organize logic, create scope, preserve private state through closures, and let you compose behavior by passing functions into other functions.",
    subtopics: ["Declarations", "Expressions", "Rest / spread", "Closures", "Currying"],
    keyPoints: [
      "Closures let inner functions remember outer variables.",
      "Higher-order functions accept or return other functions.",
      "Rest parameters collect arguments; spread expands iterable values.",
    ],
    practice: "Write a reusable createCounter function and a curried discount calculator.",
    resources: 10,
  },
  {
    id: "scope-hoisting-this",
    title: "Scope, Hoisting & this",
    level: "Intermediate",
    summary: "Understand lexical scope, execution context, hoisting behavior, and this binding.",
    explanation:
      "This section explains why variables are visible in some places and not others, why some declarations appear to work before their line, and why this changes based on how a function is called.",
    subtopics: ["Global scope", "Function scope", "Block scope", "Hoisting", "this keyword"],
    keyPoints: [
      "let and const are block-scoped and have a temporal dead zone.",
      "Function declarations are hoisted differently from function expressions.",
      "Arrow functions do not create their own this binding.",
    ],
    practice: "Debug a small file with shadowed variables, hoisted declarations, and changed this values.",
    resources: 9,
  },
  {
    id: "classes-oop",
    title: "Classes & Object-Oriented Programming",
    level: "Intermediate",
    summary: "Learn class syntax, constructors, inheritance, prototypes, and method sharing.",
    explanation:
      "JavaScript classes are syntax over the prototype system. They help organize object creation, but understanding prototypes keeps the model clear when inheritance and method lookup get tricky.",
    subtopics: ["Class syntax", "Constructors", "Inheritance", "Prototype chain", "super"],
    keyPoints: [
      "Classes create objects whose methods live on the prototype.",
      "extends and super support inheritance between classes.",
      "Composition is often simpler than deep inheritance trees.",
    ],
    practice: "Build User and Admin classes, then compare them with a composition-based version.",
    resources: 8,
  },
  {
    id: "error-handling",
    title: "Error Handling",
    level: "Intermediate",
    summary: "Handle failures with try, catch, finally, custom errors, and common error types.",
    explanation:
      "Good error handling keeps apps understandable when something fails. You will learn how to catch expected failures, surface useful messages, clean up work, and create custom errors for your own domains.",
    subtopics: ["try / catch", "finally", "throw", "Custom errors", "Error types"],
    keyPoints: [
      "Catch errors at the level where you can actually respond.",
      "finally runs whether the operation succeeds or fails.",
      "Custom error classes make large codebases easier to reason about.",
    ],
    practice: "Wrap a JSON parser with clear error messages for invalid input.",
    resources: 5,
  },
  {
    id: "async-javascript",
    title: "Asynchronous JavaScript",
    level: "Intermediate",
    summary: "Learn the event loop, callbacks, promises, async / await, timers, and async flows.",
    explanation:
      "Asynchronous JavaScript lets code wait for network requests, timers, user events, and file operations without blocking the main thread. This is the heart of modern web applications.",
    subtopics: ["Event loop", "Callbacks", "Promises", "async / await", "setTimeout"],
    keyPoints: [
      "Promises represent work that may complete later.",
      "async / await makes promise chains easier to read.",
      "The event loop coordinates call stack, task queue, and microtasks.",
    ],
    practice: "Fetch data from a public API, render loading and error states, and retry on failure.",
    resources: 12,
  },
  {
    id: "es-modules",
    title: "ES Modules",
    level: "Intermediate",
    summary: "Split code into reusable files with import, export, default exports, and named exports.",
    explanation:
      "Modules keep applications maintainable by creating clear boundaries between files. They allow code reuse without putting everything in the global scope.",
    subtopics: ["Named exports", "Default exports", "Import syntax", "Module scope", "File boundaries"],
    keyPoints: [
      "Named exports are great when a file exposes multiple utilities.",
      "Default exports are common for one main value from a module.",
      "Modules are strict mode by default.",
    ],
    practice: "Split a calculator app into math, format, validation, and app modules.",
    resources: 5,
  },
  {
    id: "iterators-generators",
    title: "Iterators & Generators",
    level: "Advanced",
    summary: "Use the iterator protocol, generator functions, yield, and async generators.",
    explanation:
      "Iterators define how values are produced one at a time. Generators make custom iteration easier and are useful for streams, lazy sequences, workflows, and advanced async data handling.",
    subtopics: ["Iterator protocol", "Symbol.iterator", "yield", "Generator functions", "Async generators"],
    keyPoints: [
      "Iterable objects can be used with for...of and spread.",
      "Generators pause and resume execution.",
      "Async generators can produce values from asynchronous sources.",
    ],
    practice: "Create a generator that paginates API-like data one page at a time.",
    resources: 7,
  },
  {
    id: "proxy-reflect",
    title: "Proxy & Reflect",
    level: "Advanced",
    summary: "Intercept object operations and use Reflect for default behavior and metaprogramming.",
    explanation:
      "Proxy lets you customize how objects respond to property access, assignment, deletion, function calls, and more. Reflect provides standardized methods for the default versions of those operations.",
    subtopics: ["Proxy traps", "get", "set", "has", "Reflect"],
    keyPoints: [
      "Proxy is powerful for validation, logging, reactivity, and access control.",
      "Reflect helps forward operations from a trap cleanly.",
      "Use proxies carefully because they can make behavior less obvious.",
    ],
    practice: "Build a settings object that validates allowed keys and logs changes.",
    resources: 6,
  },
  {
    id: "symbols",
    title: "Symbols & Well-Known Symbols",
    level: "Advanced",
    summary: "Create unique keys and customize language behavior with well-known symbols.",
    explanation:
      "Symbols are unique primitive values often used as non-colliding object keys. Well-known symbols let objects hook into built-in language protocols such as iteration and string conversion.",
    subtopics: ["Symbol()", "Symbol.iterator", "Symbol.toStringTag", "Unique keys", "Protocols"],
    keyPoints: [
      "Every Symbol() call creates a distinct value.",
      "Well-known symbols connect objects to JavaScript internals.",
      "Symbols are useful when regular string keys could collide.",
    ],
    practice: "Make a custom collection object iterable with Symbol.iterator.",
    resources: 4,
  },
  {
    id: "advanced-patterns",
    title: "Advanced Patterns",
    level: "Advanced",
    summary: "Apply memoization, observer patterns, composition, WeakMap, and WeakRef patterns.",
    explanation:
      "Advanced patterns help you structure behavior, control memory, and keep complex systems flexible. The goal is not to memorize patterns, but to recognize when a shape solves a real problem.",
    subtopics: ["Memoization", "Observer", "EventEmitter", "Functional composition", "WeakMap"],
    keyPoints: [
      "Memoization caches expensive results when inputs repeat.",
      "Observer patterns decouple event producers from listeners.",
      "WeakMap can hold private data without preventing garbage collection.",
    ],
    practice: "Create a tiny EventEmitter and use it to notify UI modules when state changes.",
    resources: 9,
  },
  {
    id: "performance-memory",
    title: "Performance & Memory",
    level: "Advanced",
    summary: "Learn the memory model, garbage collection, optimization, debounce, and throttle.",
    explanation:
      "Performance work is about measuring first, then improving bottlenecks. This section covers memory behavior, avoiding accidental leaks, and controlling high-frequency events.",
    subtopics: ["Memory model", "Garbage collection", "Optimization tips", "Debounce", "Throttle"],
    keyPoints: [
      "Avoid premature optimization; use profiling to find real bottlenecks.",
      "Retained references can keep memory alive longer than expected.",
      "Debounce waits for activity to settle; throttle limits work to a rate.",
    ],
    practice: "Optimize a live search input with debounce and compare it to throttle behavior.",
    resources: 8,
  },
  {
    id: "modern-features",
    title: "Modern JavaScript Features",
    level: "Advanced",
    summary: "Use modern ES2020-ES2024 features for cleaner and safer application code.",
    explanation:
      "Modern JavaScript keeps adding syntax and APIs that reduce boilerplate and improve correctness. Learn the features that are broadly useful before chasing every new addition.",
    subtopics: ["Optional chaining", "Nullish coalescing", "BigInt", "Promise combinators", "Top-level await"],
    keyPoints: [
      "Modern features often make edge cases more explicit.",
      "Know browser and runtime support before relying on newer syntax.",
      "Readability matters more than using the newest feature everywhere.",
    ],
    practice: "Refactor older nested guards and promise chains into modern syntax.",
    resources: 10,
  },
  {
    id: "design-patterns",
    title: "JavaScript Design Patterns",
    level: "Advanced",
    summary: "Study module, factory, singleton, strategy, command, middleware, and mixin patterns.",
    explanation:
      "Design patterns are reusable ways to organize code. In JavaScript they appear in UI state, API clients, plugin systems, routing, validation, middleware chains, and application architecture.",
    subtopics: ["Module", "Factory", "Singleton", "Strategy", "Middleware"],
    keyPoints: [
      "Patterns are tools, not rules.",
      "Factory and strategy patterns are especially useful for replacing condition-heavy code.",
      "Middleware creates a clean pipeline for request or action processing.",
    ],
    practice: "Build a small validation library with strategy rules and a middleware pipeline.",
    resources: 11,
  },
];

const topicLessons: Record<string, Lesson> = {
  "what-is-javascript": {
    theory: [
      "JavaScript is a high-level programming language used to add behavior to web pages. HTML gives the page structure, CSS gives it style, and JavaScript handles logic: responding to clicks, validating forms, fetching API data, updating the DOM, and controlling application state.",
      "The same language also runs outside the browser. Node.js lets JavaScript run on servers and command-line tools, while runtimes such as Deno, Bun, Electron, and React Native use JavaScript for other environments. The core language is standardized as ECMAScript, and each runtime adds its own APIs.",
    ],
    code: `// Browser or Node.js
const language = "JavaScript";
const yearCreated = 1995;

console.log(language + " was created in " + yearCreated);

// In a browser, JavaScript can also talk to the page.
document.querySelector("h1")?.addEventListener("click", () => {
  console.log("The heading was clicked");
});`,
    codeNotes: [
      "console.log prints output so you can inspect values while learning.",
      "The document object exists in browsers, not in plain Node.js.",
      "The optional chaining operator prevents an error if the h1 does not exist.",
    ],
  },
  "variables-data-types": {
    theory: [
      "Variables are named bindings that point to values. Use const when the binding should not be reassigned, and let when the binding needs to change. var is older and function-scoped, so modern code usually avoids it unless maintaining legacy code.",
      "JavaScript is dynamically typed, which means variables do not have fixed types. Values have types at runtime. You can store a string in one variable, a number in another, and an object in another without declaring those types ahead of time.",
    ],
    code: `const username = "Rishi";
let points = 0;

points = points + 10;

const profile = {
  username,
  points,
  isActive: true,
  lastLogin: null,
};

console.log(typeof username); // "string"
console.log(typeof points);   // "number"
console.log(Array.isArray([])); // true`,
    codeNotes: [
      "const prevents rebinding the variable, but object properties can still change.",
      "typeof is useful for primitive checks, but arrays need Array.isArray.",
      "null represents an intentional empty value, while undefined usually means missing.",
    ],
  },
  operators: {
    theory: [
      "Operators let you build expressions. Arithmetic operators calculate values, comparison operators produce booleans, logical operators combine conditions, and newer operators like ?? and ?. help write safer code for missing data.",
      "Strict equality is important. == allows coercion, which can produce surprising results. === checks both value and type, so it is the default choice in professional JavaScript.",
    ],
    code: `const user = {
  name: "Asha",
  age: 19,
  address: null,
};

const canJoin = user.age >= 18 && user.name !== "";
const city = user.address?.city ?? "Unknown city";

console.log(canJoin); // true
console.log(city);    // "Unknown city"`,
    codeNotes: [
      ">= compares numbers and returns a boolean.",
      "&& requires both conditions to be true.",
      "?. safely reads nested properties; ?? provides a fallback only for null or undefined.",
    ],
  },
  strings: {
    theory: [
      "Strings are immutable sequences of characters. Any method that appears to change a string actually returns a new string. This makes string handling predictable once you remember to store the returned value.",
      "Template literals are especially useful because they allow interpolation with ${...} and support multiline strings. They make UI text and formatted messages easier to read.",
    ],
    code: `const rawName = "  DemonTech Roadmap  ";

const slug = rawName
  .trim()
  .toLowerCase()
  .replaceAll(" ", "-");

const message = \`Open the \${slug} page\`;

console.log(slug);    // "demontech-roadmap"
console.log(message); // "Open the demontech-roadmap page"`,
    codeNotes: [
      "trim removes whitespace at the start and end.",
      "toLowerCase returns a new lowercase string.",
      "replaceAll is useful for simple text transformations such as slugs.",
    ],
  },
  arrays: {
    theory: [
      "Arrays store ordered lists. You use them for todos, products, API rows, search results, menu items, comments, and almost every repeated UI element. Array methods are the main tool for transforming data before rendering it.",
      "Some array methods mutate the original array, such as push, pop, splice, sort, and reverse. Others return new arrays or values, such as map, filter, reduce, find, some, and every. In React-style code, non-mutating patterns are usually preferred.",
    ],
    code: `const tasks = [
  { id: 1, title: "Learn variables", done: true },
  { id: 2, title: "Practice arrays", done: false },
  { id: 3, title: "Build a quiz", done: false },
];

const pendingTitles = tasks
  .filter((task) => !task.done)
  .map((task) => task.title);

const completedCount = tasks.reduce((count, task) => {
  return task.done ? count + 1 : count;
}, 0);

console.log(pendingTitles);
console.log(completedCount);`,
    codeNotes: [
      "filter keeps only items matching a condition.",
      "map transforms each item into a new shape.",
      "reduce is useful when you need one final value from the whole array.",
    ],
  },
  objects: {
    theory: [
      "Objects model named data. They are perfect for representing users, settings, API responses, cart items, form state, and configuration. Property names are keys, and property values can be any JavaScript value.",
      "Objects are reference values. Assigning one object to another variable does not clone it; both variables point to the same object. For safer updates, create new objects with spread syntax when you need a changed copy.",
    ],
    code: `const cart = {
  owner: "Rishi",
  items: [
    { name: "Keyboard", price: 2500 },
    { name: "Mouse", price: 900 },
  ],
  total() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  },
};

const updatedCart = {
  ...cart,
  coupon: "JS10",
};

console.log(cart.total());
console.log(updatedCart.coupon);`,
    codeNotes: [
      "Methods are functions stored as object properties.",
      "this refers to the object when the method is called as cart.total().",
      "The spread operator creates a shallow copy with extra or replaced properties.",
    ],
  },
  "control-flow": {
    theory: [
      "Control flow decides what code should run. Conditions choose between branches, and loops repeat work. Without control flow, a program would simply run top-to-bottom with no decision-making.",
      "Use if/else when logic depends on ranges or complex conditions. Use switch when one value maps cleanly to multiple cases. Use loops for repetition, but prefer array methods when transforming lists.",
    ],
    code: `function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  return "Needs practice";
}

const scores = [92, 81, 58];

for (const score of scores) {
  console.log(score, getGrade(score));
}`,
    codeNotes: [
      "The first matching if branch returns and exits the function.",
      "for...of is clean when you only need each value from an array.",
      "Small pure functions make control flow easier to test.",
    ],
  },
  "functions-in-depth": {
    theory: [
      "Functions package reusable behavior. They can accept inputs as parameters, return outputs, and close over variables from their outer scope. Because functions are values, you can store them, pass them, and return them.",
      "Closures are one of the most important JavaScript concepts. A closure happens when an inner function remembers variables from the outer function even after the outer function has finished running.",
    ],
    code: `function createCounter(start = 0) {
  let count = start;

  return function increment() {
    count += 1;
    return count;
  };
}

const nextId = createCounter(100);

console.log(nextId()); // 101
console.log(nextId()); // 102`,
    codeNotes: [
      "createCounter returns another function.",
      "The returned function remembers count through closure.",
      "Each createCounter call gets its own private count variable.",
    ],
  },
  "scope-hoisting-this": {
    theory: [
      "Scope controls where variables can be accessed. Global scope is visible everywhere, function scope is visible inside a function, and block scope is visible inside blocks created by braces, such as if statements and loops.",
      "Hoisting describes how declarations are processed before code executes. Function declarations can be called before their line, but let and const are not usable before declaration. The this keyword depends on call site, while arrow functions inherit this from the surrounding scope.",
    ],
    code: `const team = {
  name: "DemonTech",
  members: ["Asha", "Rishi"],
  printMembers() {
    this.members.forEach((member) => {
      console.log(\`\${member} belongs to \${this.name}\`);
    });
  },
};

team.printMembers();`,
    codeNotes: [
      "printMembers uses this to access the team object.",
      "The arrow function inside forEach keeps the outer this value.",
      "Using a regular function inside forEach would create a different this behavior.",
    ],
  },
  "classes-oop": {
    theory: [
      "Classes provide a clean syntax for creating similar objects. A constructor sets up instance data, methods define shared behavior, and inheritance lets one class extend another. Under the hood, JavaScript still uses prototypes.",
      "Use classes when you have entities with state and behavior that belong together. For many UI and data transformations, plain objects and functions are still simpler.",
    ],
    code: `class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return \`Hello, \${this.name}\`;
  }
}

class Admin extends User {
  deletePost(postId) {
    return \`Deleted post \${postId}\`;
  }
}

const admin = new Admin("Rishi");
console.log(admin.greet());
console.log(admin.deletePost(42));`,
    codeNotes: [
      "extends connects Admin to User's prototype chain.",
      "Admin instances can use methods from both Admin and User.",
      "Methods are shared on the prototype instead of copied onto every object.",
    ],
  },
  "error-handling": {
    theory: [
      "Error handling keeps your application controlled when something fails. Instead of letting the app crash silently or show confusing output, you catch known failures and turn them into useful messages or recovery steps.",
      "Use try/catch around operations that may throw, such as JSON parsing, network calls, or custom validation. Use finally for cleanup that must happen whether the operation succeeds or fails.",
    ],
    code: `function parseSettings(jsonText) {
  try {
    const settings = JSON.parse(jsonText);

    if (!settings.theme) {
      throw new Error("Theme is required");
    }

    return settings;
  } catch (error) {
    return {
      theme: "dark",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

console.log(parseSettings('{"theme":"light"}'));
console.log(parseSettings("{bad json}"));`,
    codeNotes: [
      "JSON.parse throws when the string is invalid JSON.",
      "throw creates your own application-level error.",
      "The catch block returns a fallback object instead of crashing.",
    ],
  },
  "async-javascript": {
    theory: [
      "Asynchronous JavaScript handles work that finishes later: API calls, timers, file reads, animations, and user events. The browser keeps the UI responsive by scheduling this work instead of blocking the main thread.",
      "Promises represent future results. async/await is syntax that makes promise-based code read like normal step-by-step code, while still staying asynchronous underneath.",
    ],
    code: `async function loadUser(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);

    if (!response.ok) {
      throw new Error("Could not load user");
    }

    const user = await response.json();
    return user.name;
  } catch (error) {
    console.error(error);
    return "Guest";
  }
}

loadUser(7).then((name) => console.log(name));`,
    codeNotes: [
      "await pauses inside the async function until the promise settles.",
      "response.ok checks for HTTP success statuses.",
      "The function still returns a promise, so callers can await it or use then.",
    ],
  },
  "es-modules": {
    theory: [
      "Modules let you split code into files with clear imports and exports. This prevents everything from living in the global scope and makes code easier to reuse, test, and reason about.",
      "Named exports are good when a file exposes multiple utilities. Default exports are common when the file has one main thing. Modules run in strict mode automatically.",
    ],
    code: `// math.js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// app.js
import { add, multiply } from "./math.js";

console.log(add(2, 3));
console.log(multiply(4, 5));`,
    codeNotes: [
      "export makes values available to other files.",
      "import pulls only the utilities this file needs.",
      "This structure scales better than one giant script file.",
    ],
  },
  "iterators-generators": {
    theory: [
      "Iteration is the protocol behind for...of, spread, and many built-in collection behaviors. An iterable object exposes Symbol.iterator, which returns an iterator with a next method.",
      "Generators make iterators easier to write. A generator function can pause at yield and resume later, producing values lazily only when requested.",
    ],
    code: `function* pageNumbers(totalPages) {
  for (let page = 1; page <= totalPages; page += 1) {
    yield page;
  }
}

for (const page of pageNumbers(3)) {
  console.log(\`Load page \${page}\`);
}`,
    codeNotes: [
      "function* creates a generator function.",
      "yield produces a value and pauses execution.",
      "for...of keeps asking the generator for the next value.",
    ],
  },
  "proxy-reflect": {
    theory: [
      "Proxy lets you intercept operations on an object. You can control reads, writes, deletes, function calls, and more. This is useful for validation, logging, access control, and reactive systems.",
      "Reflect provides methods that match normal object operations. Inside a proxy trap, Reflect helps you forward the original behavior after adding custom logic.",
    ],
    code: `const settings = {
  theme: "dark",
};

const allowedKeys = ["theme", "fontSize"];

const safeSettings = new Proxy(settings, {
  set(target, key, value) {
    if (!allowedKeys.includes(key)) {
      throw new Error(\`Unknown setting: \${String(key)}\`);
    }

    return Reflect.set(target, key, value);
  },
});

safeSettings.fontSize = 16;
console.log(safeSettings);`,
    codeNotes: [
      "The set trap runs whenever a property is assigned.",
      "Reflect.set performs the normal assignment after validation.",
      "Proxy can make objects safer, but it should be used carefully.",
    ],
  },
  symbols: {
    theory: [
      "Symbols are unique primitive values. Even two symbols with the same description are different. This makes them useful as object keys that should not collide with normal string keys.",
      "Well-known symbols customize built-in language behavior. For example, Symbol.iterator tells JavaScript how an object should behave in for...of loops and spread syntax.",
    ],
    code: `const collection = {
  items: ["JS", "DOM", "Async"],
  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => ({
        value: this.items[index],
        done: index++ >= this.items.length,
      }),
    };
  },
};

console.log([...collection]);`,
    codeNotes: [
      "Symbol.iterator defines the object's iteration behavior.",
      "The next method returns value and done.",
      "Spread syntax works because the object is now iterable.",
    ],
  },
  "advanced-patterns": {
    theory: [
      "Advanced patterns are reusable shapes for solving recurring design problems. They help when code grows beyond simple functions and data transformations.",
      "The observer pattern is common in event systems. One part of the app publishes an event, and many other parts can subscribe without being directly coupled to the publisher.",
    ],
    code: `function createEmitter() {
  const listeners = new Map();

  return {
    on(event, callback) {
      const callbacks = listeners.get(event) ?? [];
      listeners.set(event, [...callbacks, callback]);
    },
    emit(event, data) {
      const callbacks = listeners.get(event) ?? [];
      callbacks.forEach((callback) => callback(data));
    },
  };
}

const emitter = createEmitter();
emitter.on("login", (user) => console.log(\`\${user} logged in\`));
emitter.emit("login", "Rishi");`,
    codeNotes: [
      "The emitter stores callbacks by event name.",
      "on registers a listener without knowing who will emit.",
      "emit notifies every listener for that event.",
    ],
  },
  "performance-memory": {
    theory: [
      "Performance work starts with measurement. You should first identify the slow operation, then optimize the right place. Common issues include unnecessary loops, too many DOM updates, repeated expensive calculations, and memory leaks from retained references.",
      "Debounce and throttle are practical tools for high-frequency events such as typing, scrolling, and resizing. Debounce waits until activity stops; throttle limits how often work runs.",
    ],
    code: `function debounce(callback, delay = 300) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}

const search = debounce((query) => {
  console.log("Searching for", query);
}, 400);

search("j");
search("ja");
search("javascript");`,
    codeNotes: [
      "clearTimeout cancels the previous scheduled call.",
      "Only the final search runs after the user stops typing.",
      "This prevents unnecessary API calls during fast input.",
    ],
  },
  "modern-features": {
    theory: [
      "Modern JavaScript features reduce boilerplate and make edge cases clearer. Optional chaining, nullish coalescing, BigInt, Promise combinators, and top-level await are examples of features that solve real everyday problems.",
      "The goal is not to use new syntax everywhere. The goal is to write code that is easier to understand and safer around missing data, async workflows, and large numbers.",
    ],
    code: `const response = {
  user: {
    profile: {
      displayName: "",
    },
  },
};

const displayName =
  response.user?.profile?.displayName ?? "Anonymous";

const results = await Promise.allSettled([
  Promise.resolve("Loaded posts"),
  Promise.reject(new Error("Comments failed")),
]);

console.log(displayName);
console.log(results);`,
    codeNotes: [
      "?. safely reads nested values.",
      "?? only falls back for null or undefined, not an empty string.",
      "Promise.allSettled reports every result instead of failing fast.",
    ],
  },
  "design-patterns": {
    theory: [
      "Design patterns are named approaches for organizing code. In JavaScript, patterns often appear in modules, factories, state containers, middleware, API clients, and UI event systems.",
      "A strategy pattern is useful when you have multiple interchangeable algorithms. Instead of writing a large if/else chain, you store each behavior as a function and select the right one by key.",
    ],
    code: `const shippingStrategies = {
  standard: (total) => total + 50,
  express: (total) => total + 120,
  pickup: (total) => total,
};

function calculateCheckout(total, shippingType) {
  const strategy = shippingStrategies[shippingType];

  if (!strategy) {
    throw new Error("Unknown shipping type");
  }

  return strategy(total);
}

console.log(calculateCheckout(1000, "express"));`,
    codeNotes: [
      "Each strategy is a small function with the same input/output shape.",
      "calculateCheckout does not need a long switch statement.",
      "Adding a new strategy means adding a new function to the map.",
    ],
  },
};

const icons: Record<string, ReactNode> = {
  home: <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-8.5Z" />,
  search: <path d="m21 21-4.3-4.3M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  moon: <path d="M21 14.5A7.5 7.5 0 0 1 9.5 3a8.7 8.7 0 1 0 11.5 11.5Z" />,
  sun: <path d="M12 4V2m0 20v-2m8-8h2M2 12h2m14.36-6.36 1.42-1.42M4.22 19.78l1.42-1.42m0-12.72L4.22 4.22m15.56 15.56-1.42-1.42M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" />,
  book: <path d="M5 4h7a3 3 0 0 1 3 3v14a3 3 0 0 0-3-3H5V4Zm10 0h4v14h-4" />,
  clock: <path d="M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  levels: <path d="M5 19V9m7 10V5m7 14v-7" />,
  discord: <path d="M8 16c1.5 1 6.5 1 8 0m-9-3h.01M17 13h.01M7 8c3-1.5 7-1.5 10 0l1 7c-1.5 1-3 1.5-4.5 1.8L12 15l-1.5 1.8C9 16.5 7.5 16 6 15l1-7Z" />,
  check: <path d="m5 12 4 4L19 6" />,
  target: <path d="M21 12a9 9 0 1 1-9-9m6 3 3-3m0 0v5m0-5h-5M15 9l-3 3m3 0a3 3 0 1 1-3-3" />,
  spark: <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" />,
};

const darkTheme: ThemeVars = {
  "--page-bg": "#030303",
  "--header-bg": "rgba(3, 3, 3, 0.92)",
  "--panel-bg": "rgba(8, 9, 10, 0.8)",
  "--panel-strong": "rgba(13, 14, 15, 0.94)",
  "--field-bg": "rgba(8, 8, 9, 0.88)",
  "--border": "rgba(250, 204, 21, 0.16)",
  "--text-primary": "#f8fafc",
  "--text-secondary": "#c7c9d1",
  "--text-muted": "#8c909b",
  "--shadow": "rgba(0, 0, 0, 0.34)",
};

const lightTheme: ThemeVars = {
  "--page-bg": "#fafafa",
  "--header-bg": "rgba(255, 255, 255, 0.92)",
  "--panel-bg": "rgba(255, 255, 255, 0.9)",
  "--panel-strong": "rgba(250, 250, 250, 0.96)",
  "--field-bg": "rgba(255, 255, 255, 0.94)",
  "--border": "rgba(161, 98, 7, 0.22)",
  "--text-primary": "#171717",
  "--text-secondary": "#3f3f46",
  "--text-muted": "#71717a",
  "--shadow": "rgba(24, 24, 27, 0.08)",
};

function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {icons[name]}
    </svg>
  );
}

function DemonTechLogo() {
  return (
    <Link className="flex min-w-fit items-center gap-3" href="/">
      <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-black shadow-[0_0_32px_rgba(220,38,38,0.24)]">
        <Image
          alt="DemonTech logo"
          className="h-full w-full object-cover"
          height={56}
          src="/demontech-logo.png"
          width={56}
        />
      </div>
      <div>
        <p className="text-2xl font-black leading-6 tracking-normal text-[var(--text-primary)]">
          Demon<span className="text-red-500">Tech</span>
        </p>
        <p className="mt-1 text-[10px] font-black uppercase tracking-[0.32em] text-[var(--text-muted)]">
          Roadmap
        </p>
      </div>
    </Link>
  );
}

export default function JavaScriptRoadmap() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTopicId, setActiveTopicId] = useState(topics[0].id);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const activeTopic = topics.find((topic) => topic.id === activeTopicId) ?? topics[0];
  const activeTopicLesson = topicLessons[activeTopic.id];

  const levelCounts = useMemo(
    () =>
      topics.reduce<Record<Topic["level"], number>>(
        (counts, topic) => ({ ...counts, [topic.level]: counts[topic.level] + 1 }),
        { Beginner: 0, Intermediate: 0, Advanced: 0 },
      ),
    [],
  );

  return (
    <main
      className="min-h-screen overflow-hidden bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300"
      style={theme}
    >
      <div
        className={`fixed inset-0 -z-10 transition-colors duration-300 ${
          isDarkMode
            ? "bg-[radial-gradient(circle_at_78%_15%,rgba(250,204,21,0.13),transparent_24%),radial-gradient(circle_at_19%_78%,rgba(220,38,38,0.12),transparent_26%),linear-gradient(180deg,#020202_0%,#050505_100%)]"
            : "bg-[radial-gradient(circle_at_78%_14%,rgba(250,204,21,0.19),transparent_27%),radial-gradient(circle_at_16%_80%,rgba(248,113,113,0.12),transparent_25%),linear-gradient(180deg,#ffffff_0%,#fafafa_100%)]"
        }`}
      />

      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-xl">
        <div className="mx-auto flex h-[82px] max-w-[1540px] items-center gap-8 px-5 lg:px-8">
          <DemonTechLogo />

          <nav className="ml-auto hidden items-center gap-10 text-sm font-bold text-[var(--text-secondary)] lg:flex">
            {navItems.map((item) => (
              <a
                className={`transition hover:text-yellow-400 ${item === "Roadmaps" ? "text-yellow-400" : ""}`}
                href={item === "Roadmaps" ? "/docs/all-roadmaps" : "#"}
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>

          <label className="hidden h-11 w-[280px] items-center gap-3 rounded-md border border-[var(--border)] bg-[var(--field-bg)] px-4 text-sm text-[var(--text-muted)] xl:flex">
            <Icon className="h-5 w-5" name="search" />
            <span className="flex-1">Search anything...</span>
            <kbd className="rounded border border-[var(--border)] bg-[var(--panel-strong)] px-2 py-0.5 text-xs">
              K
            </kbd>
          </label>

          <button
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
            className="grid h-11 w-11 place-items-center rounded-md border border-[var(--border)] bg-[var(--panel-strong)] text-[var(--text-primary)] transition hover:border-yellow-400"
            onClick={() => setIsDarkMode((value) => !value)}
            title={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
            type="button"
          >
            <Icon className="h-5 w-5" name={isDarkMode ? "sun" : "moon"} />
          </button>

          <a
            className="hidden h-11 items-center gap-2 rounded-md border border-yellow-500/50 bg-yellow-400 px-5 text-sm font-black text-black shadow-[0_0_28px_rgba(250,204,21,0.2)] transition hover:bg-yellow-300 md:inline-flex"
            href="https://discord.gg/yWtjK2Tb8T"
            rel="noreferrer"
            target="_blank"
          >
            <Icon className="h-5 w-5" name="discord" />
            Join Discord
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1540px] grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden min-h-[calc(100vh-82px)] border-r border-[var(--border)] px-5 py-5 lg:block">
          <div className="sticky top-[102px] rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-400">Get Started</p>
            <nav className="mt-5 space-y-1 text-sm text-[var(--text-secondary)]">
              {["Introduction", "Quick Start", "How Roadmaps Work", "Learning Paths"].map((item) => (
                <a
                  className="flex h-10 items-center gap-3 rounded-md px-3 transition hover:bg-[var(--panel-strong)] hover:text-yellow-400"
                  href={item === "Quick Start" ? "/docs/quick-start" : "#"}
                  key={item}
                >
                  <Icon className="h-4 w-4" name={item === "Introduction" ? "home" : "chevron"} />
                  {item}
                </a>
              ))}
            </nav>

            <p className="mt-8 text-xs font-black uppercase tracking-[0.18em] text-yellow-400">Roadmap</p>
            <nav className="mt-5 space-y-1">
              {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => (
                <button
                  className="flex h-10 w-full items-center justify-between rounded-md px-3 text-left text-sm text-[var(--text-secondary)] transition hover:bg-[var(--panel-strong)] hover:text-yellow-400"
                  key={level}
                  onClick={() => setActiveTopicId(topics.find((topic) => topic.level === level)?.id ?? topics[0].id)}
                  type="button"
                >
                  <span>{level}</span>
                  <span className="rounded border border-[var(--border)] px-2 py-0.5 text-xs">{levelCounts[level]}</span>
                </button>
              ))}
            </nav>

            <div className="mt-9 rounded-lg border border-yellow-500/25 bg-black/20 p-4">
              <div className="grid h-20 w-full place-items-center rounded-md border border-red-500/25 bg-black/40 text-4xl font-black text-red-500">
                JS
              </div>
              <p className="mt-4 text-sm font-black text-[var(--text-primary)]">Level up your JavaScript.</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">Follow the document-backed path from fundamentals to modern patterns.</p>
            </div>
          </div>
        </aside>

        <section className="px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1240px]">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
              <Icon className="h-4 w-4 text-yellow-400" name="home" />
              <Link className="hover:text-yellow-400" href="/docs/all-roadmaps">
                Roadmaps
              </Link>
              <Icon className="h-3 w-3" name="chevron" />
              <span className="font-semibold text-[var(--text-primary)]">JavaScript Roadmap</span>
            </div>

            <section className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-yellow-400/40 bg-yellow-400 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-black">
                  <Icon className="h-4 w-4" name="spark" />
                  ECMAScript 2024
                </div>
                <h1 className="mt-5 max-w-3xl text-5xl font-black leading-tight tracking-normal sm:text-6xl">
                  JavaScript <span className="text-yellow-400">Roadmap</span>
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                  A clickable beginner-to-advanced path based on your JavaScript document. Pick any topic to reveal its explanation, key concepts, practice task, and resource count.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    ["Level", "Beginner to Advanced", "levels"],
                    ["Time", "8-14 Months", "clock"],
                    ["Topics", `${topics.length} Core Topics`, "book"],
                  ].map(([label, value, icon]) => (
                    <div className="rounded-md border border-[var(--border)] bg-[var(--panel-bg)] p-4" key={label}>
                      <Icon className="h-5 w-5 text-yellow-400" name={icon} />
                      <p className="mt-3 text-xs text-[var(--text-muted)]">{label}</p>
                      <p className="mt-1 text-sm font-black text-[var(--text-primary)]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-yellow-400/25 bg-black shadow-[0_0_80px_rgba(250,204,21,0.12)]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(250,204,21,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.12)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-yellow-400/40 bg-black/80 shadow-[0_0_60px_rgba(250,204,21,0.24)]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl font-black text-yellow-400 drop-shadow-[0_0_28px_rgba(250,204,21,0.65)]">
                  JS
                </div>
              </div>
            </section>

            <section className="mt-9 grid gap-7 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="relative">
                <div className="absolute bottom-8 left-6 top-8 hidden w-px bg-yellow-400/45 sm:block" />
                <div className="space-y-4">
                  {topics.map((topic, index) => {
                    const isActive = topic.id === activeTopic.id;

                    return (
                      <article
                        className={`relative rounded-lg border bg-[var(--panel-bg)] shadow-2xl shadow-[var(--shadow)] transition ${
                          isActive ? "border-yellow-400/55" : "border-[var(--border)] hover:border-yellow-400/35"
                        }`}
                        key={topic.id}
                      >
                        <button
                          aria-expanded={isActive}
                          className="grid w-full gap-5 p-5 text-left sm:grid-cols-[56px_minmax(0,1fr)_auto]"
                          onClick={() => setActiveTopicId(topic.id)}
                          type="button"
                        >
                          <span className={`z-10 grid h-12 w-12 place-items-center rounded-full border text-lg font-black ${
                            isActive
                              ? "border-yellow-300 bg-yellow-400 text-black"
                              : "border-yellow-400 bg-black text-white"
                          }`}>
                            {index + 1}
                          </span>
                          <span>
                            <span className="flex flex-wrap items-center gap-3">
                              <span className="text-xl font-black text-[var(--text-primary)]">{topic.title}</span>
                              <span className="rounded border border-[var(--border)] px-2 py-1 text-xs font-bold text-yellow-400">
                                {topic.level}
                              </span>
                            </span>
                            <span className="mt-2 block text-sm leading-6 text-[var(--text-secondary)]">{topic.summary}</span>
                            <span className="mt-4 flex flex-wrap gap-2">
                              {topic.subtopics.slice(0, 5).map((subtopic) => (
                                <span
                                  className="rounded border border-[var(--border)] bg-[var(--field-bg)] px-2.5 py-1 text-xs text-[var(--text-secondary)]"
                                  key={subtopic}
                                >
                                  {subtopic}
                                </span>
                              ))}
                            </span>
                          </span>
                          <span className="hidden items-center gap-2 text-xs font-bold text-[var(--text-muted)] sm:flex">
                            <Icon className="h-4 w-4 text-yellow-400" name="book" />
                            {topic.resources} Resources
                            <Icon className={`h-4 w-4 transition ${isActive ? "rotate-90 text-yellow-400" : ""}`} name="chevron" />
                          </span>
                        </button>

                        {isActive ? (
                          <div className="border-t border-[var(--border)] px-5 pb-5 sm:ml-[76px]">
                            <div className="mt-5 rounded-md border border-[var(--border)] bg-[var(--panel-strong)] p-5">
                              <h3 className="text-sm font-black uppercase tracking-[0.14em] text-yellow-400">Theory Explanation</h3>
                              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{topic.explanation}</p>
                              <div className="mt-4 space-y-4">
                                {topicLessons[topic.id].theory.map((paragraph) => (
                                  <p className="text-sm leading-7 text-[var(--text-secondary)]" key={paragraph}>
                                    {paragraph}
                                  </p>
                                ))}
                              </div>
                            </div>

                            <div className="mt-5 overflow-hidden rounded-md border border-yellow-400/25 bg-black">
                              <div className="flex items-center justify-between border-b border-yellow-400/20 bg-yellow-400/10 px-4 py-3">
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-yellow-400">Code Example</h3>
                                <span className="rounded border border-yellow-400/25 px-2 py-1 text-xs font-bold text-yellow-300">JavaScript</span>
                              </div>
                              <pre className="max-h-[420px] overflow-auto p-4 text-sm leading-7 text-slate-100">
                                <code>{topicLessons[topic.id].code}</code>
                              </pre>
                            </div>

                            <div className="mt-5 grid gap-5 lg:grid-cols-2">
                              <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-yellow-400">Key Points</h3>
                                <ul className="mt-3 space-y-3">
                                  {topic.keyPoints.map((point) => (
                                    <li className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]" key={point}>
                                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" name="check" />
                                      {point}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.14em] text-yellow-400">Code Notes</h3>
                                <ul className="mt-3 space-y-3">
                                  {topicLessons[topic.id].codeNotes.map((note) => (
                                    <li className="flex gap-3 text-sm leading-6 text-[var(--text-secondary)]" key={note}>
                                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" name="check" />
                                      {note}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr]">
                              <div className="rounded-md border border-[var(--border)] bg-[var(--panel-strong)] p-4">
                                <h3 className="flex items-center gap-2 text-sm font-black text-[var(--text-primary)]">
                                  <Icon className="h-4 w-4 text-yellow-400" name="target" />
                                  Practice Task
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{topic.practice}</p>
                              </div>
                              <div className="rounded-md border border-[var(--border)] bg-[var(--panel-strong)] p-4">
                                <h3 className="flex items-center gap-2 text-sm font-black text-[var(--text-primary)]">
                                  <Icon className="h-4 w-4 text-yellow-400" name="book" />
                                  How To Study This
                                </h3>
                                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                                  First read the theory, then type the code by hand, change one value, and predict the output before running it. That small loop turns the topic from memorized text into working knowledge.
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              </div>

              <aside className="space-y-5 xl:sticky xl:top-[104px] xl:self-start">
                <section className="rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">Selected Topic</h2>
                  <p className="mt-3 text-2xl font-black text-yellow-400">{activeTopic.title}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{activeTopic.summary}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    {activeTopicLesson.theory[0]}
                  </p>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-black/20">
                    <div
                      className="h-full rounded-full bg-yellow-400 shadow-[0_0_18px_rgba(250,204,21,0.55)]"
                      style={{ width: `${((topics.findIndex((topic) => topic.id === activeTopic.id) + 1) / topics.length) * 100}%` }}
                    />
                  </div>
                </section>

                <section className="rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">What You Will Learn</h2>
                  <div className="mt-5 space-y-4">
                    {[
                      ["Core JavaScript", "Language fundamentals"],
                      ["DOM & Events", "Interactive web pages"],
                      ["Async Programming", "Real-world network flows"],
                      ["Modern JavaScript", "ES2020-ES2024 features"],
                      ["Patterns", "Maintainable architecture"],
                    ].map(([title, detail]) => (
                      <div className="flex gap-3" key={title}>
                        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" name="check" />
                        <div>
                          <p className="text-sm font-bold text-[var(--text-primary)]">{title}</p>
                          <p className="text-xs leading-5 text-[var(--text-muted)]">{detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-lg border border-[var(--border)] bg-[var(--panel-bg)] p-5 shadow-2xl shadow-[var(--shadow)]">
                  <h2 className="text-lg font-black text-[var(--text-primary)]">Helpful Resources</h2>
                  <div className="mt-5 space-y-3 text-sm">
                    {[
                      ["MDN Web Docs", "https://developer.mozilla.org/en-US/docs/Web/JavaScript"],
                      ["JavaScript.info", "https://javascript.info/"],
                      ["Eloquent JavaScript", "https://eloquentjavascript.net/"],
                      ["FreeCodeCamp", "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/"],
                    ].map(([name, href]) => (
                      <a
                        className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--field-bg)] px-3 py-2 font-bold text-[var(--text-secondary)] transition hover:border-yellow-400/45 hover:text-yellow-400"
                        href={href}
                        key={name}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {name}
                        <Icon className="h-4 w-4" name="chevron" />
                      </a>
                    ))}
                  </div>
                </section>
              </aside>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
