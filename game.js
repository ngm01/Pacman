	var pacman = {
		x: 1,
		y: 1
	};

	var score = 0;

	//TODO #3: add createWorld() function to randomly generate "world" arrays

	var world = generateMaze(15);

	function displayWorld(){
		var output = '';

		for (var i=0; i<world.length; i++){
			output += "\n<div class='row'>\n";
			for (var j=0; j<world[i].length; j++){
				if (world[i][j] === 2){
					output += "<div class='brick'></div>";
				}
				else if(world[i][j] === 1){
					output += "<div class='coin'></div>";
				}
				else if(world[i][j] === 3){
					output += "<div class='cherries'></div>";
				}
				if (world[i][j] === 0){
					output += "<div class='empty'></div>";
				}
			}
			output += "\n</div>";
		}
	document.getElementById('world').innerHTML = output;
	}

	function displayPacman(){
		document.getElementById('pacman').style.top = pacman.y*20+'px';
		document.getElementById('pacman').style.left = pacman.x*20+'px';
	}

	displayWorld();
	displayPacman();

	document.onkeydown = function(e){
		if (e.keyCode === 37 && world[pacman.y][pacman.x-1] != 2){
			pacman.x--;
			document.getElementById('pacman').style.transform = "rotate(180deg)";
		}
		else if (e.keyCode === 38 && world[pacman.y-1][pacman.x] != 2){
			pacman.y--;
			document.getElementById('pacman').style.transform = "rotate(-90deg)";
		}
		else if (e.keyCode === 39 && world[pacman.y][pacman.x+1] != 2){
			pacman.x++;
			document.getElementById('pacman').style.transform = "rotate(0deg)";
		}
		else if (e.keyCode === 40 && world[pacman.y+1][pacman.x] != 2){
			pacman.y++;
			document.getElementById('pacman').style.transform = "rotate(90deg)";
		}
		if (world[pacman.y][pacman.x] === 1){
			world[pacman.y][pacman.x] = 0;
			score += 1;
			displayWorld();
			displayScore();
		}
		if (world[pacman.y][pacman.x] === 3){
			world[pacman.y][pacman.x] = 0;
			score += 50;
			displayWorld();
			displayScore();
		}
		displayPacman()
	}

	function displayScore(){
		document.getElementById('score').innerHTML = "<p>" + score + "</p>";
	}
    
    displayScore();

    function generateMaze(mazeSize){
        let maze = [];
        for(let i=0;i<mazeSize;i++){
            if(i==0 || i==mazeSize - 1){
                maze.push(outerWall(mazeSize));
            }
            else{
                let newRow = [];
                for(let k=0;k<mazeSize;k++){
                    if(k==0 || k==mazeSize - 1){
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
    
    function outerWall(mazeSize){
        var row = []
        for(let i=0;i<mazeSize;i++){
            row.push(2);
        }
        return row;
    }
    
    function buildInnerWalls(currentMaze){
        // how many walls?
        // to begin the experiment, let's build ten.
        for(let w=0;w<10;w++){
            currentMaze = buildWall(currentMaze);
        }
        return currentMaze;
    
        function buildWall(currentMaze){
            //pick a direction:
            const mazeSize = currentMaze.length - 2;
            const direction = randomizer(2);
            const initialSquare = [randomizer(mazeSize) + 1, randomizer(mazeSize) + 1];
            let maxDistanceFirst = randomizer(mazeSize / 2);
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
            maxDistanceNext = randomizer(mazeSize / 2);
            if(turn==1){
                if(direction==1){
                    currentMaze = horizontalBlock(currentMaze, pivotPoint, maxDistanceNext).currentMaze;
                }
                else{
                    currentMaze = verticalBlock(currentMaze, pivotPoint, maxDistanceNext).currentMaze;
                }
            }
            return currentMaze;
    
            function horizontalBlock(currentMaze, startAt, distanceToTravel){
                for(let i=0;i<distanceToTravel;i++){
                    if(currentMaze[startAt[0]][startAt[1] + 1] != 2){
                        currentMaze[startAt[0]][startAt[1]] = 2;
                        startAt[1]++;
                    }
                    else{
                        return {startAt: startAt, currentMaze: currentMaze};
                    }
                }
                return {startAt: startAt, currentMaze: currentMaze};;
            }
    
            function verticalBlock(currentMaze, startAt, distanceToTravel){
                for(let i=0;i<distanceToTravel;i++){
                    if(currentMaze[startAt[0] + 1][startAt[1]] != 2){
                        currentMaze[startAt[0]][startAt[1]] = 2;
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
    