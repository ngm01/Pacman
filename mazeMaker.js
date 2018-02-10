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
        console.log("Building wall number:", w + 1);
        buildWall(currentMaze);
        mazeLogger(currentMaze);
    }
    return currentMaze;

    function buildWall(currentMaze){
        //pick a direction:
        const mazeSize = currentMaze.length - 2;
        const direction = randomizer(2);
        const initialSquare = [randomizer(mazeSize) + 1, randomizer(mazeSize) + 1];
        let maxDistanceFirst = randomizer(mazeSize);
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
        return currentMaze;
    
        function verticalBlock(currentMaze, startAt){
            if(currentMaze[startAt[0] + 1][startAt[1]] == 2){
                return startAt;
            }
            else{
                currentMaze[startAt[0][startAt[1]]] = 2;
                startAt[0]++;
                return verticalBlock(currentMaze, startAt);
            }
        }
        
        function horizontalBlock(currentMaze, startAt){
            if(currentMaze[startAt[0]][startAt[1] + 1] == 2){
                return startAt;
            }
            else{
                currentMaze[startAt[0][startAt[1]]] = 2;
                startAt[1]++;
                return horizontalBlock(currentMaze, startAt);
            }
        }
    
    }
}


function randomizer(max){
    return Math.floor(Math.random() * max)
}

function mazeLogger(someMaze){
    for(let r=0;r<someMaze.length;r++){
        console.log(someMaze[r]);
    }
}

let myMaze = generateMaze();
console.log("\nFinal result:\n")
mazeLogger(myMaze);
