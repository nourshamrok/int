function fn(n) {
  if (n <= 1) return 1;

  return fn(n - 1) + fn(n - 2);
}

function ft(n) {
  if (n <= 1) return 1;

  var a = 1;
  var b = 1;

  for (i = 2; i <= n; i++) {
    var z = a + b;
    a = b;
    b = z;
  }
  return z;
}

function increase() {
  var x = 0;
  return () => {
    x++;
    return x;
  };
}

var get = increase();
get();
get();
get();
get();
get();
var x = get();

console.log(x);

console.log("fn(2)");
console.log(ft(2));

console.log("fn(4)");
console.log(ft(4));

let a = new Promise((resolve, reject) => {
  resolve(10);
});

let b = new Promise((resolve, reject) => {
  resolve(4);
});

async function promisealll(promises) {
  var results = [];
  console.log(promises);
  for (i = 0; i < promises.length; i++) {
    await promises[i].then((value) => {
      console.log(value);
      results.push(value);
    });
  }
  return results;
}

var pro = Promise.all([a, b]);
var pro = promisealll([a, b]);

//console.log(pro);

pro
  .then((result) => {
    console.log("Promise resolved with result:", result);
  })
  .catch((error) => {
    console.error("Promise rejected with error:", error);
  });

var t = [1, 2, 3, 4, 5];

var m = t.map((vl) => {
  return vl * 2;
});
m.forEach((vl) => {
  console.log(vl);
});


console.log("m");
console.log(m);
