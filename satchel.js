

let clipboard = [];

// Empty square
let xx = {
  itemId: 0,
  itemAbbr: "░",
  itemName: null
};

// Plate Armor
let pa = {
  itemId: 1001,
  itemAbbr: "▲",   // item abbreviation
  itemName: "Plate Armor"
};

// Ring
let rr = {
  itemId: 1002,
  itemAbbr: "⦾",   // item abbreviation
  itemName: "Magic Ring"
}
// Ring
let ri = {
  itemId: 1003,
  itemAbbr: "⦾",   // item abbreviation
  itemName: "Super Magic Ring"
}


var satchel = [
[xx,xx,xx,xx,xx,xx,xx,xx,xx,xx],
[pa,pa,xx,xx,xx,xx,xx,xx,xx,xx],
[pa,pa,xx,xx,xx,xx,xx,ri,xx,xx],
[pa,pa,xx,xx,xx,xx,rr,xx,xx,xx]
];


// Non-existent grid space is undefined
// console.log(satchel[0][11])
// console.log(satchel[0-1])

function constructGrid(matrix) {
  let grid = document.createElement("div");

  // Grid rows
  for (let i=0; i<matrix.length; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.setAttribute('class', 'grid-row');

    // Grid squares
    for (let j=0; j<matrix[i].length; j++) {
      let gridSquareVal = matrix[i][j];
      let gridSquare = document.createElement("div");
      gridSquare.setAttribute('class', 'grid-square');
      gridSquare.setAttribute('data-x', j);
      gridSquare.setAttribute('data-y', i);
      gridSquare.innerHTML = `[${gridSquareVal.itemAbbr}]`;

      rowDiv.appendChild(gridSquare);
    }

    grid.appendChild(rowDiv);
  }

  return grid;
}

function renderGrid(matrix, element) {
  let grid = constructGrid(matrix);
  grid.setAttribute("id", element);
  let container = document.getElementById(element);

  container.replaceWith(grid);
}

renderGrid(satchel, "satchel");

/**
 * // Bind a click event to all grid squares
 */
function bindSatchelClickEvent(event) {
  // Bind a click event to all grid squares
  // var gridSquares = document.getElementsByClassName("grid-square");
  var gridSquares = Sizzle(".grid-square");
  for (let i=0; i<gridSquares.length; i++) {
      gridSquares[i].addEventListener('click',event);
  }
}

bindSatchelClickEvent(selectSquare);

function findItemCoords(x, y, itemId) {

  // We keep track of our visited squares to avoid infinite loops.
  let visited = {};
  let queue = [];
  let itemCoords = [];

  // Let's add our initial square to the queue
  queue.push([x,y]);

  while (queue.length > 0) {
    let currentSquareCoords = queue.shift();
    // console.error("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ currently processing: " + currentSquareCoords)
    // console.log('queue.length :', queue.length);
    // console.log('visited :', visited);
    // We want visitedKey to be a string so we can use it as the dictionary key.
    let visitedKey = stringifyCoords(currentSquareCoords);

    // If we've already visited this square, let's not process it again.
    if (visited[visitedKey]) {
      continue;
    } else {
      let isItemInSquare = compareSquareValue(currentSquareCoords, itemId);
      if (isItemInSquare) {
        itemCoords.push(currentSquareCoords);
      }

      visited[visitedKey] = true;
    }

    // Define our neighbors
    let neighbors = getNeighbors(currentSquareCoords);

    // Let's add the current square's neighbors to the queue in order to be
    // processed, only if it hasn't been visited before.
    for (let key in neighbors) {
      let neighborCoords = neighbors[key];

      if (neighborCoords !== false) {
        let visitedKey = stringifyCoords(neighborCoords);
        // We don't want to push to the queue if we've already visited this
        // square.
        if (visited[visitedKey]) {
          continue;
        }

        queue.push(neighbors[key]);
      }
    }

  }

  return itemCoords;
}

function compareSquareValue(currentSquareCoords, itemId) {
  let x = currentSquareCoords[0];
  let y = currentSquareCoords[1];
  let currentSquareContents = satchel[y][x];

  return currentSquareContents.itemId === itemId;
}

function stringifyCoords(coords) {
  let x = coords[0];
  let y = coords[1];

  return x + "," + y;
}

//findItemCoords(0,0)

/**
 * Finds all neighboring squares to square located at the provided coordinates.
 * @param {array} squareCoords The coordinates to a satchel square.
 */
function getNeighbors(squareCoords) {
  let x = squareCoords[0];
  let y = squareCoords[1];

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
  let atLeftBorder = satchel[y][x-1] === undefined ? true : false;
  let atRightBorder = satchel[y][x+1] === undefined ? true : false;

  // console.log("atTop:" + atTop)
  // console.log("atBottom:" + atBottom)
  // console.log("atLeftBorder:" + atLeftBorder)
  // console.log("atRightBorder:" + atRightBorder)

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

function selectSquare() {
  // We need to ensure x and y are ints
  let x = parseInt(this.dataset.x);
  let y = parseInt(this.dataset.y);
  let squareContents = satchel[y][x];

  if (squareContents.itemId === 0) {
    return;
  }

  let itemCoords = findItemCoords(x, y, squareContents.itemId);
  Sizzle("#currently-selected-item")[0].innerHTML = squareContents.itemName;
  clipboard = itemCoords;

  clearSelectedItem(itemCoords);
}

function clearSelectedItem(itemCoords) {
  for (let i=0; i<itemCoords.length; i++) {
    let x = itemCoords[i][0];
    let y = itemCoords[i][1];

    satchel[y][x] = xx;
  }

  redrawSatchel();
}

function redrawSatchel() {
  renderGrid(satchel, "satchel");
  bindSatchelClickEvent(selectSquare);
}
