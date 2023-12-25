function outer() {
  var count = 0;
  function inner() {
    count++;
    console.log(count);
  }
  return inner;
}

var closure = outer();

closure();

closure();

closure();
