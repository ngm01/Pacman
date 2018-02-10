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
        currentMaze = buildWall(currentMaze);
    }
    return currentMaze;

    function buildWall(currentMaze){
        //pick a direction:
        const mazeSize = currentMaze.length - 2;
        const direction = randomizer(2);
        const initialSquare = [randomizer(mazeSize) + 1, randomizer(mazeSize) + 1];
        let maxDistanceFirst = randomizer(mazeSize);
        let pivotPoint = [];
        let buildResult = {};
        if(direction==1){
            buildResult = verticalBlock(currentMaze, initialSquare, maxDistanceFirst);
        }
        else{
            buildResult = horizontalBlock(currentMaze, initialSquare, maxDistanceFirst);
        }
        pivotPoint = buildResult.startAt;
        currentMaze = buildResult.currentMaze;
    
        //then turn:
        const turn = Math.floor(Math.random() * 2);
        maxDistanceNext = randomizer(mazeSize);
        if(turn==1){
            console.log("Turning...")
            if(direction==1){
                currentMaze = horizontalBlock(currentMaze, pivotPoint, maxDistanceNext).currentMaze;
            }
            else{
                currentMaze = verticalBlock(currentMaze, pivotPoint, maxDistanceNext).currentMaze;
            }
        }
        return currentMaze;

        function horizontalBlock(currentMaze, startAt, distanceToTravel){
            console.log("Horizontal wall...");
            console.log('Start at:', startAt);
            console.log("Distance to travel:", distanceToTravel);
            for(let i=0;i<distanceToTravel;i++){
                if(currentMaze[startAt[0]][startAt[1] + 1] != 2){
                    console.log("Starting square:", currentMaze[startAt[0]][startAt[1]])
                    currentMaze[startAt[0]][startAt[1]] = 2;
                    mazeLogger(currentMaze);
                    startAt[1]++;
                }
                else{
                    return {startAt: startAt, currentMaze: currentMaze};
                }
            }
            return {startAt: startAt, currentMaze: currentMaze};;
        }

        function verticalBlock(currentMaze, startAt, distanceToTravel){
            console.log("Vertical wall...");
            console.log('Start at:', startAt);
            console.log("Distance to travel:", distanceToTravel);
            for(let i=0;i<distanceToTravel;i++){
                if(currentMaze[startAt[0] + 1][startAt[1]] != 2){
                    console.log("Starting square:", currentMaze[startAt[0]][startAt[1]])
                    currentMaze[startAt[0]][startAt[1]] = 2;
                    mazeLogger(currentMaze);
                    startAt[0]++;
                }
                else{
                    return {startAt: startAt, currentMaze: currentMaze};;
                }
            }
            return {startAt: startAt, currentMaze: currentMaze};;
        }
    }
}


function randomizer(max){
    return Math.floor(Math.random() * max)
}

function mazeLogger(someMaze){
    console.log("\n");
    for(let r=0;r<someMaze.length;r++){
        console.log(someMaze[r]);
    }
    console.log("\n");
}

let myMaze = generateMaze();
console.log("\nFinal result:\n")
mazeLogger(myMaze);
