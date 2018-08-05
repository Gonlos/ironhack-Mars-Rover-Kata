const directions = ["N","E","S","W"]
// Rover Object Goes Here
// ======================
var rover = {
  direction : 0,
  x : 0,
  y : 0,
  turnLeft : function () {
    prevDirection=this.direction
    if(this.direction==0){
      this.direction=directions.length
    }
    this.direction--
    console.log("Turn from "+directions[prevDirection]+" to "+directions[this.direction]+" direction")
  },
  turnRight : function () {
    prevDirection=this.direction
    this.direction++
    if(this.direction==directions.length){
      this.direction=0
    }
    console.log("Turn from "+directions[prevDirection]+" to "+directions[this.direction]+" direction")
  },
  moveForward : function () {
    prevX=this.x
    prevY=this.y
    switch (directions[this.direction]) {
      case "N":
        this.y--
        break;
      case "E":
        this.x++
        break;
      case "S":
        this.y++
        break;
      case "W":
        this.x--
        break;
      default:
        console.log("invalid direction")
        break;
    }
    console.log("Move from ["+prevX+","+prevY+"] to ["+this.x+","+this.y+"] position")
  }
}
// ======================
function turnLeft(rover){
  //console.log("turnLeft was called!");
  rover.turnLeft()
}

function turnRight(rover){
  //console.log("turnRight was called!");
  rover.turnRight()
}

function moveForward(rover){
  //console.log("moveForward was called")
  rover.moveForward(rover)
}

//test
turnLeft(rover)
turnLeft(rover)
turnLeft(rover)
turnLeft(rover)
turnRight(rover)
turnRight(rover)
turnRight(rover)
turnRight(rover)
turnRight(rover)
moveForward(rover)
turnRight(rover)
moveForward(rover)