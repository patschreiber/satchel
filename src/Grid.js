class Grid {
  /**
   *
   * @param {int} width	        How many columns the subarray should be.
   * @param {int} height        How many rows the 2D array should have.
   * @param {mixed} blankVal    The initial value for blank squares.
   */
  constructor(width, height, blankVal = 0) {
    this.grid = [];

    // Defines the grid
    for (let i=0; i<height; i++) {
      let row = [];
      for (let j=0; j<width; j++) {
        row[j] = blankVal;
      }
      this.grid[i] = row;
    }
  }

  /**
   * Converts a coordinate pair array into a string. E.g [1,2] -> "1,2"
   * @param {array} coords  The coordinate pair to stringify.
   */
  stringifyCoords(coords) {
    let x = coords[0];
    let y = coords[1];

    return x + "," + y;
  }

  /**
   * Finds all neighboring squares to square located at the provided coords.
   * @param {array} squareCoords The coordinates to a satchel square.
   * @param {array} grid         The 2D grid to search
   */
  getNeighbors(squareCoords, grid) {
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
    let atTop = grid[y-1] === undefined ? true : false;
    let atBottom = grid[y+1] === undefined ? true : false;
    let atLeftBorder = grid[y][x-1] === undefined ? true : false;
    let atRightBorder = grid[y][x+1] === undefined ? true : false;

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
}
