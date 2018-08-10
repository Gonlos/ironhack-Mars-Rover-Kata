//  Para facilitar el cambio de direccion sumando y restando 
//  y la direccion del movimiento cambiando de variable
const directions = ["N","E","S","W"]
const directionsBack = ["S", "W", "N", "E"];
// Map Object
// obstacles es, en porcentaje, la probabilidad de obstaculo en cada celda
var Map = function ({ size, obstacles } = {}) {
  this.size = (size)?size:10
  this.obstacles = (obstacles)?obstacles:0
  this.grid = []
  for (let i = 0; i < this.size; i++) {
    this.grid[i] = []
    for (let j = 0; j < this.size; j++) {
      this.grid[i][j] = (this.obstacles && Math.random() * 100 <= this.obstacles) ? "obstacle" : ""
      console.log(this.obstacles)
    }
  }
  //invertimos el array para que se visualice correctamente en console.table
  this.print = function () {
    let out=[]
    for (let i = 0; i < this.size; i++) {
      out[i]=[]
      for (let j = 0; j < this.size; j++) {
        out[i][j]=this.grid[j][i]
      }
    }
    console.table(out)
  }
  this.getCell = function(cell) {
    return this.grid[cell[0]][cell[1]];
  }
  this.moveCell = function(from,to){
    if(this.grid[to[0]][to[1]]==""){
      this.grid[to[0]][to[1]]=this.grid[from[0]][from[1]]
      this.grid[from[0]][from[1]]=""
      return true
    }else{
      return false
    }
  }
  this.land = function (name,position){
    if(this.getCell([position[0],position[1]])==""){
      this.grid[position[0]][position[1]]=name
      return true
      this.print()
    }else{
      return false
    }
  }
}
// Rover Object Goes Here
// ======================
var Rover = function (name,map){
  this.name = name
  this.direction = 0
  this.x = 0
  this.y = 0
  this.landed = map.land(this.name,[0,0])
  this.travelLog = []
  this.turnLeft = function (right = false) {
    if(!this.landed){console.log(this.name+" -> ERROR!! Not landed" );return;}
    prevDirection=this.direction
    if(right){
      this.direction++
      if(this.direction==directions.length){
        this.direction=0
      }
    }else{
      if(this.direction==0){
        this.direction=directions.length
      }
      this.direction--
    }
    console.log(this.name+" -> turn from "+directions[prevDirection]+" to "+directions[this.direction]+" direction")
  }
  this.turnRight = function () {
    // No se reducia mucho codigo pero por seguir la misma idea de moveForwar y moveBackward
    this.turnLeft(true)
  }
  this.moveForward = function (backward = false) {
    if(!this.landed){console.log(this.name+" -> ERROR!! Not landed" );return;}
    prevX=this.x
    prevY=this.y
    moveDirection=(backward)?directionsBack[this.direction]:directions[this.direction]
    switch (moveDirection) {
      case "N":
        if(this.y==0){
          console.log(this.name+" -> WARNIN!! North limit")
          return
        }else{
          this.y--
        }
        break;
      case "E":
        if(this.x==9){
          console.log(this.name+" -> WARNIN!! East limit")
          return
        }else{
          this.x++
        }
        break;
      case "S":
        if(this.y==9){
          console.log(this.name+" -> WARNIN!! South limit")
          return
        }else{
          this.y++
        }
        break;
      case "W":
        if(this.x==0){
          console.log(this.name+" -> WARNIN!! West limit")
          return
        }else{
          this.x--
        }
        break;
      default:
        console.log(this.name+" -> invalid direction")
        break;
    }
    if (map.getCell([this.x, this.y]) == "" && map.moveCell([prevX, prevY], [this.x, this.y])) {
      this.travelLog.push([prevX,prevY])
      console.log(this.name+" -> move from ["+prevX+","+prevY+"] to ["+this.x+","+this.y+"] position")
      map.print()
    }else{
      // Cuando se encuentra un obstaculo o un rover el ejercicio indica que paremos al rover
      // mola mas que muestre un error y siga con el resto de movimientos XD
      console.log(this.name + " -> ERROR!! " + map.getCell([
            this.x,
            this.y
          ]) + " in position " + this.x + "," + this.y);
      this.x = prevX;
      this.y = prevY;
    }
  }
  this.moveBackward = function (){
    // Indicamos a moveForward que use la variable directionsBack
    // y reducimos moveBackward y moveFordward a una funcion
    this.moveForward(true)
  }
  this.listCommand = function (list) {
    if(!this.landed){console.log(this.name+" -> ERROR!! Not landed" );return;}
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
    console.log(this.name+" -> travel log: ["+this.travelLog.join("], [")+"]")
  }
}
// ======================
var map = new Map({obstacles:10})
var rover1 = new Rover("Rover1",map)

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
turnLeft(rover1)
turnLeft(rover1)
turnLeft(rover1)
turnLeft(rover1)
turnRight(rover1)
turnRight(rover1)
turnRight(rover1)
turnRight(rover1)
turnRight(rover1)
moveForward(rover1)
turnRight(rover1)
moveForward(rover1)
listCommand(rover1,"rffrfflfrffzzbb")
map.print()
console.log(map.getCell([0,1]))
console.log(map.moveCell([0,1],[0,2]))
rover2 = new Rover("Rover2",map)
map.print()
listCommand(rover2,"rfffrfflffrffzzbb")