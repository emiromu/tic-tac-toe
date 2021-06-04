
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

/*Create html board display programmatically*/
/*
let k=0;
for(let i=0; i<3; i++){
    displayBoard.appendChild(document.createElement("div"));
    displayBoard.lastElementChild.setAttribute("id","boardCol"+i);
    document.querySelector(`#boardCol${i}`).classList.add("col");
    for(let j=0; j<3; j++){
        document.querySelector(`#boardCol${i}`).appendChild(document.createElement("div"));
        document.querySelector(`#boardCol${i}`).lastElementChild.setAttribute("id",`cell${k+j}`);
        document.querySelector(`#boardCol${i}`).lastElementChild.classList.add("cell");
    }
    k=k+3;
}*/

