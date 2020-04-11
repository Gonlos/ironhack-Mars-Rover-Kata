const directions=["N","E","S","W"];
const directionsClass=["north","est","south","west"]
const directionsBack=["S","W","N","E"];
var arrow=["<","v",">","^"]//para verlo bien con console.table
//arrow=["^",">","V","<"]
var grid=[]
for(var i=0;i<10;i++){
  grid[i]=[]
  for(var j=0;j<10;j++){
    grid[i][j]=(Math.random()*100<15&&(i!=0||j!=0))?null:"";
  }
}
$grid=document.getElementById("grid")
console.log($grid.getElementsByTagName("tr"))
function updateGrid(grid1=grid){
  //-dibujadndo el mapa
  console.log("dibujando")
  //console.log($grid)
  $rows=$grid.getElementsByTagName("tr")
  //console.log($rows)
  for (let i = 0; i < $rows.length; i++) {
    const $row = $rows[i].cells;
  //console.log($row.length)
    for (let j = 0; j < $row.length; j++) {
      //console.log(i,j)
      $rows[j].cells[i].innerHTML=(grid1[i][j]==null)?"<span class=\"obstacle\" />":grid1[i][j]
      //console.log($row)
    }
  }
  //confirm()
 // setTimeout(updateGrid(grid),20000)
}

console.table(grid)
updateGrid()
// Rover Object Goes Here
// ======================
var rover1 =function (name) {
  this.$rover=document.createElement("img")
  this.$rover.classList.add("rover","est")
  this.$rover.style.transform="rotate(0deg)"
  $grid.getElementsByTagName("tr")[0].cells[0].appendChild(this.$rover)
  console.log(this.$rover) 
  this.landed=false
  this.x= 0
  this.y= 0
  this.direction= 0
  this.rotate=0
  //Si el lugar de aterrizaje del rover esta ocupado aterriz en el siguiente libre
  gridMap:
  for(var i=0;i<grid.length;i++){
    for(var j=0;j<grid[i].length;j++){
      if(grid[i][j]==""){
        grid[i][j]=arrow[this.direction]+" "+name
        this.landed=true
        this.x=i
        this.y=j
        break gridMap;
      }
    }
  }
  if(!this.landed){
    console.log("ERROR!! Rover "+name+" has not been able to land")
  }else{
    console.log("Rover "+name+" landed in "+this.x+","+this.y)
    //updateGrid()
  }
  this.name= name
  this.travelLog=[]
  this.turnLeft= function (rigth=false) {
    prevDirection=this.direction
    if(rigth){
      this.direction++
      this.rotate=this.rotate+90
    }else{
      this.direction--
      this.rotate=this.rotate-90
    }
    if(this.direction<0){
      this.direction=directions.length -1
    }
    if(this.direction>=directions.length){
      this.direction=0;
    }
    grid[this.x][this.y]=arrow[this.direction]+" "+this.name
    console.log(this.name+" - Turn from "+directions[prevDirection]+" to "+directions[this.direction]);
    //$rover.classList.remove(directionsClass[prevDirection])
    this.$rover.style.transform="rotate("+this.rotate+"deg)"
    //$rover.classList.add(directionsClass[this.direction])
    console.log(this.$rover.style.transform)
    //turexit
    //updateGrid()
    }
  this.turnRight=function () {
    this.turnLeft(true)
  }
  this.moveForward=function (backward=false) {
    if(backward){
      if(this.direction<2){
        moveDirection=this.direction+2
      }else{
        moveDirection=this.direction-2
      }
    }else{
      moveDirection=this.direction
    }
    error=""
    prevX=this.x
    prevY=this.y
    switch (directions[moveDirection]) {
      case "N":
        if(this.y>0){
          this.y--;
        }else{
          error="ERROR!! North limit"
        }
        break;
      case "E":
        if(this.x<9){
          this.x++;
        }else{
          error="ERROR!! East limit"
        }
        break;
      case "S":
        if(this.y<9){
          this.y++;
        }else{
          error="ERROR!! South limit"
        }
        break;
      case "W":
        if(this.x>0){
          this.x--;
        }else{
          error="ERROR!! West limit"
        }
        break;
      default:
        console.log(this.name+" - Invalid direction");
        break;
    }
    if(error=="")
    {
      nextPosition=grid[this.x][this.y]
      if(nextPosition!=""){
        if(nextPosition=="null"){
          error="ERROR!! Obstacle in position "+this.x+","+this.y
        }else{
          error="ERROR!! Rover "+nextPosition+" in position "+this.x+","+this.y
        }
      }
    }
    if(error==""){
      this.travelLog.push([prevX,prevY])
      console.log(this.name+" - Direction: "+directions[this.direction]+". Move from ["+prevX+","+prevY+"] to ["+this.x+","+this.y+"]");
      console.table(this.travelLog)
      grid[prevX][prevY]=""
      grid[this.x][this.y]=arrow[this.direction]+" "+this.name
      $celda=$grid.getElementsByTagName("tr")[this.y].cells[this.x]
      $celdaAnterior=$grid.getElementsByTagName("tr")[prevY].cells[prevX]
      console.table(grid)
      this.$rover.style.transform="translate("+$celda.offsetLeft-$celdaAnterior.offsetLeft+"px, "+$celda.offsetTop-$celdaAnterior.offsetTop+"px)"
      $celda.appendChild(this.$rover)
      console.log($grid.getElementsByTagName("tr")[this.y].cells[this.x].offsetLeft)
      //updateGrid()
    }else{
      console.log(this.name+" - "+error)
      console.table(grid)
      this.x=prevX
      this.y=prevY
    }
  }
  this.moveBackward=function () {
    this.moveForward(true)
  }
  this.listCommand=function (list) {
    for(i=0;i<list.length;i++){
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
          console.log(this.name+" - invalid Command")
          break;
      }
    }
  }
}
// ======================
function turnLeft(rover){
  console.log("turnLeft was called!");
  rover.turnLeft();
}

function turnRight(rover){
  console.log("turnRight was called!");
  rover.turnRight();
}

function moveForward(rover){
  console.log("moveForward was called")
  rover.moveForward();
}
function moveBackward(rover){
  console.log("moveBackward was called")
  rover.moveBackward();
}
function listCommand(rover,list){
  console.log("lisCommand was called")
  rover.listCommand(list)
}
var rover1=new rover1("one")
var rover2=new rover1("two")
console.log(rover1)
console.log(rover2)
turnLeft(rover1);
moveForward(rover1);
turnRight(rover2);
moveForward(rover2);
listCommand(rover2,"rffrfflfrffzzbb")
listCommand(rover1,"rffrfflfrffzzbb")