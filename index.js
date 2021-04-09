// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

// Add your functions below:

function validateCred(array) {
  // copy original array
  let copyArr = array;
  // empty array to push mutated numbers
  let newArr = [];
  // remove check digit until loop complete
  let checkDigit = copyArr.pop();
  // reverse copy
  copyArr.reverse();

  for (let i = 0; newArr.length < copyArr.length; i++) {
    let num = copyArr[i];

    if (i === 0 || i % 2 == 0) {
      if (num * 2 > 9) {
        // double number
        // if number > 9, subtract 9
        num = num * 2 - 9;
        newArr.push(num);
      } else {
        // else
        // push to new array
        num = num * 2;
        newArr.push(num);
      }
    } else {
      num = num;
      newArr.push(num);
    }
  }

  // append checkDigit to newArr
  newArr.push(checkDigit);

  // add all from new arr
  let arrayTotal = newArr.reduce(addArr);

  // % 10 = 0 is true
  // will return boolean
  return arrayTotal % 10 === 0 ? true : false;

  function addArr(total, num) {
    return total + num;
  }
}

function findInvalidCards(cardSet) {
  let invalidSet = [];
  cardSet.forEach((element) => {
    if (validateCred(element) === false) {
      invalidSet.push(element);
    }
  });
  return invalidSet;
}

function idInvalidCardCompanies() {
  let invalidCardIssuers = [];
  const invalidCardSet = findInvalidCards(batch);

  // forEach loop through cardSet
  invalidCardSet.forEach((cardNumber) => {
    //  if list item == 3 && invalidCardIssuers != Amex push Amex
    if (cardNumber[0] === 3 && cardNumber.includes("Amex") === false) {
      invalidCardIssuers.push("Amex");
    }
    //  if list item == 4 && invalidCardIssuers != Visa push Visa
    if (cardNumber[0] === 4 && cardNumber.includes("Visa") === false) {
      invalidCardIssuers.push("Visa");
    }
    //  if list item == 5 && invalidCardIssuers != Mastercard push Mastercard
    if (cardNumber[0] === 5 && cardNumber.includes("Mastercard") === false) {
      invalidCardIssuers.push("Mastercard");
    }
    //  if list item == 6 && invalidCardIssuers != Discover push Discover
    if (cardNumber[0] === 6 && cardNumber.includes("Discover") === false) {
      invalidCardIssuers.push("Discover");
    } else {
      //  else "Company not found"
      invalidCardIssuers.push("Company not found");
    }
  });

  return invalidCardIssuers;
}

console.log(idInvalidCardCompanies());
