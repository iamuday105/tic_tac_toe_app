const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

//lets create a function to initialize the game

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // UI empty krna padega
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // initialise style bg color
        box.classList = `box box-${index+1}`;
      
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
   let answer = "";

   winningPositions.forEach((position) =>{
    // all three boxes are non empty and exactly same in value
    if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

    //    check if winner is X

    if(gameGrid[position[0]] === "X"){
        answer = "X";
    }else{
        answer = "0";


    }
    //disable pointer events

    boxes.forEach((box) =>{
        box.style.pointerEvents = "none";
    })

            // now we know x or y is a winner 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

    }
   });
// 
   if(answer !== ""){
        //  we have a winner
        gameInfo.innerText = `Winner Player - ${answer}`;

        newGameBtn.classList.add("active");

        return;

   }

   //when there is no winner

   let fillCount =0;
   gameGrid.forEach((box) =>{
        if(box !== ""){
            fillCount ++;
        }
   });

   if(fillCount === 9){
    gameInfo.innerText = "Game Tied!";
    newGameBtn.classList.add("active");
   }

//    gameInfo.innerText = `Current Player - ${currentPlayer}`;


}



function handleClick(index){
    if (gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap karo turn ko

        swapTurn();

        // ckeck if any one won
        checkGameOver();
    }
}

boxes.forEach((box, index) =>{
    box.addEventListener('click', () =>{
        handleClick(index);
    })
})

newGameBtn.addEventListener('click', initGame);