(() => {
  console.log('Script loaded...');

  function maxCells() {
    const tables = document.getElementsByTagName('table');
    let maxCount = 0;

    if (tables.length) {
      Array.from(tables).forEach((table) => {
        let cellsInTable = 0;
        Array.from(table.rows).forEach((row) => {
          cellsInTable += row.cells.length;
        });
        maxCount = Math.max(maxCount, cellsInTable);
      });
    }

    return maxCount;
  }

  console.log(maxCells());
})();

function perm(xs) {
  let ret = [];

  for (let i = 0; i < xs.length; i++) {
    let inter = xs.slice(0, i).concat(xs.slice(i + 1));
    let rest = perm(inter);

    if (!rest.length) {
      ret.push([xs[i]]);
    } else {
      for (let j = 0; j < rest.length; j++) {
        ret.push([xs[i]].concat(rest[j]));
      }
    }
  }

  return ret;
}

// "abc"
// 'a' + "bc"
// 'b' + "ac"
// 'c' + "ab"
let findPermutations = (string) => {
  if (!string || typeof string !== 'string') {
    return 'Please enter a string';
  } else if (string.length < 2) {
    return string;
  }

  let permutationsArray = [];

  for (let i = 0; i < string.length; i++) {
    let char = string[i];

    if (string.indexOf(char) != i) continue;

    let remainingChars =
      string.slice(0, i) + string.slice(i + 1, string.length);
    const permsWithoutCurr = findPermutations(remainingChars);

    for (let permutation of permsWithoutCurr) {
      permutationsArray.push(char + permutation);
    }
  }
  return permutationsArray;
};

var mapOfNumbers = {
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z'],
};

var letterCombinations = function (digits) {
  // Return early if no digits were supplied
  if (!digits.length) {
    return [];
  }

  function getLetterCombinations(digits, previousCombinations) {
    // Initialise an array to store the possibilties for this digit
    let newPossibilities = [];

    // Loop through the previous iteration's combinations
    for (let previousCombination of previousCombinations) {
      // Loop through the possible letters for this number
      for (let possibleLetter of mapOfNumbers[digits[0]]) {
        // Add a combination of the previous set with the current letters to the array
        newPossibilities.push(previousCombination.concat(possibleLetter));
      }
    }

    // If there are more digits, run the function again, otherwise return the combinations
    return digits.length > 1
      ? getLetterCombinations(digits.slice(1), newPossibilities)
      : newPossibilities;
  }

  return getLetterCombinations(digits.toString(), ['']);
};

const numIslands = (grid) => {
  let counter = 0;

  const dfs = (i, j) => {
    if (
      i >= 0 &&
      j >= 0 &&
      i < grid.length &&
      j < grid[i].length &&
      grid[i][j] === '1'
    ) {
      grid[i][j] = '0';
      dfs(i + 1, j); // top
      dfs(i, j + 1); // right
      dfs(i - 1, j); // bottom
      dfs(i, j - 1); // left
    }
  };

  for (let i = 0; i < grid.length; i += 1) {
    for (let j = 0; j < grid[i].length; j += 1) {
      if (grid[i][j] === '1') {
        counter += 1;
        dfs(i, j);
      }
    }
  }

  return counter;
};

// console.log(perm([1, 2, 3]).join('\n'));
console.log(findPermutations('abc').join('\n'));

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function fillRiddle(riddle) {
  const riddleArr = riddle.split('');
  const n = riddleArr.length;
  const getNextRandom = (notIn) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const getRandom = (_) => Math.floor(Math.random() * chars.length - 1);
    let randomValidChar = '';
    notIn = notIn.filter((n) => n != '?');
    while (true) {
      const c = chars[getRandom()];
      if (!notIn.includes(c)) {
        randomValidChar = c;
        break;
      }
    }
    return randomValidChar;
  };

  for (let i = 0; i < n; i++) {
    const prevIdx = i - 1;
    const nextIdx = i + 1;

    if (prevIdx < 0) {
      // first char
      if (riddleArr[i] == '?') {
        riddleArr[i] = getNextRandom([riddleArr[nextIdx]]); // next can be '?'
      }
    }
    if (prevIdx >= 0 && nextIdx < n) {
      if (riddleArr[i] == '?') {
        riddleArr[i] = getNextRandom([riddleArr[prevIdx], riddleArr[nextIdx]]); // prev always present, next can be '?'
      }
    }
    if (nextIdx > n - 1) {
      // last char
      if (riddleArr[i] == '?') {
        riddleArr[i] = getNextRandom([riddleArr[prevIdx]]); // prev always present
      }
    }
  }

  return riddleArr.join('');
}

console.log('Riddle: ', fillRiddle('rd?e?wg?'));
