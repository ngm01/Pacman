function generateMaze(){
    let maze = [];
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
    maze = buildInnerWalls(maze);
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

function buildInnerWalls(currentMaze){
    // how many walls?
    // to begin the experiment, let's build five.
    for(let w=0;w<5;w++){
        buildWall(currentMaze);
    }
    return currentMaze;
}

function buildWall(currentMaze){
    //pick a direction:
    const mazeSize = currentMaze.length - 2;
    const direction = randomizer(2);
    const initialSquare = [randomizer(mazeSize) + 1, randomizer(mazeSize) + 1];
    console.log("inital square", initialSquare)
    maxDistanceFirst = randomizer(mazeSize);
    let pivotPoint = [];
    if(direction==1){
        pivotPoint = verticalBlock(currentMaze, initialSquare);
    }
    else{
        pivotPoint = horizontalBlock(currentMaze, initialSquare);
    }

    //then turn:
    const turn = Math.floor(Math.random() * 2);
    maxDistanceNext = randomizer(mazeSize);
    if(turn==1){
        console.log("Turning...")
        if(direction==1){
            horizontalBlock(currentMaze, pivotPoint);
        }
        else{
            verticalBlock(currentMaze, pivotPoint);
        }
    }
}

function verticalBlock(currentMaze, startAt){
    console.log("vertical:", startAt);
    if(currentMaze[startAt[0] + 1][startAt[1]] != 2){
        currentMaze[startAt[0][startAt[1]]] = 2;
        startAt[0]++;
        verticalBlock(currentMaze, startAt);
    }
    else{
        return startAt;
    }
}

function horizontalBlock(currentMaze, startAt){
    console.log("horizontal:", startAt);
    if(currentMaze[startAt[0]][startAt[1] + 1] != 2){
        currentMaze[startAt[0][startAt[1]]] = 2;
        startAt[1]++;
        horizontalBlock(currentMaze, startAt);
    }
    else{
        return startAt;
    }
}

function randomizer(max){
    return Math.floor(Math.random() * max)
}

console.log(generateMaze());
