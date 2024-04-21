let board;
let background;
let turn = 1;
let scoreboardBlack;
let scoreboardWhite;
let gameOver = false;

// variables for the piece colors
let blackDisk = 'black';
let whiteDisk = 'white';

// the game board defined as a 2D array
let initialDisks = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
]

window.onload = function() {
    scoreboardBlack = document.getElementById('scoreBlack');
    scoreboardWhite = document.getElementById('scoreWhite');
    board = document.getElementById('board');
    background = document.getElementById('background');

    drawCells();
    drawDisks();
}

// draws the game board
function drawCells() {
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            let cell = document.createElement('div');
            cell.setAttribute('class', 'cell');
            cell.style.left = 390 + (60 * column) + "px";
            cell.style.top = (60 * row) + "px";
            cell.setAttribute("onclick", "handleClick("+row+", "+column+")");

            board.appendChild(cell);
        }
    }
}

// deals with what happens when players click on the board
function handleClick(row, column) {
    if (gameOver) {
        return;
    }

    if (initialDisks[row][column] != 0) {
        return;
    }
    
    if (availableMove(turn, row, column) == true) {
        let changedDisks = toChangeDisks(turn, row, column);
        flippedDisks(changedDisks);

        initialDisks[row][column] = turn;
        if (turn == 1 && move(2)) {
            turn = 2;
        } else if (turn == 2 && move(1)) {
            turn = 1;
        }

        if (move(1) == false && move(2) == false) {
            alert("Game Over");
            gameOver = true;
        }
        drawDisks();
        changeScore();
    }        
}

// makes sure players can only make valid moves
function move(rep) {
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            if (availableMove(rep, row, column)) {
                return true;
            }
        }
    }
    return false;
}

// counts how many black and white disks are on the board
function changeScore() {
    let blackScore = 0;
    let whiteScore = 0;

    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            let cellValue = initialDisks[row][column];
            if (cellValue == 1) {
                blackScore +=1;
            } else if (cellValue ==2) {
                whiteScore += 1;
            }
        }
    }
    scoreboardBlack.innerHTML = "Black: " + blackScore;
    scoreboardWhite.innerHTML = "White: " + whiteScore;
}

// restarts the game
function restartGame() {
    

    drawDisks();
    changeScore();
}

//
function availableMove(rep, row, column) {
    let changedDisks = toChangeDisks(rep,row, column);
    if(changedDisks.length == 0) {
        return false;
    } else {
        return true;
    }
}

