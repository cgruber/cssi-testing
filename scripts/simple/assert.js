// module "assert.js"

/*
 * A set of assertion methods which will throw a TestFailure error if their
 * conditions aren't met, optionally with a custom message. See each method
 * for details on usage.
 */

/* An assertion failure error */
class TestFailure extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'TestFailure';
  }
}


/*
 * Throws an error if the actual and expected are not equal in value
 * comparison (i.e., actual != expected)
 *
 * Usage:
 *    assertEqual(somethingToTest, "Expected String")
 *    assertEqual(somethingToTest, "Expected String", "Custom message")
 */
function assertEqual(actual, expected, message) {
  if (actual != expected) {
    failTest("Expected: " + expected + " but was: " + actual, message);
  }
}

/* Fails the test if the actual object is equal to the expected */
function assertNotEqual(actual, expected, message) {
  if (actual == expected) {
    failTest("Expected something other than " + expected, message);
  }
}

/* Fails the test if the condition is not true */
function assertTrue(condition, message) {
  if (!condition) {
    failTest("Condition was unexpectedly false", message);
  }
}

/* Fails the test if the condition is not false */
function assertFalse(condition, message) {
  if (condition) {
    failTest("Condition was unexpectedly true", message);
  }
}

/*
 * A method which causes the test to fail.  By default, it throws a
 * TestFailure error, which is consumed by the simple/testing.js module
 * as a failure of an assertion.
 *
 * This function can be replaced with an alternative implementation which
 * might throw a different error, log the failure into an expectation
 * gathering object, etc.
 */
var failTest = function(message, prefix) {
  if (prefix) {
    throw new TestFailure(prefix + ": " + message);
  } else {
    throw new TestFailure(message);
  }
}
