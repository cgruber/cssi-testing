// Requires simple_assert.js

var suite = new TestSuite("Tests For simple_assert");

suite.test("equals_failing", function() {
  try {
    assert.equal("foo", "bar");
    assert.fail("Should have thrown.");
  } catch (err) {
    assert.notEqual(err.message, "Should have thrown.");
  }
});

suite.test("equals_passing", function() {
  assert.equal("foo", "foo");
});

suite.test("not_equals_passing", function() {
  assert.notEqual("foo", "bar");
});

suite.test("failing with message", function() {
  try {
    assert.equal("foo", "bar", "Forced failure");
    assert.fail("Should have thrown.");
  } catch (err) {
    assert.notEqual(err.message, "Should have thrown.");
    assert.true(
         err.message.startsWith("Forced failure"),
        "Should have started with 'Forced Failure'");
  }
});

suite.test("testing_true", function() {
  assert.true(true);
});

suite.test("testing_false", function() {
  try {
    assert.true(false, "Forced failure");
    assert.fail("Should have thrown.");
  } catch (err) {
    assert.notEqual(err.message, "Should have thrown.");
    assert.true(
         err.message.startsWith("Forced failure"),
        "Should have started with 'Forced Failure'");
  }

});

suite.run(true);
