function generateMaze(){
    var maze = [];
    for(let i=0;i<10;i++){
        if(i==0 || i==9){
            maze.push(outerWall());
        }
        else{
            let newRow = [];
            for(let k=0;k<10;k++){
                if(k==0 || k==9){
                    newRow.push(2);
                }
                else{
                    newRow.push(1);
                }
            }
            maze.push(newRow);
        }
    }
    return maze;
}

function outerWall(){
    var row = []
    for(let i=0;i<10;i++){
        row.push(2);
    }
    return row;
}

console.log(generateMaze());
