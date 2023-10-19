const squares = document.querySelectorAll('.square');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
var displayMsg = "";

function handleSquareClick(index) {
    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        squares[index].textContent = currentPlayer;
        checkForWin();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateMessage();  
    }
}

function checkForWin() {
    const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            message.textContent = `Player ${currentPlayer} wins!`;
            displayMsg= `Player ${currentPlayer} wins!`;
            return;
        }
    }

    if (!board.includes('')) {
        gameActive = false;
        message.textContent = "It's a draw!";
        displayMsg = "It's a draw!";
    }
}

function updateMessage() {
    if (gameActive) {
        message.textContent = `Player ${currentPlayer}'s turn`;
    }else{
        message.textContent = displayMsg;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    squares.forEach((square) => {
        square.textContent = '';
        square.removeAttribute('style');
    });
    currentPlayer = 'X';
    gameActive = true;
    updateMessage();
}

squares.forEach((square, index) => {
    square.addEventListener('click', () => handleSquareClick(index));
});

resetButton.addEventListener('click', resetGame);

updateMessage();