// adds the disks that could be flipped when the opponent plays into a list
function toChangeDisks(rep, row, column) {
    let changedDisks = [];

    //flips disks above where the player clicks
    let possiblyAffectedUp = [];
    let rowMovement = row;
    while (rowMovement > 0) {
        rowMovement -= 1;
        let placeValue = initialDisks[rowMovement][column];
        if (placeValue == 0 || placeValue == rep) {
            if (placeValue == rep) {
                changedDisks = changedDisks.concat(possiblyAffectedUp);
            }
            break;
        } else {
            let diskPosition = {row:rowMovement, column:column};
            possiblyAffectedUp.push(diskPosition);
        }
    }
    
    //flips disks below where the player clicks
    let possiblyAffectedDown = [];
    let rowMovement2 = row;
    while (rowMovement2 < 7) {
        rowMovement2 += 1;
        let placeValue = initialDisks[rowMovement2][column];
        if (placeValue == 0 || placeValue == rep) {
            if (placeValue == rep) {
                changedDisks = changedDisks.concat(possiblyAffectedDown);
            }
            break;
        } else {
            let diskPosition = {row:rowMovement2, column:column};
            possiblyAffectedDown.push(diskPosition);
        }
    }

    //flips disks on the right of where the player clicks
    let possiblyAffectedRight = [];
    let columnMovement = column;
    while (columnMovement < 7) {
        columnMovement += 1;
        let placeValue = initialDisks[row][columnMovement];
        if (placeValue == 0 || placeValue == rep) {
            if (placeValue == rep) {
                changedDisks = changedDisks.concat(possiblyAffectedRight);
            }
            break;
        } else {
            let diskPosition = {row:row, column:columnMovement};
            possiblyAffectedRight.push(diskPosition);
        }
    }

    //flips disks on the left of where the player clicks
    let possiblyAffectedLeft = [];
    let columnMovement2 = column;
    while (columnMovement2 > 0) {
        columnMovement2 -= 1;
        let placeValue = initialDisks[row][columnMovement2];
        if (placeValue == 0 || placeValue == rep) {
            if (placeValue == rep) {
                changedDisks = changedDisks.concat(possiblyAffectedLeft);
            }
            break;
        } else {
            let diskPosition = {row:row, column:columnMovement2};
            possiblyAffectedLeft.push(diskPosition);
        }
    }

    //flips disks on the top right of where the player clicks
    let possiblyAffectedUpRight = [];
    let rowMovement3 = row;
    let columnMovement3 = column;
    while (rowMovement3 > 0 && columnMovement3 < 7) {
        rowMovement3 -= 1;
        columnMovement3 += 1;
        let placeValue = initialDisks[rowMovement3][columnMovement3];
        if (placeValue == 0 || placeValue == rep) {
            if (placeValue == rep) {
                changedDisks = changedDisks.concat(possiblyAffectedUpRight);
            }
            break;
        } else {
            let diskPosition = {row:rowMovement3, column:columnMovement3};
            possiblyAffectedUpRight.push(diskPosition);
        }
    }

    //flips disks on the top left of where the player clicks
    let possiblyAffectedUpLeft = [];
    let rowMovement4 = row;
    let columnMovement4 = column;
    while (rowMovement4 > 0 && columnMovement4 > 0) {
        rowMovement4 -= 1;
        columnMovement4 -= 1;
        let placeValue = initialDisks[rowMovement4][columnMovement4];
        if (placeValue == 0 || placeValue == rep) {
            if (placeValue == rep) {
                changedDisks = changedDisks.concat(possiblyAffectedUpLeft);
            }
            break;
        } else {
            let diskPosition = {row:rowMovement4, column:columnMovement4};
            possiblyAffectedUpLeft.push(diskPosition);
        }
    }

    //flips disks on the bottom right of where the player clicks
    let possiblyAffectedDownRight = [];
    let rowMovement5 = row;
    let columnMovement5 = column;
    while (rowMovement5 < 7 && columnMovement5 < 7) {
        rowMovement5 += 1;
        columnMovement5 += 1;
        let placeValue = initialDisks[rowMovement5][columnMovement5];
        if (placeValue == 0 || placeValue == rep) {
            if (placeValue == rep) {
                changedDisks = changedDisks.concat(possiblyAffectedDownRight);
            }
            break;
        } else {
            let diskPosition = {row:rowMovement5, column:columnMovement5};
            possiblyAffectedDownRight.push(diskPosition);
        }
    }

    //flips disks on the bottom left of where the player clicks
    let possiblyAffectedDownLeft = [];
    let rowMovement6 = row;
    let columnMovement6 = column;
    while (rowMovement6 < 7 && columnMovement6 > 0) {
        rowMovement6 += 1;
        columnMovement6 -= 1;
        let placeValue = initialDisks[rowMovement6][columnMovement6];
        if (placeValue == 0 || placeValue == rep) {
            if (placeValue == rep) {
                changedDisks = changedDisks.concat(possiblyAffectedDownLeft);
            }
            break;
        } else {
            let diskPosition = {row:rowMovement6, column:columnMovement6};
            possiblyAffectedDownLeft.push(diskPosition);
        }
    }

    return changedDisks;
}

// flips all the disks that could be affected when the opponent plays
function flippedDisks(changedDisks) {
    for (let i = 0; i< changedDisks.length; i++) {
        let place = changedDisks[i];
        if (initialDisks[place.row][place.column] == 1) {
            initialDisks[place.row][place.column] = 2;
        } else {
            initialDisks[place.row][place.column] = 1;
        }
    }
}


// draws the game pieces
function drawDisks() {
    background.innerHTML = "";
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            let cellValue = initialDisks[row][column];
            if (cellValue == 0) {

            } else {
                let disk = document.createElement('div');
                disk.setAttribute('class', 'disk');
                disk.style.left = 390 + ((60 * column) + 3) + "px";
                disk.style.top = (60 * row) + 3 + "px";

                if (cellValue == 1) {
                    disk.style.backgroundColor = "black";
                    disk.style.cursor = 'not-allowed';
                }
                if (cellValue == 2) {
                    disk.style.backgroundColor = "white";
                    disk.style.cursor = 'not-allowed';
                }

                background.appendChild(disk);
            }
        }
    }
}


// hides and shows the rules of the game
function hideRules() {
    let hide = document.getElementById('gameRules');
    if (hide.style.display === "none") {
        hide.style.display = "block";
    } else {
        hide.style.display = "none";
    }
}