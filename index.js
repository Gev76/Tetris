const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElement = document.getElementById('score');
let levelElement = document.getElementById('level');

const ROW = 20;
const COL = 10;
const SQ = 40;
const VACANT = "white";

function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

    ctx.strokeStyle = 'black';
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

let board = [];
for (let r = 0; r < ROW; r++) {
    board[r] = [];
    for (let c = 0; c < COL; c++) {
        board[r][c] = VACANT;
    }
}
function drawBoard() {
    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c])
        }
    }

}

drawBoard();

let nextBoard = document.getElementById("tetromino");
let conteqst = nextBoard.getContext("2d");

function drawSquareforNext(k, z, color) {
    conteqst.fillStyle = color;
    conteqst.fillRect(k * SQ, z * SQ, SQ, SQ);

    conteqst.strokeStyle = 'black';
    conteqst.strokeRect(k * SQ, z * SQ, SQ, SQ);
}

let boardForNext = [];
for (let r = 0; r < 3; r++) {
    boardForNext[r] = [];
    for (let c = 0; c < 4; c++) {
        boardForNext[r][c] = VACANT;
    }
}
function drawBoardForNext() {
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 4; c++) {
            drawSquareforNext(c, r, boardForNext[r][c]);
        }
    }

}

drawBoardForNext();

const I = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ]
];

const J = [
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ]
];

const L = [
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ]
];

const O = [
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ]
];

const S = [
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
    ],
    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
];

const T = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
];

const Z = [
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]
    ]
]

let score = 0;
let level = 1;

function randomPiece() {
    let r = Math.floor(Math.random() * PIECES.length);
    let d = Math.floor(Math.random() * PIECES.length);
    let newTetromino = new Piece(PIECES[r][0], PIECES[d][1]);
    return newTetromino
}

function nextPiece() {
    let r = Math.floor(Math.random() * PIECES.length);
    let d = Math.floor(Math.random() * PIECES.length);
    let nextTetromino = new Piece(PIECES[r][0], PIECES[d][1]);
    nextTetromino.fillNext();
    return nextTetromino;
}

Piece.prototype.fillNext = function (color) {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino.length; c++) {
            if (this.activeTetromino[r][c]) {
                drawSquareforNext(c, r, this.color);
            }
        }
    }
};

Piece.prototype.unDrawNext = function () {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino.length; c++) {
            if (this.activeTetromino[r][c]) {
                drawSquareforNext(c, r, VACANT);
            }
        }
    }
};


function Piece(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;

    this.tetrominoN = 0;
    this.activeTetromino = this.tetromino[this.tetrominoN];

    this.x = 3;
    this.y = -2;
    this.k = 0;
    this.z = 0;
}


const PIECES = [
    [Z, 'red'],
    [S, 'yellow'],
    [T, 'green'],
    [O, 'blue'],
    [J, 'purple'],
    [I, "grey"],
    [L, 'orange']
];

let nextRandomPiece = nextPiece();
let p = randomPiece();



Piece.prototype.fill = function (color) {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino.length; c++) {
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
};


Piece.prototype.draw = function () {
    this.fill(this.color);
};

Piece.prototype.unDraw = function () {
    this.fill(VACANT)
};

Piece.prototype.collision = function (x, y, piece) {
    for (let r = 0; r < piece.length; r++) {
        for (let c = 0; c < piece.length; c++) {
            if (!piece[r][c]) {
                continue;
            }

            let newX = this.x + c + x;
            let newY = this.y + r + y;

            if (newX < 0 || newX >= COL || newY >= ROW) {
                return true;
            }

            if (newY < 0) {
                continue;
            }

            if (board[newY][newX] != VACANT) {
                return true;
            }
        }
    }
    return false;
};

Piece.prototype.moveDown = function () {
    if (!this.collision(0, 1, this.activeTetromino)) {
        this.unDraw();
        this.y++;
        this.draw();
    } else {
        this.lock();
        console.log(scoreElement.innerHTML)
        drawBoardForNext()
        p = nextRandomPiece;
        nextRandomPiece = nextPiece();
    }
};

Piece.prototype.moveRight = function () {
    if (!this.collision(1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x++;
        this.draw();
    }
};

Piece.prototype.moveLeft = function () {
    if (!this.collision(-1, 0, this.activeTetromino)) {
        this.unDraw();
        this.x--;
        this.draw();
    }
};

Piece.prototype.rotate = function () {
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    let kick = 0;

    if (this.collision(0, 0, nextPattern)) {
        if (this.x > COL / 2) {
            kick = -1;
            if (this.tetromino.length > 3) {
                kick = -2;
            }
        } else {
            kick = 1;
            if (this.tetromino.length > 3) {
                kick = 2
            }
        }
    }
    if (!this.collision(kick, 0, this.activeTetromino)) {
        this.unDraw();
        this.x += kick;
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
};

Piece.prototype.lock = function () {
    for (let r = 0; r < this.activeTetromino.length; r++) {
        for (let c = 0; c < this.activeTetromino.length; c++) {
            if (!this.activeTetromino[r][c]) {
                continue;
            }

            if (this.y + r < 0) {
                alert("Game Over");
                gameOver = true;
                //break;

            }

            board[this.y + r][this.x + c] = this.color;
        }
    }
    for (let r = 0; r < ROW; r++) {
        let isRowFull = true;
        for (let c = 0; c < COL; c++) {
            isRowFull = isRowFull && (board[r][c] != VACANT)
        }
        if (isRowFull) {
            for (let y = r; y > 1; y--) {
                for (let c = 0; c < COL; c++) {
                    board[y][c] = board[y - 1][c]
                }
            }
            for (let c = 0; c < COL; c++) {
                board[0][c] = VACANT;
            }
            score += 10;
            if (score % 70 == 0) {

                level++;
                levelElement.innerHTML = level;
                time = time - 100;
            }
        }


    }
    drawBoard();

    scoreElement.innerHTML = score;
};


document.addEventListener('keydown', CONTROL);

function CONTROL(event) {
    if (event.keyCode === 37) {
        p.moveLeft();
    } else if (event.keyCode === 38) {
        p.rotate();
    } else if (event.keyCode === 39) {
        p.moveRight();
    } else if (event.keyCode === 40) {
        p.moveDown();
    }
}

let time = 1000;
let dropStart = Date.now();
let gameOver = false;
function drop() {
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > time) {
        p.moveDown();
        dropStart = Date.now()
    }
    if (!gameOver) {
        requestAnimationFrame(drop)
    }
}

drop();

function newGame() {
    board = [];
    for (let r = 0; r < ROW; r++) {
        board[r] = [];
        for (let c = 0; c < COL; c++) {
            board[r][c] = VACANT;
        }
    }
    drawBoard();
    p = randomPiece();
    score = 0;
    scoreElement.innerHTML = score;
    level = 1;
    levelElement.innerHTML = level;
    time = 1000;
    gameOver = false;
    drop();
}
