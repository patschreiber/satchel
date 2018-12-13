class Satchel {
  constructor() {
    this.name = "Inventory";
    this.matrix = [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0]
    ];
  }

  get name()
{    return this.name;
  }
}

let sat = new Satchel();
console.log(sat.name());



var SatchelModulePatternVersion = (function($) {
  console.log($('#satchel'))
  this.name = "Inventory";

  return {
    getName: function() {
      return name;
    }
  }
})(Sizzle);

console.log(SatchelModulePatternVersion.getName());
