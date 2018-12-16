class Satchel extends Grid {
  /**
   *
   * @param {int} width  How many columns the subarray should be.
   * @param {*} height How many rows the 2D array should have.
   */
  constructor(width, height) {
    super();
    this.grid = [];
    // Defines the grid
    for (let i=0; i<height; i++) {
      let row = [];
      for (let j=0; j<width; j++) {
        row[j] = ItemLibrary.emptyItem;
      }
      this.grid[i] = row;
    }
  }

  /**
   *
   * @param {int} x       The x position on the 2D (grid) array.
   * @param {int} y	      The y position on the 2D (grid) array.
   * @param {int} itemId	The unique item id of the object in the grid square.
   */
  findItemCoords(x, y, itemId) {
    // We keep track of our visited squares to avoid infinite loops.
    let visited = {};
    let queue = [];
    let itemCoords = [];

    // Let's add our initial square to the queue
    queue.push([x,y]);

    while (queue.length > 0) {
      let currentSquareCoords = queue.shift();
      // We want visitedKey to be a string so we can use it as the dictionary key.
      let visitedKey = this.stringifyCoords(currentSquareCoords);

      // If we've already visited this square, let's not process it again.
      if (visited[visitedKey]) {
        continue;
      } else {
        let isItemInSquare = this.compareSquareVal(currentSquareCoords, itemId);
        if (isItemInSquare) {
          itemCoords.push(currentSquareCoords);
        }

        visited[visitedKey] = true;
      }

      // Meet our neighbors
      let neighbors = this.getNeighbors(currentSquareCoords, this.grid);

      // Let's add the current square's neighbors to the queue in order to be
      // processed, only if it hasn't been visited before.
      for (let key in neighbors) {
        let neighborCoords = neighbors[key];

        if (neighborCoords !== false) {
          let visitedKey = this.stringifyCoords(neighborCoords);
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

  /**
   * Determines if the value of the itemId at currentSquareCoordinates is the
   * same as the item id we're searching for.
   * @param {array} currentSquareCoords	  The [x,y] coordinates of the square.
   * @param {string} itemId	                  The item uid we're searching for.
   */
  compareSquareVal(currentSquareCoords, itemId) {
    let x = currentSquareCoords[0];
    let y = currentSquareCoords[1];
    let currentSquareContents = this.grid[y][x];

    return currentSquareContents.itemId === itemId;
  }
}