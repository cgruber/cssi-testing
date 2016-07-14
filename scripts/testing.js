// module "testing.js"

/*
 * A test suite runner
 *
 * By default, this system does not list successful tests, but reports
 * failure/error/total rates at the bottom, and shows failing/erroneous
 * tests.  call suite.run(true) to force the listing of successful tests.
 *
 * The default behavior logs to chrome's console.log(), but assigning a
 * new log() method can alter this behavior.
 *
 * This module installs the test running infrastructure into the global
 * name-space. see ../easy/testing.js for a more object-oriented and
 * encapsulated approach.
 *
 * Usage:
 *   var suite = new TestSuite("Tests for Foo");
 *   suite.define("testName", function() {
 *     // test content
 *     // assertEquals(foo, "bar");
 *   });
 *   suite.run();
 */

function TestSuite(name) {};

TestSuite.prototype.testFunctions = [];

TestSuite.prototype.test = function(name, body) {
    this.testFunctions.push({
      name: name,
      body: body
    });
  }

TestSuite.prototype.log = function(message) {
  console.log(message);
}

/*
TestSuite.prototype.registerLogElement = function(element) {
  if (!element) {
    throw new Error("No valid element given to register as a console.");
  }
  var table = document.createElement("table");
  TestSuite.prototype._log = table;
  this._log.innerHtml = table;
  TestSuite.prototype.log = function(message) {
    var row = document.createElement("tr");
    var col = document.createElement("td");
    col.innerText(message);
    row.append(col);
    _log.append(row);
  }
}
*/

/*
 * run() executes any registered tests, logs results to the console,
 * and clears the registered tests.
 *
 * param: showSuccesses - if true, list out successful tests also.
 */
TestSuite.prototype.run = function(showSuccesses) {
  showSuccesses = showSuccesses && true;
  var results = [];
  while (this.testFunctions.length > 0) {
    var testFunction = this.testFunctions.shift();
    try {
      testFunction.body.apply();
      results.push({status: "SUCCESS", name: testFunction.name});
    } catch(error) {
	  if (error.name == "TestFailure") {
        results.push({status: "FAILED", name: testFunction.name, message: error});
      } else {
        results.push({status: "ERROR", name: testFunction.name, message: error});
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
        this.log(result.status + " (" + result.name + ")");
      } else {
        this.log(result.status + " (" + result.name + "): " + result.message);
      }
    }
    // todo: fix stack
    if (result.stack) {
      this.log(result.stack);
    }
  }
  this.log("Tests: " + count + " Failed: " + failures + " Errors: " + errors);
}
