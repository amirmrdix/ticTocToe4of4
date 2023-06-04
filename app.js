// Assign to DOM
const cells = Array.from(document.querySelectorAll('.cell'));
const gameStatus = document.querySelector('.gameStatus');
const gameRestart = document.querySelector('.gameRestart');
const p1 = document.querySelector('.p1');
const p2 = document.querySelector('.p2');
const p3 = document.querySelector('.p3');
const no = document.querySelector('.no');
const yes = document.querySelector('.yes');
const audio = document.querySelector('audio');


let isActive = true
let currentPlayer = 'X';
let gameState = ['','','','','','','','','','','','','','','',''];
let gameConditions = [ 
    [0,1,2,3],
    [4,5,6,7],
    [8,9,10,11],
    [12,13,14,15],
    [0,4,8,12],
    [1,5,9,13],
    [2,6,10,14],
    [3,7,11,15],
    [0,5,10,15],
    [3,6,9,12]
];





// Add Event Listener
cells.forEach(cell => {
    cell.addEventListener('click', cellHandler)
});
gameRestart.addEventListener('click',gameRestartHandler);





// Functions
function cellHandler() {
    const cellIndex = parseInt(this.dataset.id);

    if(!gameState[cellIndex] && isActive){
        gameState[cellIndex] = currentPlayer;
        this.innerText = currentPlayer;
        this.classList.add('selected')
        gameResult()
    }
}




function changePlayer() {
    currentPlayer = currentPlayer === 'X'?  'O' : 'X';
    gameStatus.innerText = `It's ${currentPlayer}'s Turn`;
}














function gameRestartHandler() {
    if(!isActive){
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('selected')
        });
    
        currentPlayer = 'X';
        gameStatus.innerText = `It's ${currentPlayer}'s Turn`;
        gameStatus.style.color = 'black';
        gameStatus.style.fontSize = '1.9rem';
        gameState = ['','','','','','','','','','','','','','','',''];
    
        isActive = true
    }




    else{
        isActive = false
        p1.innerHTML = `The game is not over yet but Player '${currentPlayer}' wants to restart the game!`
        p1.style.backgroundColor = 'var(--Banafsh)'
        changePlayer()
        p2.innerHTML = `Player '${currentPlayer}' Do you want to restart the game?`
        p2.style.backgroundColor = 'var(--Sorati)'

        no.style.display = 'inline'
        yes.style.display = 'inline'






        yes.addEventListener('click', ev => {
            cells.forEach(cell => {
                cell.innerText = '';
                cell.classList.remove('selected')
            });
        
            currentPlayer = 'X';
            gameStatus.innerText = `It's ${currentPlayer}'s Turn`;
            gameStatus.style.color = 'black';
            gameStatus.style.fontSize = '1.9rem';
            gameState = ['','','','','','','','','','','','','','','',''];
            p1.innerHTML = ''
            p1.style.backgroundColor = 'transparent'
            p2.innerHTML = ''
            p2.style.backgroundColor = 'transparent'
            no.style.display = 'none'
            yes.style.display = 'none'

            p3.style.animation = 'opacity 2s';
        
            isActive = true
        })



        no.addEventListener('click', ev => {
            p1.innerHTML = ''
            p1.style.backgroundColor = 'transparent'
            p2.innerHTML = ''
            p2.style.backgroundColor = 'transparent'

            no.style.display = 'none'
            yes.style.display = 'none'

            changePlayer()

            isActive = true
        })
    }
}
















function gameResult() {
    let isWin = false

    for (const gameCondition of gameConditions) {
        let state0 = gameState[gameCondition[0]];
        let state1 = gameState[gameCondition[1]];
        let state2 = gameState[gameCondition[2]];
        let state3 = gameState[gameCondition[3]];

        if(!state0 || !state1 || !state2 || !state3) continue

        if(state0 === state1 && state1 === state2 && state2 === state3){
            isWin = true
            break
        }
    }


    if(isWin) {
        gameStatus.innerText = `Player ${currentPlayer} Has Won!`
        gameStatus.style.color = 'rgb(0, 64, 0)';
        gameStatus.style.fontSize = '2.1rem';
        isActive = false
        audio.play()
        
        return
    }

    if(!gameState.includes('')){
        gameStatus.innerText = `Game ended in draw!`
        gameStatus.style.fontSize = '2.1rem';
        isActive = false
        return
    }

    changePlayer()
}