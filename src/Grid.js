/**
 * The Grid superclass. Constructs a generic 2D array. Can find all common
 * neighbors to a specific x,y coordinate.
 */
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
   * Checks to see if an object is empty.
   * @param {object} obj     The object to iterate through.
   * @return {boolean}       The status of the object.
   */
  isEmpty(object) {
    for (let key in object) {
      if (object.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  /**
   * Converts a coordinate pair array into a string. E.g [1,2] -> "1,2"
   * @param {array} coords  The coordinate pair to stringify.
   * @return {string}       The coordinates in string form. E.g "1,2"
   */
  stringifyCoords(coords) {
    let x = coords[0];
    let y = coords[1];

    return x + "," + y;
  }

  /**
   * Checks if a square coordinate is touching a boundary of the grid.
   * @param {array} squareCoords  The coordinates to a satchel square.
   * @param {array} grid          The 2D grid to search.
   * @return {object}             The boundaries the squareCoords are touching.
   */
  boundariesTouching(squareCoords, grid) {
    let x = squareCoords[0];
    let y = squareCoords[1];
    let touchingBoundaries = {
      top: grid[y-1] === undefined ? true : false,
      bottom: grid[y+1] === undefined ? true : false,
      leftBorder: grid[y][x-1] === undefined ? true : false,
      rightBorder: grid[y][x+1] === undefined ? true : false
    }

    return touchingBoundaries;
  }

  /**
   * Finds all neighboring squares to square located at the provided coords.
   * @param  {array} squareCoords The coordinates to a satchel square.
   * @param  {array} grid         The 2D grid to search.
   * @return {array}              The array of neighbor coordinates.
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

    let atBoundary = this.boundariesTouching(squareCoords, grid);

    if (atBoundary.top === false) {
      if (atBoundary.leftBorder === false) {
        neighbors["topLeft"] = [x-1, y-1];
      }
      if (atBoundary.rightBorder === false) {
        neighbors["topRight"] = [x+1, y-1];
      }

      neighbors["top"] = [x, y-1];
    }

    if (atBoundary.bottom === false) {
      if (atBoundary.leftBorder === false) {
        neighbors["bottomLeft"] = [x, y+1];
      }

      if (atBoundary.rightBorder === false) {
        neighbors["bottomRight"] = [x+1, y+1];
      }

      neighbors["bottom"] = [x, y+1];
    }

    if (atBoundary.leftBorder === false) {
      neighbors["left"] = [x-1, y];
    }

    if (atBoundary.rightBorder === false) {
      neighbors["right"] = [x+1, y];
    }

    return neighbors;
  }
}
