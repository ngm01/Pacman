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
                    newRow.push(wallOrCoin(maze, newRow, i, k));
                }
            }
            maze.push(newRow);
        }
    }
    maze[1][1] = 0;
    return maze;
}

function outerWall(){
    var row = []
    for(let i=0;i<10;i++){
        row.push(2);
    }
    return row;
}

function wallOrCoin(currentMaze, currentRow, i, k, prev){
    let result = 1;
    if(currentMaze[i - 1][k]==2){
        result += Math.floor(Math.random() * 2);
    }
    if(currentRow[k - 1]==2){
        result += Math.floor(Math.random() * 2);
    }
    return result;
}

console.log(generateMaze());
