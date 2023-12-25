function fabNotRec(n) {
  // 1 1 2 3 5
  if (n <= 1) return 1;
  var first = 1;
  var second = 1;

  var temp = 0;
  for (i = 1; i < n; i++) {
    temp = first + second;

    first = second;
    second = temp;
  }
  return second;
}

const fab = fabNotRec(5);

console.log(fab);
