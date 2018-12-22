
let temp = null;

let inventory = new Satchel(10, 4);

inventory.grid[1][0] = ItemLibrary.testArmor;
inventory.grid[2][0] = ItemLibrary.testArmor;
inventory.grid[3][0] = ItemLibrary.testArmor;
inventory.grid[1][1] = ItemLibrary.testArmor;
inventory.grid[2][1] = ItemLibrary.testArmor;
inventory.grid[3][1] = ItemLibrary.testArmor;

inventory.grid[0][2] = ItemLibrary.skinnySword;
inventory.grid[1][2] = ItemLibrary.skinnySword;
inventory.grid[2][2] = ItemLibrary.skinnySword;
inventory.grid[3][2] = ItemLibrary.skinnySword;

inventory.grid[2][7] = ItemLibrary.testRing;

inventory.grid[0][9] = ItemLibrary.skinnySword;
inventory.grid[1][9] = ItemLibrary.skinnySword;
inventory.grid[2][9] = ItemLibrary.skinnySword;
inventory.grid[3][9] = ItemLibrary.skinnySword;

inventory.grid[0][4] = ItemLibrary.testBook;
inventory.grid[1][4] = ItemLibrary.testBook;
inventory.grid[0][5] = ItemLibrary.testBook;
inventory.grid[1][5] = ItemLibrary.testBook;


/**
 * Creates the grid DOM structure
 * @param {array} matrix    The 2D array representing our grid.
 */
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
      gridSquare.innerHTML = `${gridSquareVal.sym}`;

      rowDiv.appendChild(gridSquare);
    }

    grid.appendChild(rowDiv);
  }

  return grid;
}

/**
 * Renders the constructed grid to the DOM. Replaces current element's children.
 * @param {array} matrix	  The 2D array representing our grid.
 * @param {string} element  The id of the element to render the grid.
 */
function renderGrid(matrix, element) {
  let grid = constructGrid(matrix);
  grid.setAttribute("id", element);
  let container = document.getElementById(element);

  container.replaceWith(grid);
}



/**
 *            Click Events
 */


/**
 * Binds an event to all grid squares
 * @param {object} callback    The callback function.
 * @param {string} type	       The type of event e.g. 'click'
 */
function bindSatchelEvent(callback, type) {
  // Bind a click event to all grid squares
  // var gridSquares = document.getElementsByClassName("grid-square");
  var gridSquares = Sizzle(".grid-square");
  for (let i=0; i<gridSquares.length; i++) {
      gridSquares[i].addEventListener(type,callback);
  }
}

function bindEvents() {
  bindSatchelEvent(selectSquare, 'click');
  bindSatchelEvent(highlight, 'mouseenter');
}

/**
 * Gets the potential placement squares for an item. Think of it as an "outline"
 * of the item so we can operate on where the item may be placed.
 * @param {object} item
 * @param {int} x     The x position on the 2D array.
 * @param {int} y     The y position on the 2D array.
 */
function getItemGhost(item, x, y) {
  let ghostSquares = [];
  let itemHeight = 0;
  let itemWidth = 0;

  // We only need to worry about orientation for items bigger than 1 square.
  switch(item.orientation) {
    case "vertical":
      itemHeight = item.size / item.thickness;
      itemWidth = item.thickness;
      break;
    case "horizontal":
      itemHeight = item.thickness;
      itemWidth = item.size / item.thickness;
      break;
    default:
      return;
  }

  for (let i = 0; i < itemHeight; i++) {
    for (let j = 0; j < itemWidth; j++) {
      ghostSquares.push([x + j, y + i]);
    }
  }

  return ghostSquares;
}

/**
 * Highlights squares for the item currently in the clipboard.
 */
function highlight() {
  if (inventory.isClipboardEmpty()) {
    return;
  }

  let x = parseInt(this.dataset.x);
  let y = parseInt(this.dataset.y);
  let item = inventory.clipboard.itemObject;
  let squaresToColor = getItemGhost(item, x, y);

  colorSatchelSquares(squaresToColor);
}

/**
 * Removes highlighted squares.
 */
function clearGridColor() {
  let gridSquares = document.getElementsByClassName("grid-square");
  for (let i=0; i<gridSquares.length; i++) {
    gridSquares[i].removeAttribute("style");
  }
}

function colorSatchelSquares(colorCoords) {
  clearGridColor();
  for (let i=0; i<colorCoords.length; i++) {
    let x = colorCoords[i][0];
    let y = colorCoords[i][1];

    let square = getDOMSquare(x, y);
    if (square !== null) {
      let squareContents = inventory.grid[y][x];
      if (squareContents.itemId === 0) {
        square.setAttribute("style", "background-color: #6caf92;");
      } else {
        square.setAttribute("style", "background-color: #c25677;");
      }
    }
  }
}

