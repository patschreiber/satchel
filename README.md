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

> Constructs a generic 2D array and fills the array with a default value. If no default value is provided, the grid square's default  to `0`.

```js
new Grid(width, height, initialGridBlankVal)
```

###### constructor(int width, int height, mixed)

Arguments

- `width`
> How many squares wide the grid will be.
- `height`
> How many squares tall the grid will be.
- `initialGridBlankVal`
> The initial value that will be filled into the grid squares. It can be any type.

Examples

```js

new Grid(10, 4, {objectId: 1, foo: "bar"});
new Grid(100, 100, null);
```

###### isEmpty(object)
###### stringifyCoords
###### getNeighbors

#### Satchel

##### Extends
`Grid`

##### Methods

###### constructor
####### Arguments
- `width` integer
> How many squares wide the grid will be.
- `height` integer
> How many squares tall the grid will be.
- `initialGridBlankVal` mixed
> The initial value that will be filled into the grid squares. It can be any type.

###### isClipboardEmpty
###### addToClipboard
###### clearClipboard
###### findItemCoords
###### compareSquareVal

