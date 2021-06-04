
/*
012
1
2
*/

/* suits : 'o' 'x' */

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
            switch(cells[i]){
                case 'x' :
                    document.querySelector(`#cell`+i).textContent = 'X';
                    break;
                case 'o' :
                    document.querySelector(`#cell`+i).textContent = 'O';
                    break;
                default : document.querySelector(`#cell`+i).textContent = '';
            }       
        }
    };

    return {cells, tickCell, render};
})();

const gameRound = (() => {

})();

const computerPlayer = playerFactory('computer','x');
const humanPlayer = playerFactory("player",'o');

const displayBoard = document.querySelector("#displayBoard");


/*event listeners for cells*/
for(let i=0; i<9; i++){
    document.querySelector(`#cell`+i).addEventListener("click", function(e){
        if(gameBoard.cells[i]==''){
            gameBoard.tickCell(i,humanPlayer.getSuit());
        }   
        gameBoard.render();
    });
}

gameBoard.render();
