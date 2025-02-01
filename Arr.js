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

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `<div class="movements__row">
            <div class="movements__type 
            movements__type--${type}">${i + 1} ${type}</div>
            <div class="movements__value">${mov}€</div>`;
    //adding previus HTML to the real web page
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
//displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov);

  labelBalance.textContent = `${acc.balance} €`;
};
//calcDisplayBalance(account1.movements);

const calcdisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}€`;

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};

// calcdisplaySummary(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  //Display Movements
  displayMovements(acc.movements);
  //display balance
  calcDisplayBalance(acc);
  //display summary
  calcdisplaySummary(acc);
};
//Event handler
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  //prevent From submitting
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back,${
      currentAccount.owner.split(" ")[0]
    }`;
  }
  containerApp.style.opacity = 1;
  //clear input fields
  inputLoginUsername.value = inputLoginPin.value = "";
  inputLoginPin.blur();

  //Update UI
  updateUI(currentAccount);
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );
  console.log(amount, recieverAcc);

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    recieverAcc?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    //add movement
    currentAccount.movements.push(amount);
    //update UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault;

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.userName === currentAccount.userName
    );
    console.log(index);
    //delete account
    accounts.splice(index, 1);
    //hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

// const checkDogs = function (dogsJulia, dogsKate) {
//   const juliaSlice = dogsJulia.slice(1, -2);
//   const both = [...juliaSlice, ...dogsKate];
//   console.log(both);
//   both.forEach((dog, i) => {
//     console.log(
//         `Dog number ${i + 1} is an ${
//             dog >= 3 ? "adult" : "puppy"
//         },and it's ${dog} years old`
//     );
// });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

const eurToUsd = 1.1;

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

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(movements);
// console.log(deposits);

// const depositsFor = [];
// for (const mov of movements) if (mov > 0) depositsFor.push(mov);
// console.log(depositsFor);

// const withdrawals = movements.filter((mov) => mov < 0);
// console.log(withdrawals);

// //accumulator -> SNOWBALL
// const balance = movements.reduce((acc, curr, i, arr) => {
//   console.log(`Iteration ${i}:${acc}`);
//   return acc + curr;
// }, 0);
// console.log(balance);

//------clean code------//

//const balance = movements.reduce((acc, curr) => acc + curr, 0);
//console.log(balance);

//same code, but with for loop
// let balance2 = 0;
// for (const mov of movements) {
//   balance2 += mov;
// }
// console.log(balance2);

// //maximum value
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);

// const calcAverageHumanAge = (ages) =>
//   ages
//     .map((age) => (age <= 2 ? age * 2 : 16 + age * 4))
//     .filter((ages) => ages > 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// console.log(avg1);

//PIPline
// const totlaDepositsUSD = movements
//   .filter((mov) => mov > 0)
//   .map((mov) => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totlaDepositsUSD);

// const firstWithdrawals = movements.find((mov) => mov > 0);

// console.log(movements);
// console.log(firstWithdrawals);

// //return an element from object
// const account = accounts.find((acc) => owner === "Jessica Davis");
// console.log(account);
//EQUALITY
console.log(movements.includes(-130));
//some : CONDITION
const anyDeposits = movements.some((mov) => mov === -130);
console.log(anyDeposits);
//EVERY
console.log(movements.every((mov) => mov > 0));
console.log(account4.movements.every((mov) => mov > 0));

//separate callback
const deposits = (mov) => mov > 0;
console.log(movements.some(deposits));
console.log(movements.every(deposits));
console.log(movements.filter(deposits));

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const overalBalance = accounts

  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

const breeds = [
  {
    breed: "German Shepherd",
    averageWeight: 32,
    activities: ["fetch", "swimming"],
  },
  {
    breed: "Dalmatian",
    averageWeight: 24,
    activities: ["running", "fetch", "agility"],
  },
  {
    breed: "Labrador",
    averageWeight: 28,
    activities: ["swimming", "fetch"],
  },
  {
    breed: "Beagle",
    averageWeight: 12,
    activities: ["digging", "fetch"],
  },
  {
    breed: "Husky",
    averageWeight: 26,
    activities: ["running", "agility", "swimming"],
  },
  {
    breed: "Bulldog",
    averageWeight: 36,
    activities: ["sleeping"],
  },
  {
    breed: "Poodle",
    averageWeight: 18,
    activities: ["agility", "fetch"],
  },
];
const huskyWeight = breeds.find((avg) => avg.breed === "Husky")?.averageWeight;
console.log(huskyWeight);

const dogBothActivites = breeds.find(
  (both, i) =>
    both.activities.includes("running") && both.activities.includes("fetch")
)?.breed;
console.log(dogBothActivites);

const allActivities = breeds.flatMap((act) => act.activities);
console.log(allActivities);

const uniqueActivities = Array.from(
  new Set(breeds.flatMap((act) => act.activities))
);
console.log(uniqueActivities);

const swimmingAdjacent = Array.from(
  new Set(
    breeds
      .filter((UNI) =>
        UNI.activities.some((activities) => activities === "swimming")
      )
      .flatMap((breed) => breed.activities)
  )
);
console.log(swimmingAdjacent);

console.log(breeds.every((breed) => breed.averageWeight > 10));
console.log(breeds.some((breed) => breed.activities.length >= 3));
