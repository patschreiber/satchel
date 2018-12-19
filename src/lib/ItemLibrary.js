/**
 * Item Properties:
 * itemId	      The numeric uid of the item
 * sym	        Item Symbol to represent it on the grid
 * name	        The string representation of the item
 * abbr         The two letter code for the base item.
 * orientation	The orientation on the grid [null, vertical, horizontal]
 * Shapes	      The shape of the item on the grid. See [shapes] below.
 */

/**
 * Shapes:
 * rect_v	    Vertical Rectangle
 * rect_h	    Horizontal Rectangle
 * square	    Square
 * cross	    Cross shape "+"
 * single	    Only a single grid square
 */

var ItemLibrary = {
  // Empty item
  emptyItem: {
    itemId: 0,
    sym: " ",
    name: null,
    abbr: "xx",
    orientation: null,
    shape: null
  },
  // Plate Armor
  testArmor: {
    itemId: 1001,
    sym: "▲",   // item abbreviation
    name: "Plate Armor",
    abbr: "pa",
    orientation: "vertical",
    shape: "rect_v"
  },
  testBook: {
    itemId: 1001,
    sym: "▲",   // item abbreviation
    name: "Plate Armor",
    abbr: "tb",
    orientation: null,
    shape: "rect_v"
  },
  // Ring
  testRing: {
    itemId: 1002,
    sym: "⦾",   // item abbreviation
    name: "Magic Ring",
    abbr: "tr",
    orientation: "vertical",
    shape: "single"
  }
}
