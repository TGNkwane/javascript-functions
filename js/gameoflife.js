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
  let xValues = state.map(([x, _]) => x);
  let yValues = state.map(([_, y]) => y); 
  if (state.length === 0){
     return {
    topRight: [0, 0],
    bottomLeft: [0, 0]
    };
  } else {
    minX = Math.min(...xValues);
    maxX = Math.max(...xValues);
    minY = Math.min(...yValues);
    maxY = Math.max(...yValues);
    return {
      topRight: [maxX, maxY],
      bottomLeft: [minX, minY]
    };
  }
};

const printCells = (state) => {
  const {topRight, bottomLeft} = corners(state);
  // string generation
  let result = '';
  // directions seem reveresed, but thats compsci logic
  for (let index = topRight[1]; index >= bottomLeft[1]; index--){
    for (let index2 = bottomLeft[0]; index2 <= topRight[0]; index2++){
      result += printCell([index2, index], state) + " ";
    }
    result += '\n';
  }
  return result;
};

const getNeighborsOf = ([x, y]) => {
  return [[x-1, y-1], [x, y-1], [x+1, y-1], [x-1, y], [x+1, y], [x-1, y+1], [x, y+1], [x+1, y+1]];
};

const getLivingNeighbors = (cell, state) => {
  const neighbors = getNeighborsOf(cell);
  return neighbors.filter(c => contains.call(state, c));
};

const willBeAlive = (cell, state) => {
  const livingNeighbors = getLivingNeighbors(cell, state);
  const isAlive = contains.call(state, cell);
  const willBeAlive = (livingNeighbors.length === 3) || (livingNeighbors.length === 2 && isAlive);
  return willBeAlive;
};

const calculateNext = (state) => {
  let {topRight, bottomLeft} = corners(state);
  let result = [];
  for (let rows= bottomLeft[1]  - 1 ; rows < topRight[1] + 1; rows++) {
    for (let cols = bottomLeft[0] - 1; cols < topRight[0] + 1; cols++) {
      result.push(willBeAlive([cols, rows], state));
    }
  }
  return result;
};

const iterate = (state, iterations) => {
  let result = state;
  for (let i = 0; i < iterations; i++) {
    result = calculateNext(result);
  }
  return result;
};

const main = (pattern, iterations) => {
  let state = seed(...pattern);
  return printCells(iterate(state, iterations));
};

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