
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

    const cells = ['','','','','','','','',''];
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
                default : document.querySelector(`#cell`+i).textContent = /*''*/ gameBoard.cells[i];
            }       
        }
    };

    return {cells, tickCell, render};
})();


const isGameOver = function (gameBoard){
    //check horizontal lines
    for(let i=0; i<3; i++){
        if(gameBoard.cells[i]!='' && (gameBoard.cells[i]===gameBoard.cells[i+3]&&gameBoard.cells[i]===gameBoard.cells[i+6])){
            return `${gameBoard.cells[i]} wins`;
        }
    }
    //check vertical lines
    for(let i=0; i<7; i=i+3){
        if(gameBoard.cells[i]!='' && (gameBoard.cells[i]===gameBoard.cells[i+1]&&gameBoard.cells[i]===gameBoard.cells[i+2])){
            return `${gameBoard.cells[i]} wins`;
        }
    }
    //check horizontal lines
    if(gameBoard.cells[0]!='' && (gameBoard.cells[0]===gameBoard.cells[4]&&gameBoard.cells[0]===gameBoard.cells[8])){
        return `${gameBoard.cells[0]} wins`;
    };
    if(gameBoard.cells[2]!='' && (gameBoard.cells[2]===gameBoard.cells[4]&&gameBoard.cells[2]===gameBoard.cells[6])){
        return `${gameBoard.cells[2]} wins`;
    };

    //check for draw
    for(let i=0; i<gameBoard.cells.length; i++){
        if(gameBoard.cells[i]==''){
            return `ongoing`;
        };
    };
    return `draw`;
};

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
