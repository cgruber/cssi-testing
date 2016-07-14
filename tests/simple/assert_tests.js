// Requires simple/assert.js and simple/testing.js

function testEqualsFailing() {
  try {
    assertEqual("foo", "bar");
    failTest("Should have thrown.");
  } catch (err) {
    assertNotEqual(err.message, "Should have thrown.");
  }
}

function testEqualsPassing() {
  assertEqual("foo", "foo");
}

function testNotEqualsFailing() {
  assertNotEqual("foo", "bar");
}

function testFailingWithMessage() {
  try {
    assertEqual("foo", "bar", "Forced failure");
    failTest("Should have thrown.");
  } catch (err) {
    assertNotEqual(err.message, "Should have thrown.");
    assertTrue(
         err.message.startsWith("Forced failure"),
        "Should have started with 'Forced Failure'");
  }
}

function testAssertingTrue() {
  assertTrue(true);
}

function testAssertingTrueFailing() {
  try {
    assertTrue(false, "Forced failure");
    failTest("Should have thrown.");
  } catch (err) {
    assertNotEqual(err.message, "Should have thrown.");
    assertTrue(
         err.message.startsWith("Forced failure"),
        "Should have started with 'Forced Failure'");
  }
}

function testFailing_Demonstration() {
  assertFalse(true, "Some explanation");
}

function testError_Demonstration() {
  var blah = {
    name: "blah"
  }
  assertEqual(blah.name(), "blah"); // should error, since name() doesn't exist.
}


test("test with custom name", function() {
  assertEqual("foo", "bar", "Some explanation");
});

runTests(true);
