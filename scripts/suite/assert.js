// module "assert.js"

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

Assertions.prototype.equal = function(actual, expected, message) {
  if (!(actual == expected)) {
    this.fail("Expected: " + expected + " but was: " + actual, message);
  }
}

Assertions.prototype.notEqual = function(actual, expected, message) {
  if ((actual == expected)) {
    this.fail("Expected something other than " + expected, message);
  }
}

Assertions.prototype.true = function(condition, message) {
  if (!condition) {
    this.fail("Condition was unexpectedly false", message);
  }
}

Assertions.prototype.false = function(condition, message) {
  if (condition) {
    this.fail("Condition was unexpectedly true", message);
  }
}

Assertions.prototype.fail = function(message, prefix) {
  if (prefix) {
    throw new TestFailure(prefix + ": " + message);
  } else {
    throw new TestFailure(message);
  }
}

assert = new Assertions();
