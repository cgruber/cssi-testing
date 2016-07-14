// simple recursive factorial function
function factorial(num) {
  if (typeof(num) != "number" || num % 1 !== 0) {
    throw new Error("Cannot run factorial on anything but int");
  }
  if (num < 0) {
    throw new Error("Cannot run factorial on a negative");
  } else if (num === 0) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}

function testFactorialZero() {
  assertEqual(factorial(0), 1);
}
function testFactorialOne() {
  assertEqual(factorial(1), 1);
}
function testFactorialTwo() {
  assertEqual(factorial(2), 2);
}
function testFactorialThree() {
  assertEqual(factorial(3), 6);
}
function testFactorialSix() {
  assertEqual(factorial(6), 720);
}
function testFactorialNegative() {
  try {
    factorial(-1);
    failTest("Should have thrown an error");
  } catch (err) {
    assertEqual(err.message, "Cannot run factorial on a negative")
  }
}
function testFactorialNonNumber() {
  try {
    factorial("");
    failTest("Should have thrown an error");
  } catch (err) {
    assertEqual(err.message, "Cannot run factorial on anything but int")
  }
}
function testFactorialNonIntegerNumber() {
  try {
    factorial(2.2);
    failTest("Should have thrown an error");
  } catch (err) {
    assertEqual(err.message, "Cannot run factorial on anything but int")
  }
}
runTests(true); // true == show succeeding tests.
