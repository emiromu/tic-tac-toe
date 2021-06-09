
/*
Board cells :
036
147
258

suits : 'o' 'x' */

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
                default : document.querySelector(`#cell`+i).textContent = gameBoard.cells[i];
            }       
        }
    };

    const isGameOver = () => {
        //check horizontal lines
        for(let i=0; i<3; i++){
            if(gameBoard.cells[i]!='' && (gameBoard.cells[i]===gameBoard.cells[i+3]&&gameBoard.cells[i]===gameBoard.cells[i+6])){
                console.log(`${gameBoard.cells[i]} wins`);
                return `${gameBoard.cells[i]} wins`;
            }
        }
        //check vertical lines
        for(let i=0; i<7; i=i+3){
            if(gameBoard.cells[i]!='' && (gameBoard.cells[i]===gameBoard.cells[i+1]&&gameBoard.cells[i]===gameBoard.cells[i+2])){
                console.log(`${gameBoard.cells[i]} wins`);
                return `${gameBoard.cells[i]} wins`;
            }
        }
        //check diagonal lines
        if(gameBoard.cells[0]!='' && (gameBoard.cells[0]===gameBoard.cells[4]&&gameBoard.cells[0]===gameBoard.cells[8])){
            console.log(`${gameBoard.cells[0]} wins`);
            return `${gameBoard.cells[0]} wins`;
        };
        if(gameBoard.cells[2]!='' && (gameBoard.cells[2]===gameBoard.cells[4]&&gameBoard.cells[2]===gameBoard.cells[6])){
            console.log(`${gameBoard.cells[2]} wins`);
            return `${gameBoard.cells[2]} wins`;
        };
        //check for draw
        for(let i=0; i<gameBoard.cells.length; i++){
            if(gameBoard.cells[i]==''){
                return `ongoing`;
            };
        };
        console.log(`draw`);
        return `draw`;
    };

    const boardReset = () =>{
        for(let i=0; i<cells.length; i++){
            cells[i]='';
            document.querySelector(`#cell`+i).textContent = cells[i];
        };
        return 'board reset';
    };

    return {cells, tickCell, render, isGameOver, boardReset};
})();

const gameLoop = (() => {

    const computerPlayer = playerFactory('computer','x');
    const humanPlayer = playerFactory("player",'o');


    return {computerPlayer, humanPlayer};
})();

/*HTML elements to display the game board*/
const displayBoard = document.querySelector("#displayBoard");
const gameModePVP = document.querySelector("#radioA1");
const gameModePVE = document.querySelector("#radioA2");
const pveSelect = document.querySelector("#pveSelect");

/*event listeners for cells*/
for(let i=0; i<9; i++){
    document.querySelector(`#cell`+i).addEventListener("click", function(e){
        if(gameBoard.cells[i]==''){
            gameBoard.tickCell(i,gameLoop.humanPlayer.getSuit());
        }   
        gameBoard.render();
        gameBoard.isGameOver();
    });
}

gameModePVP.addEventListener("change", function(e){
    if(gameModePVP.checked){
        while(pveSelect.lastChild!=null)
        {
            pveSelect.lastChild.remove();
        }
    };
});

gameModePVE.addEventListener("change", function(e){
    if(gameModePVE.checked){
        pveSelect.innerHTML += '<br>Player symbol : ';

        let pveMenuA1 = document.createElement("input");
        pveMenuA1.setAttribute("type","radio");
        pveMenuA1.setAttribute("id","pveMenuA1");
        pveMenuA1.setAttribute("name","suitSelect");
        pveSelect.appendChild(pveMenuA1);
        pveSelect.innerHTML += 'X &nbsp; &nbsp;';

        let pveMenuA2 = document.createElement("input");
        pveMenuA2.setAttribute("type","radio");
        pveMenuA2.setAttribute("id","pveMenuA2");
        pveMenuA2.setAttribute("name","suitSelect");
        pveSelect.appendChild(pveMenuA2);
        pveSelect.innerHTML += 'O';

        document.querySelector("#pveMenuA1").checked=true;
    };
});


//render on Page Load
gameBoard.render();
