// Requires simple/assert.js and simple/testing.js

test("equals_failing", function() {
  try {
    assertEqual("foo", "bar");
    failTest("Should have thrown.");
  } catch (err) {
    assertNotEqual(err.message, "Should have thrown.");
  }
});

test("equals_passing", function() {
  assertEqual("foo", "foo");
});

test("not_equals_passing", function() {
  assertNotEqual("foo", "bar");
});

test("failing with message", function() {
  try {
    assertEqual("foo", "bar", "Forced failure");
    failTest("Should have thrown.");
  } catch (err) {
    assertNotEqual(err.message, "Should have thrown.");
    assertTrue(
         err.message.startsWith("Forced failure"),
        "Should have started with 'Forced Failure'");
  }
});

test("testing_true", function() {
  assertTrue(true);
});

test("testing_false", function() {
  try {
    assertTrue(false, "Forced failure");
    failTest("Should have thrown.");
  } catch (err) {
    assertNotEqual(err.message, "Should have thrown.");
    assertTrue(
         err.message.startsWith("Forced failure"),
        "Should have started with 'Forced Failure'");
  }

});

test("demonstrate_failure", function() {
  assertFalse(true, "Some explanation");
});

runTests(true);
