

var clipboard = [
[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]
]

// Our coordinates

var satchel = [
[0,0,0,1,1,"p","p","p",0,0],
[0,0,0,1,1,0,0,0,0,0],
[0,0,0,1,1,0,0,0,0,0],
[0,0,0,1,1,0,0,0,0,0]
];


// Non-existent grid space is undefined
console.log(satchel[0][11])
console.log(satchel[0-1])

console.log("+++++++++")
let y = 1
let x = 1
var a = y + "," + x
let testHash = {}
testHash[a] = true
console.log(!testHash["2,1"]);
console.log(testHash["1,1"]);


function renderGrid(matrix, element) {
  // Grid rows
  for (let i=0; i<matrix.length; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.setAttribute('class', 'grid-row');

    // Grid squares
    for (let j=0; j<matrix[i].length; j++) {
      let gridSquare = document.createElement("div");
      gridSquare.setAttribute('class', 'grid-square');
      gridSquare.setAttribute('data-x', j);
      gridSquare.setAttribute('data-y', i);
      gridSquare.innerHTML = `[${matrix[i][j]}]`;

      rowDiv.appendChild(gridSquare);
    }

    document.getElementById(element).appendChild(rowDiv);
  }
}

renderGrid(satchel, "satchel");



// Bind a click event to all grid squares
// var gridSquares = document.getElementsByClassName("grid-square");
var gridSquares = Sizzle(".grid-square");
for (let i=0; i<gridSquares.length; i++) {
    gridSquares[i].addEventListener('click',selectSquare);
}

// TODO - May need to do BFS here using a queue
//function recursiveSearch(currentGridSquareVal, x, y, coordList) {
//   let newGridSquareVal = satchel[y][x];
//   if (newGridSquareVal === gridSquareVal) {
//     coordList.push([x, y]);
//     recursiveSearch(newGridSquareVal, x-1,)
//   } else {
//   }
// }

function findItemCoords(x, y) {
  console.log(satchel[y][x]);
  //let itemCoords = recursiveSearch(satchel[y][x], x, y, []);

  // We keep track of our visited squares to avoid infinite loops.
  let visited = {};
  let queue = [];
  queue.push([x,y]);
  console.log(queue);

  while(queue.length > 0) {
    let squareCoords = queue.shift();
    let x = squareCoords[0];
    let y = squareCoords[1];
    // We want visitedKey to be a string so we can use it as the dictionary key.
    let visitedKey = x + "," + y;

    // If we've already visited this square, let's not process it again. 
    if (visited[visitedKey]) {
      return;
    } else {
      visited[visitedKey] = true;
    }

    // Define our neighbors
    
    let neighbors = getNeighbors(x, y);

    // Let's add the current square's neighbors to the queue in order to be 
    // processed, only if it hasn't been visited before.

  }
}

//findItemCoords(1,1)

function getNeighbors(x, y) {
  let neighbors = {
    "topLeft": false,
    "top": false,
    "topRight": false,
    "left": false,
    "right": false,
    "bottomLeft": false,
    "bottom": false,
    "bottomRight": false
  };
  let atTop = satchel[y-1] === undefined ? true : false;
  let atBottom = satchel[y+1] === undefined ? true : false;
  let atLeftBorder = satchel[x-1] === undefined ? true : false;
  let atRightBorder = satchel[x+1] === undefined ? true : false;

  if (atTop === false) {
    if (atLeftBorder === false) {
      neighbors["topLeft"] = [x-1, y-1];
    }
    if (atRightBorder === false) {
      neighbors["topRight"] = [x+1, y-1];
    }

    neighbors["top"] = [x, y-1];
  }

  if (atBottom === false) {
    if (atLeftBorder === false) {
      neighbors["bottomLeft"] = [x, y+1];
    }

    if (atRightBorder === false) {
      neighbors["bottomRight"] = [x+1, y+1];
    }

    neighbors["bottom"] = [x, y+1];
  }

  if (atLeftBorder === false) {
    neighbors["left"] = [x-1, y];
  }

  if (atRightBorder === false) {
    neighbors["right"] = [x+1, y];
  }

  return neighbors;
}

var hello = getNeighbors(0, 1);
console.log(hello)

function selectSquare() {
  console.log(this);
  console.log(this.dataset.x + "," + this.dataset.y);
  findItemCoords(this.dataset.x, this.dataset.y);
}
