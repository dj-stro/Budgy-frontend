const add = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x * x;

const composed = compose(add, double, square); // equivalent to add(double(square(x)))

console.log(composed(2)); // square(2) = 4 → double(4) = 8 → add(8) = 9
