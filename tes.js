const date = new Date();
console.log(date.getMonth());

const thisMonth = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  1
).toLocaleDateString();

console.log(thisMonth);

const month = new Date().toLocaleDateString();
console.log(month);
const lastMonth = new Date(new Date().getFullYear(), 0, 1).toLocaleDateString();
console.log(lastMonth);
