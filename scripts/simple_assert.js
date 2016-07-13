function assertEquals(actual, expected, message) {
  if (!(actual == expected)) {
    if (message == null) {
      fail("Expected: " + expected + " but was: " + actual);
    } else {
      fail(message + ": Expected: " + expected + " but was: " + actual);
    }
  } 
}

function assertNotEquals(actual, expected, message) {
  if ((actual == expected)) {
    if (message == null) {
      fail("Expected something other than " + expected);
    } else {
      fail(message + ": Expected something other than " + expected);
    }
  } 
}


function fail(message) {
  throw new Error("ASSERTION FAILED: " + message);
}

testFunctions = [];

function test(name, body) {
  testFunctions.push({
    name: name,
    body: body
  });
}
  
function run() {
  var results = [];
  var count = 0;
  var failures = 0;
  while (testFunctions.length > 0) {
    var testFunction = testFunctions.shift();
    try {
      count++;
      testFunction.body.apply();
      results.push("SUCCESS: " + testFunction.name);
    } catch(error) {
      failures++
      results.push("FAILED: " + testFunction.name + ": " + error);
    }
  }
  while (results.length > 0) {
    console.log(results.shift());
  }
  console.log("Tests: " + count + " Failed: " + failures);
}
