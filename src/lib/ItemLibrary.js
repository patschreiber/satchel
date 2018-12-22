/**
 * Item Properties:
 * itemId	      The numeric uid of the item
 * sym	        Item Symbol to represent it on the grid
 * name	        The string representation of the item
 * abbr         The two letter code for the base item.
 * orientation	The orientation on the grid [null, vertical, horizontal]
 * shape	      The shape of the item on the grid. See [shapes] below.
 * thickness    How many columns the item is.
 */

/**
 * Shapes:
 * rect_v	    Vertical Rectangle
 * rect_h	    Horizontal Rectangle
 * square	    Square. All sides have equal length
 * cross	    Cross shape "+"
 */

var ItemLibrary = {
  // Empty item
  emptyItem: {
    itemId: 0,
    sym: "",
    name: null,
    abbr: "xx",
    orientation: null,
    shape: null,
    thickness: null
  },
  // Plate Armor
  testArmor: {
    itemId: 1001,
    sym: "▲",   // item abbreviation
    name: "Plate Armor",
    abbr: "pa",
    orientation: "vertical",
    shape: "rect_v",
    thickness: 2
  },
  testBook: {
    itemId: 1004,
    sym: "◼︎",   // item abbreviation
    name: "Book",
    abbr: "tb",
    orientation: "horizontal",
    shape: "rect_v",
    thickness: 2
  },
  // Ring
  testRing: {
    itemId: 1002,
    sym: "⦾",   // item abbreviation
    name: "Magic Ring",
    abbr: "tr",
    orientation: "vertical",
    shape: "square",
    thickness: 1
  },
  // Skinny single column sword
  skinnySword: {
    itemId: 1003,
    sym: "|",
    name: "Skinny Sword",
    abbr: "ss",
    orientation: "vertical",
    shape: "line",
    thickness: 1
  }
}
