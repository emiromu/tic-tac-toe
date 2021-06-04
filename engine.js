
/*
012
1
2
*/

const playerFactory = (name, suit) => {
    const getName = () => name;
    const getSuit = () => suit;
    return { getName, getSuit };
  };

const gameBoard = (() => {

    const cells = ['x','','x','','','','','',''];
    const tickCell = (index,suit) => {
        cells[index]=suit;
    };
    const render = () => {
        for(let i=0; i<cells.length;i++){
            document.querySelector(`#cell`+i).textContent = cells[i];
        }
    };

    return {cells, tickCell, render};
})();

const gameRound = (() => {

})();

const computerPlayer = playerFactory('computer','circle');
const humanPlayer = playerFactory("player",'cross');

const displayBoard = document.querySelector("#displayBoard");


/*event listeners for cells*/
for(let i=0; i<9; i++){
    document.querySelector(`#cell`+i).addEventListener("click", function(e){
        gameBoard.tickCell(i,'a');
        gameBoard.render();
    });
}

