# Satchel
*Satchel allows you to easily create a grid-based inventory system à la Diablo. Etude in Diablo-esque inventory systems.*
> Please know that this is more of a code étude, so there might be bugs and inefficiencies. I find the API pretty easy to use, but your mileage may vary.

## Table of Contents

1. Getting Started
1. API

## Getting Started

Instantiate a new Satchel by defining it's height and width.

```js
let inventory = new Satchel(10, 4);
```

The Satchel will be filled with a

## API Reference

### Classes

#### Grid

##### constructor(*int* width, *int* height, *mixed* initialGridBlankVal)

*Constructs a generic 2D array and fills the array with a default value. If no default value is provided, the grid square's default  to `0`.*

###### Arguments

- `width` How many squares wide the grid will be.
- `height` How many squares tall the grid will be.
- `initialGridBlankVal` The initial value that will be filled into the grid squares. It can be any type.

###### Examples

```js
new Grid(width, height, initialGridBlankVal);
new Grid(10, 4, {objectId: 1, foo: "bar"});
new Grid(100, 100, null);
```

---

###### isEmpty(*object* object)

*A helper function to check if an object is empty.*

###### Arguments

- `object` The object to check.

###### Return

`boolean`

###### Examples

```js
let myObj = {};
grid.isEmpty(myObj);
//--> true

let myObj = {myProp: true};
//--> false

```

---

###### stringifyCoords(*array* coords)

*Converts a coordinate pair array into a string. E.g `[1,2]` -> `"1,2"`. This method assumes the `coords` array will be two elements in length.

###### Arguments

- `coords` The array to convert.

###### Return

`string`

###### Examples

```js
grid.stringifyCoords([1,2]);
//--> "1,2"
```

---

###### boundariesTouching(*array* squareCoords, *array* grid)

Checks if a square coordinate is touching a boundary of the grid.

###### Arguments

- `squareCoords` The coordinates to check.
- `grid` The grid to check.

###### Return

`boolean`

###### Examples

```js
/* If we have a 2D array, say 5 by 5, coordinate `0,0` would return true, `1,3` would return false.
  [[0,0,0,0,0],
   [0,0,0,0,0],
   [0,0,0,0,0],
   [0,0,0,0,0],
   [0,0,0,0,0]]
*/
grid.boundariesTouching([0,4]);
//--> true

grid.boundariesTouching([2,2]);
//--> false

```

---

###### getNeighbors(*array* squareCoords)

Finds all neighboring squares relative to the square located at the provided coords and returns the collection of the neighbor's coordinates.

 ###### Arguments

- `squareCoords` The coordinates to check.

###### Return

`array` The 2D array of the neighboring square's coordinates

###### Examples

```js
/* Let's say we have a 3x3 2D array:
   [[0,0,0],
    [0,0,0],
    [0,0,0]]
*/

grid.getNeighbords[0,1]

//--> = {
//      "topLeft": false,
//      "top": false,
//      "topRight": false,
//      "left": [0,0],
//      "right": [0,2],
//      "bottomLeft": [1,0],
//      "bottom": [1,1],
//      "bottomRight": [1,2]
//    };

grid.getNeighbords[1,1]

//--> {
//      "topLeft": [0,0],
//      "top": [0,1],
//      "topRight": [0,2],
//      "left": [1,0],
//      "right": [1,2],
//      "bottomLeft": [2,0],
//      "bottom": [2,1],
//      "bottomRight": [2,2]
//    };

```

#### Satchel

##### Extends
`Grid`

##### constructor

##### isClipboardEmpty
##### addToClipboard
##### clearClipboard
##### findItemCoords
##### compareSquareVal

