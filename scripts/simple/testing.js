// module "testing.js"

/*
 * A bare-bones test runner system.
 *
 * By default, this system does not list successful tests, but reports
 * failure/error/total rates at the bottom, and shows failing/erroneous
 * tests.  call runTest(true) to force the listing of successful tests.
 *
 * The default behavior logs to chrome's console.log(), but assigning a
 * new log() method can alter this behavior.
 *
 * This module installs the test running infrastructure into the global
 * name-space. see ../easy/testing.js for a more object-oriented and
 * encapsulated approach.
 *
 * Usage:
 *
 *   test("testName", function() {
 *     // test content
 *     // assertEquals(foo, "bar");
 *   });
 *   runTests();
 */

var __testFunctions = [];

function test(name, body) {
  __testFunctions.push({
    name: name,     // The name of this test
    body: body      // The code to execute during the test
  });
}

/*
 * Setup a logging function so that the test runner can report failures and
 * test runs.  Only do so if log is not already defined.
 *
 * The log() function should take a string message and push it to some
 * output.
 */
 var log = (typeof log !== 'undefined')? log :setupLog();

/*
 * runTests executes any registered tests, logs results to the console,
 * and clears the registered tests.
 *
 * param: showSuccesses - if true, list out successful tests also.
 */
function runTests(showSuccesses) {
  registerTests(this);

  // Take the function list and store it locally, resetting the main one.
  var testFunctions = __testFunctions;
  __testFunctions = [];

  showSuccesses = showSuccesses && true; // don't show successes by default.

  var results = [];
  while (testFunctions.length > 0) {
    var testFunction = testFunctions.shift();
    try {
      testFunction.body.apply();
      results.push({status: "SUCCESS", name: testFunction.name});
    } catch(error) {
      if (error.name && error.name == "TestFailure") {
        results.push(
            {status: "FAILED", name: testFunction.name, message: error.message});
      } else {
        results.push(
            {status: "ERROR", name: testFunction.name, message: error.message});
      }
    }
  }
  var count = 0;
  var failures = 0;
  var errors = 0;
  while (results.length > 0) {
    count++
    var result = results.shift();
    if (result.status != "SUCCESS" || showSuccesses) {
      if (result.status == "FAILED") {
        failures++;
      } else if (result.status == "ERROR") {
        errors++;
      }
      if (result.status == "SUCCESS") {
        log(result.status + " (" + result.name + ")");
      } else {
        log(result.status + " (" + result.name + "): " + result.message);
      }
    }


    // todo: fix stack
    if (result.stack) {
      log(result.stack);
    }
  }
  log("Tests: " + count
      + " Successes: " + (count - failures - errors)
      + " Failures: " + failures
      + " Errors: " + errors);
}

/*
 * An ease-of-use extension to simple/testing.js which looks for any globally
 * scoped test functions and registers them.  Functions will be registered if
 * they start with the word test, and have no arguments listed.  e.g.:
 *     function testFoo() { blah; blah; }
 */
function registerTests(scope) {
  for (var property in scope) {
    if (property.startsWith("test") && property != "test") {
      var func = scope[property];
      if (typeof(func) == "function") {
        var description = func.name
            .replace(/[_]?([A-Z])/g, ' $1')
            .substring(5) // strip "test "
            .toLowerCase()
        test(description, func);
      }
    }
  }
}

/*
 * Create a log(message) function depending on the environment.
 */
function setupLog() {
  if (typeof console !== 'undefined' && typeof console.log !== 'undefined') {
    return function(message) { console.log(message); }
  } else if (typeof window !== 'undefined') { // any other browser
    return function(message) { alert(message); }
  } else {
    throw Error("Cannot recognize any environment in which we can log output.")
  }
}
