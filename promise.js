var p1 = new Promise((resolve, reject) => {
  resolve(4);
});

/*p1.then((value) => {
  console.log(value);
});
*/

async function ay() {
  const value = await p1;
  console.log(value);
}

ay();
