
let temp = null;

let inventory = new Satchel(10, 4);

inventory.grid[1][0] = ItemLibrary.testArmor;
inventory.grid[2][0] = ItemLibrary.testArmor;
inventory.grid[3][0] = ItemLibrary.testArmor;
inventory.grid[1][1] = ItemLibrary.testArmor;
inventory.grid[2][1] = ItemLibrary.testArmor;
inventory.grid[3][1] = ItemLibrary.testArmor;

inventory.grid[2][7] = ItemLibrary.testRing;


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
      gridSquare.innerHTML = `[${gridSquareVal.sym}]`;

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

renderGrid(inventory.grid, "satchel");




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

function castShadow() {
  temp = this.innerHTML;
  this.innerHTML = '[x]';
  console.log('inventory.getSelectedItemSize() :', inventory.getSelectedItemSize());
  console.log('inventory.clipboard.itemObject :', inventory.clipboard.itemObject);
}

function selection() {
  this.innerHTML = temp;
  temp = null;
}

bindSatchelEvent(selectSquare, 'click');
bindSatchelEvent(castShadow, 'mouseover');
bindSatchelEvent(selection, 'mouseout');


/**
 * Callback function
 * Modifies the grid state based on the value at the selected square.
 */
function selectSquare() {
  // We need to ensure x and y are ints
  let x = parseInt(this.dataset.x);
  let y = parseInt(this.dataset.y);
  let squareContents = inventory.grid[y][x];

  if (squareContents.itemId === 0) {
    return;
  }

  let itemCoords = inventory.findItemCoords(x, y, squareContents.itemId);
  Sizzle("#currently-selected-item")[0].innerHTML = squareContents.name;
  inventory.clipboard.itemObject = squareContents;
  inventory.clipboard.itemCoords = itemCoords;
  console.log('clipboard :', inventory.clipboard.itemCoords);

  clearSelectedItem(itemCoords);
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

  }

  redrawSatchel();
}

/**
 * Re-renders the satchel object to the DOM.
 */
function redrawSatchel() {
  renderGrid(inventory.grid, "satchel");
  bindSatchelEvent(selectSquare, 'click');
  bindSatchelEvent(castShadow, 'mouseover');
  bindSatchelEvent(selection, 'mouseout');

}
