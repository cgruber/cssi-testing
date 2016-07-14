// module "simple_assert.js"

/*
 * A set of assertion methods which will throw a TestFailure error if their
 * conditions aren't met, optionally with a custom message. See each method
 * for details on usage.
 */

/* An assertion failure error */
function TestFailure(message) {
  this.name = "TestFailure";
  this.message = (message || "");
}
TestFailure.prototype = Error.prototype;

/*
 * An assertions utility object
 */
function Assertions() {}

Assertion.prototype.equal = function(actual, expected, message) {
  if (!(actual == expected)) {
    failTest("Expected: " + expected + " but was: " + actual, message);
  }
}

Assertion.prototype.notEqual = function(actual, expected, message) {
  if ((actual == expected)) {
    failTest("Expected something other than " + expected, message);
  }
}

Assertion.prototype.true = function(condition, message) {
  if (!condition) {
    failTest("Condition was unexpectedly false", message);
  }
}

Assertion.prototype.false = function(condition, message) {
  if (condition) {
    failTest("Condition was unexpectedly true", message);
  }
}

Assertion.prototype.fail = function(message) {
  if (prefix) {
    throw new TestFailure(prefix + ": " + message);
  } else {
    throw new TestFailure(message);
  }
}

assert = new Assertions();
