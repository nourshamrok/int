function feb(n) {
  if (n <= 1) return 1;
  else return feb(n - 2) + feb(n - 1);
}

function febwithoutrec(n) {
  if (n <= 1) return 1;
  let first = 1;
  let second = 1;
  let current = 0;
  for (let i = 0; i < n - 1; i++) {
    current = first + second;
    console.log("current2");
    console.log(current);
    first = second;
    second = current;
  }

  console.log("current");
  console.log(current);
  return current;
}
/*
console.log(feb(0))

console.log(feb(1))

console.log(feb(2))

console.log(feb(3))

console.log(feb(4))

console.log(feb(5))

console.log(feb(6))*/

console.log(febwithoutrec(10));
