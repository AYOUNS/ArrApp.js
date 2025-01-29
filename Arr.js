// let arr = ["a", "b", "c", "d", "e"];
// let arr2 = ["j", "i", "h", "g", "f"];
// //console.log(arr.slice(2, 3)); //=== console.log([...arr])
// console.log(arr);

// const letters = arr.concat(arr2);
// console.log([...arr, ...arr2]);

// console.log(letters.join("_"));

// const arr4 = [23, 11, 64];
// console.log(arr4.slice(-1)[0]);
// console.log(arr4.at(-1));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// movements.forEach(function (movement, i, arr) {
//   if (movement > 0) {
//     console.log(`${i + 1} : you deposited ${movement}`);
//   } else console.log(`${i + 1} : you withdrew ${Math.abs(movement)}`);
// });

// //with a map
// const currencies = new Map([
//   ["USD", "United State Dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key} ${value}`);
// });

// //With a Set
// const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
// console.log(currenciesUnique);
// currencies.forEach(function (value, key, set) {
//   console.log(`${key} : ${value}`);
// });
//////////////////////////////////////////////////
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: "premium",
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: "standard",
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: "premium",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: "basic",
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `<div class="movements__row">
            <div class="movements__type 
            movements__type--${type}">${i + 1} ${type}</div>
            <div class="movements__value">${mov}</div>`;
    //adding previus HTML to the real web page
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account1.movements);

// const checkDogs = function (dogsJulia, dogsKate) {
//   const juliaSlice = dogsJulia.slice(1, -2);
//   const both = [...juliaSlice, ...dogsKate];
//   console.log(both);
//   both.forEach((dog, i) => {
//     console.log(
//       `Dog number ${i + 1} is an ${
//         dog >= 3 ? "adult" : "puppy"
//       },and it's ${dog} years old`
//     );
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;

// const movementsUSD = movements.map((mov) => {
//   return mov * eurToUsd;
// });

// console.log(movements);
// console.log(movementsUSD);

// const movementUSDfor = [];
// for (const mov of movements) movementUSDfor.push(mov * eurToUsd);
// console.log(movementUSDfor);

// const movementsDescriptions = movements.map(
//   (mov, i) =>
//     `Movement ${i + 1} : You ${mov > 0 ? "deposited" : "withdrew"}${Math.abs(
//       mov
//     )}}`
// );
// console.log(movementsDescriptions);

// const user = "Steven Thomas Williams";

// const createUsernames = function (accs) {
//   accs.forEach(function (acc) {
//     acc.userName = acc.owner
//       .toLowerCase()
//       .split(" ")
//       .map((name) => name[0])
//       .join("");
//   });
// };
// console.log(createUsernames(accounts));

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter((mov) => mov < 0);
console.log(withdrawals);

//accumulator -> SNOWBALL
const balance = movements.reduce((acc, curr, i, arr) => {
  console.log(`Iteration ${i}:${acc}`);
  return acc + curr;
}, 0);
console.log(balance);

//------clean code------//

//const balance = movements.reduce((acc, curr) => acc + curr, 0);
//console.log(balance);

//same code, but with for loop
let balance2 = 0;
for (const mov of movements) {
  balance2 += mov;
}
console.log(balance2);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = `${balance} EUR`;
};
calcDisplayBalance(account1.movements);

//maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);
