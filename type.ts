console.log("nour");

type all = number | string;

interface person {
  name: string;
  age: number;
}

function addnumbers<T>(a: all, b: person, c: T): string {
  console.log(a);
  console.log(b);

  console.log(c);
  return "nour";
}

addnumbers(5, { name: "nour", age: 15 }, "FF");
