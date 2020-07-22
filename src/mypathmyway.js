function removeFromArray(arr,node){
    for(let i=arr.length-1;i>0;i--){
        if(arr[i]===node){
            return arr.splice(i,l);
        }
    }
}

function heuristic(a,b){
    var d = dist(a.x,a.y,a.x,b.y);
    return d;
}

function search(arr,elmt){
    for(let i=arr.length-1;i>0;i--){
        if(arr[i]===elmt){
            return i;
        }
    }
    return -1;
}

this.openSides=function(grid,noderq){
    var neighbours=[];
    var i = noderq.x;
    var j = noderq.y;
    
    if(i>0){
        neighbours.push(grid[i-1][j]); //left

        if(j>0) {neighbours.push(grid[i-1,j-1]);} //LD
        if(j+1<rows) {neighbours.push(grid[i-1,j+1]);} //LU
    }
    if(i<colms-1){
        neighbours.push(grid[i+1][j]); //right
        
        if(i>0) {neighbours.push(grid[i+1,j+1]);} //RD
        if(j+1<rows) {neighbours.push(grid[i+1,j-1]);} //RU
    }
    if(j>0){
        neighbours.push(grid[i][j-1]); //down
    }
    if(j<rows-1){
        neighbours.push(grid[i][j+1]);//top        
    }
    //if diagonals allowed
    return neighbours;
    

}
var rows = 5;
var colms = 5;
var grid = new Array(colms);
var openSet=[ ];
var closedSet=[];
var path=[];//return path

var start;
var end;
var w,h;

const newLocal = this;
function Node(x,y){
    this.x=x;
    this.y=y;
    this.g= 2*(rows + colms);//maximum theoritical value
    this.h=0;
    this.f=this.g+this.h;

    this.parent=null;//helps in retracing path 

    newLocal.neighbours=[];    
    this.show= function(color) {
        fill(color);
        strokeWeight(1);
        stroke(255,0,0);
        rect(this.x*w, this.y*h, w-5, h-5,19);
    }
    


}

function setup(){
    createCanvas(400,400);
    console.log('My path my way A*');

    w=width/colms;
    h=height/rows;

    // Making a 2D array and node
    for(let i=0;i< colms; i++){
        
        grid[i]=new Array(rows);

        for(let j=0;j< rows; j++){
            grid[i][j]=new Node(i,j);
        }
    }

    // you can change the start position here :)
    start = grid[0][0];
    end = grid[colms-1][rows-1];

    openSet.push(start);
    start.g=0;
    start.h=heuristic(start,end);
    start.f=start.h

    console.log(grid);}

function draw(){

    
    if(openSet.length>0){
        //keep going with evaluating

        var Lnode=new Node(0,0);
        var i;
        for(i=0;i<openSet.length;i++)
        {
            if(openSet[i].f<Lnode.f){

                Lnode=openSet[i];//least f value node is selected
            }

        }                
                //found the end point
                if(Lnode.x===end.x && Lnode.y===end.y){

                    print("End node found");
                    print("constructPath(${Lnode})");
                    
                    while(Lnode.parent){
                        
                        path.push(Lnode);
                        Lnode=Lnode.parent;

                    }
                    return path.reverse();// end of execution
                }

                //normal case
                else{

                    removeFromArray(openSet,Lnode);
                    closedSet.push(Lnode);
                    
                    var neighSet=openSides(grid,Lnode);
                    gval=Lnode.g+1;
                    for(let i=0;i<neighSet.length;i++){
                        if(search(closedSet,neighSet[i])<0){//not present in closed set
                            
                            var gprev=neighSet[i].g;
                            if(gprev>gval){
                                neighSet[i].g=gval;
                                neighSet[i].parent=Lnode;
                            }

                        }
                        
                    }
                    // and add neighbours to open set
                    Lnode.openSides(grid);
                    
                    
                }
        
    }


    else{

        //No solution is possible
        console.log('THe solution does not exist');
    }

    background(200);//setting up background color

    for(let i=0;i<colms;i++){
        for(let j=0;j< rows; j++){
            grid[i][j].show(color(153,204,255));//blue
        }
    }

    for (let i=0;i< closedSet.length;i++ ){
        closedSet[i].show(color(255,51,51))//green
    }
    
    for (let i=0;i< openSet.length;i++ ){
        openSet[i].show(color(255,178,102))
    }
    for (let i=0;i< path.length;i++){
        path[i].show(color(0));
    } 
    console.log(grid);       

}