/**
 * Gets the DOM element representing the square.
 * @param {int} x     The x position on the 2D array.
 * @param {int} y     The y position on the 2D array.
 */
function getDOMSquare(x, y) {
  return document.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
}


/**
 * Callback function
 * Modifies the grid state based on the value at the selected square.
 */
function selectSquare() {
  // We need to ensure x and y are ints
  let x = parseInt(this.dataset.x);
  let y = parseInt(this.dataset.y);

  if (inventory.isClipboardEmpty()) {
    pickContents(x, y);
  } else {
    putContents(x, y);
  }
}

function pickContents(x, y) {
  let squareContents = inventory.grid[y][x];

  if (squareContents.itemId === 0) {
    return;
  }

  let itemCoords = inventory.findItemCoords(x, y, squareContents.itemId);
  Sizzle("#currently-selected-item")[0].innerHTML = squareContents.name;

  inventory.addToClipboard(squareContents, itemCoords);
  clearSelectedItem(itemCoords);
}

/**
 *
 * @param {array} coords  The array of coords . e.g. [[0,1], [1,1], [2,5]]
 */
function pickContentsInArea(coords) {
  let x = 0;
  let y = 0;
  for (let i=0; i<coords.length; i++) {
    let x = coords[i][0];
    let y = coords[i][1];
    let squareContents = inventory.grid[y][x];

    if (squareContents.itemId !== 0) {
      pickContents(x, y);
      break;
    }
  }
}

/**
 * Checks inventory squares to see if they're currently-occupied.
 * @param {array} coords   The array of item coords.
 */
function getOccupants(coords) {
  let currentOccupantId = 0;
  let occupants = {};

  for (let i=0; i<coords.length; i++) {
    let x = coords[i][0];
    let y = coords[i][1];

    // We can't place an item that's going to be out of bounds.
    if (x > inventory.maxX || y > inventory.maxY) {
      return false;
    }

    currentOccupantId = inventory.grid[y][x].itemId;

    if (currentOccupantId !== 0) {
      occupants[currentOccupantId] = inventory.grid[y][x];
    }
  }

  return occupants;
}

/**
 * Attempts to place the item from the clipboard into the inventory grid.
 * @param {int} x     The x position on the 2D array.
 * @param {int} y     The y position on the 2D array.
 */
function putContents(x, y) {
  let item = inventory.clipboard.itemObject;
  let possiblePlacementCoords = getItemGhost(item, x, y);
  let occupants = getOccupants(possiblePlacementCoords);

  // If we checked a square that's out of bounds, we won't even attempt to place
  // the item.
  if (occupants === false) {
    return;
  }

  // We need a count of how many different items currently exist in the desired
  // placement and we only want to manipulate the grid if the item can be
  // placed. If there's not 0-1 occupants in the desired grid, let's leave it
  // alone.
  switch (Object.keys(occupants).length) {
    case 0:
      placeItem(possiblePlacementCoords, item);
      inventory.clearClipboard();
      break;
    case 1:
      let itemId = Object.keys(occupants)[0];
      // occupants[itemId]
      let itemToPlace = inventory.clipboard.itemObject;
      inventory.clearClipboard();
      pickContentsInArea(possiblePlacementCoords); // TODO we cant do this since we have to know if items exist in all squares of the item
      placeItem(possiblePlacementCoords, itemToPlace);
      break;
    default:
      return;
  }
}

function placeItem(coords, item) {
  for (let i = 0; i<coords.length; i++) {
    let x = coords[i][0];
    let y = coords[i][1];
    inventory.grid[y][x] = item;
    getDOMSquare(x, y).innerHTML = item.sym;
    Sizzle("#currently-selected-item")[0].innerHTML = "";
  }
}


/**
 * Removes the item from the grid using the item's grid coordinates.
 * @param {array} itemCoords  An array of item coordinates.
 */
function clearSelectedItem(itemCoords) {
  for (let i=0; i<itemCoords.length; i++) {
    let x = itemCoords[i][0];
    let y = itemCoords[i][1];
    inventory.grid[y][x] = ItemLibrary.emptyItem;
    getDOMSquare(x, y).innerHTML = "";
  }
}

/**
 * Re-renders the satchel object to the DOM.
 */
function redrawSatchel() {
  renderGrid(inventory.grid, "satchel");
  bindEvents();
}







renderGrid(inventory.grid, "satchel");
bindEvents();
