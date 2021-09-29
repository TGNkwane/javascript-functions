function seed(...seeds) {
  return seeds;
}

function same([x, y], [j, k]) {
  let isSameCell = ((x == j) && (y == k)) ? true:false;
  return isSameCell;
}

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
  return this.some(c => same(c,cell));
}

const printCell = (cell, state) => {
  return contains.call(state, cell) ? '\u25A3': '\u25A2';
};

const corners = (state = []) => {
  let minX = 0; let minY = 0; let maxX = 0; let maxY = 0;
  let xValues = [];
  let yValues = []; 
  if (state.length > 0){
    state.forEach(cell => {
      xValues.push(cell[0]);
      yValues.push(cell[1]);
    });
    minX = Math.min(...xValues);
    minY = Math.min(...yValues);
    maxX = Math.max(...xValues);
    maxY = Math.max(...yValues);
  }
  
  return {
    topRight: [maxX, maxY],
    bottomLeft: [minX, minY]
    };
};

const printCells = (state) => {
  const corners = corners(state);
  // directions seem reveresed, but thats compsci logic
  for (let index = corners.minY; index < corners.maxY; index++){
    for (let index2 = corners.minX; index2 < corners.maxX; index2++){
      console.log(printCell([index2, index], state));
    }
  }
};

const getNeighborsOf = ([x, y]) => {};

const getLivingNeighbors = (cell, state) => {};

const willBeAlive = (cell, state) => {};

const calculateNext = (state) => {};

const iterate = (state, iterations) => {};

const main = (pattern, iterations) => {};

const startPatterns = {
    rpentomino: [
      [3, 2],
      [2, 3],
      [3, 3],
      [3, 4],
      [4, 4]
    ],
    glider: [
      [-2, -2],
      [-1, -2],
      [-2, -1],
      [-1, -1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
      [2, 3]
    ],
    square: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2]
    ]
  };
  
  const [pattern, iterations] = process.argv.slice(2);
  const runAsScript = require.main === module;
  
  if (runAsScript) {
    if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
      main(pattern, parseInt(iterations));
    } else {
      console.log("Usage: node js/gameoflife.js rpentomino 50");
    }
  }
  
  exports.seed = seed;
  exports.same = same;
  exports.contains = contains;
  exports.getNeighborsOf = getNeighborsOf;
  exports.getLivingNeighbors = getLivingNeighbors;
  exports.willBeAlive = willBeAlive;
  exports.corners = corners;
  exports.calculateNext = calculateNext;
  exports.printCell = printCell;
  exports.printCells = printCells;
  exports.startPatterns = startPatterns;
  exports.iterate = iterate;
  exports.main = main;