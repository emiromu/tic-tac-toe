
/*
Board cells :
036
147
258

suits : 'o' 'x' */


const playerFactory = (type, suit) => {
    const getType= () => type;
    const getSuit = () => suit;
    
    return { getType, getSuit };
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
                return `${gameBoard.cells[i]} wins`;
            }
        }
        //check vertical lines
        for(let i=0; i<7; i=i+3){
            if(gameBoard.cells[i]!='' && (gameBoard.cells[i]===gameBoard.cells[i+1]&&gameBoard.cells[i]===gameBoard.cells[i+2])){
                return `${gameBoard.cells[i]} wins`;
            }
        }
        //check diagonal lines
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

const gameCore = (() => {

    let gameMode = 'pvp';
    let currentPlayer = 0;
    let gameOver=false;

    //Default pvp game mode
    const players = [playerFactory('human','x'),playerFactory('human','o')];
    

    return {players, currentPlayer, gameOver, gameMode};
})();



/*HTML elements to display the game board*/
const displayBoard = document.querySelector("#displayBoard");
const gameModePVP = document.querySelector("#radioA1");
const gameModePVE = document.querySelector("#radioA2");
const pveSelect = document.querySelector("#pveSelect");
const startButton = document.querySelector("#startGame");

startButton.addEventListener("click",function(e){
    
    document.getElementById("cell0").className = "cell";
    document.getElementById("cell1").className = "cell";
    document.getElementById("cell2").className = "cell";
    document.getElementById("cell3").className = "cell";
    document.getElementById("cell4").className = "cell";
    document.getElementById("cell5").className = "cell";
    document.getElementById("cell6").className = "cell";
    document.getElementById("cell7").className = "cell";
    document.getElementById("cell8").className = "cell";

    gameBoard.boardReset();
    gameCore.gameOver=false;
    gameCore.currentPlayer=0;
    document.querySelector("#referee").textContent=`${gameCore.players[gameCore.currentPlayer].getSuit()}'s turn`;
    gameBoard.render();

});

/*event listeners for cells*/
for(let i=0; i<9; i++){
    document.querySelector(`#cell`+i).addEventListener("click", function(e){
        if(gameBoard.cells[i]=='' && gameCore.gameOver==false){
            gameBoard.tickCell(i,gameCore.players[gameCore.currentPlayer].getSuit());
            if(gameCore.currentPlayer==0){
                gameCore.currentPlayer=1;
            }else{
                gameCore.currentPlayer=0;
            };     
            
            switch(gameBoard.isGameOver()){
                case 'draw':
                    gameCore.gameOver=true;
                    break;
                case 'ongoing':
                    break;
                case 'x wins':
                    gameCore.gameOver=true;
                    break;
                case 'o wins':
                    gameCore.gameOver=true;
                    break;
            }
        }   
        document.querySelector("#referee").textContent=`${gameCore.players[gameCore.currentPlayer].getSuit()}'s turn`;
        gameBoard.render();
        
        if(gameCore.gameOver==true){
            document.querySelector("#referee").textContent = gameBoard.isGameOver();
        };

    });
}

/*event listeners for game options*/
gameModePVP.addEventListener("change", function(e){
    if(gameModePVP.checked){
        while(pveSelect.lastChild!=null)
        {
            gameLoop.gameMode='pvp';
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
        gameCore.gameMode='pve';
    };
});



