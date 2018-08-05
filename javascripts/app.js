const directions = ["N","E","S","W"]
const directionsBack = ["S", "W", "N", "E"];
// Rover Object Goes Here
// ======================
var rover = {
  direction : 0,
  x : 0,
  y : 0,
  travelLog: [],
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
  moveForward: function (backward = false) {
    prevX=this.x
    prevY=this.y
    moveDirection=(backward)?directionsBack[this.direction]:directions[this.direction]
    switch (moveDirection) {
      case "N":
        if(this.y==0){
          console.log("WARNIN!! North limit")
          return
        }else{
          this.y--
        }
        break;
      case "E":
        if(this.x==9){
          console.log("WARNIN!! East limit")
          return
        }else{
          this.x++
        }
        break;
      case "S":
        if(this.y==9){
          console.log("WARNIN!! South limit")
          return
        }else{
          this.y++
        }
        break;
      case "W":
        if(this.x==0){
          console.log("WARNIN!! West limit")
          return
        }else{
          this.x--
        }
        break;
      default:
        console.log("invalid direction")
        break;
    }
    this.travelLog.push([prevX,prevY])
    console.log("Move from ["+prevX+","+prevY+"] to ["+this.x+","+this.y+"] position")
  },
  moveBackward: function (){
    this.moveForward(true)
  },
  listCommand: function (list) {
    for (i = 0; i < list.length; i++) {
      switch (list[i]) {
        case "r":
          this.turnRight()
          break;
        case "l":
          this.turnLeft()
          break;
          case "f":
          this.moveForward()
          break;
        case "b":
          this.moveBackward()
          break;
        default:
          console.log(list[i]+" is a invalid Command")
          break;
      }
    }
    console.log("Travel log: ["+this.travelLog.join("], [")+"]")
  }
}
// ======================
function turnLeft(rover){
  rover.turnLeft()
}

function turnRight(rover){
  rover.turnRight()
}

function moveForward(rover){
  rover.moveForward()
}

function listCommand(rover, list) {
  console.log("List command")
  rover.listCommand(list)
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
listCommand(rover,"rffrfflfrffzzbb")