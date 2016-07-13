
test("failing", function() {
  assertEquals("foo", "bar");
});
test("passing", function() {
  assertEquals("foo", "foo");
});
test("failing with message", function() {
  assertEquals("foo", "bar", "Forced failure");
});
test("true", function() {
  assertTrue(true);
});
test("false", function() {
  assertTrue(false, "Forced failure");
});

run();
