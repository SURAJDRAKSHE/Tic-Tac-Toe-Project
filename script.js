
  const board = document.getElementById('board');
  const cells = [];
  const resultScreen = document.getElementById('result-screen');
  const resultMessage = document.getElementById('result-message');

  // Create cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    cells.push(cell);
    board.appendChild(cell);
  }

  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameBoard[index] === '' && gameActive) {
      gameBoard[index] = currentPlayer;
      cells[index].textContent = currentPlayer;
      checkWinner();
      togglePlayer();
    }
  }

  function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        gameActive = false;
        highlightWinnerCells(combination);
        displayResult(`${currentPlayer} wins!`);
        break;
      }
    }

    if (!gameBoard.includes('') && gameActive) {
      gameActive = false;
      displayResult("It's a draw!");
    }
  }

  function highlightWinnerCells(combination) {
    combination.forEach(index => cells[index].style.backgroundColor = '#8eff8e');
  }

  function displayResult(message) {
    resultMessage.textContent = message;
    resultScreen.style.display = 'flex';
  }

  function startNewGame() {
    resultScreen.style.display = 'none';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
      cell.textContent = '';
      cell.style.backgroundColor = '';
    });
  }