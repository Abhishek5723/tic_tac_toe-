const boxes =document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// let create the function to intialised the gameGrid
function initGame() {
    currentPlayer="X";
     gameGrid=["","","","","","","","","" ];
     //UI per nhi empty kerna hoga
     boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        // intialise boxes withh css property again
        box.classList=`box box${index+1}`;
     });
     newGameBtn.classList.remove("active");
    gameInfo.innerText= `current Player -${currentPlayer}`;
}
initGame();







function swapTurn(){
    if(currentPlayer==="X")
    {
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    //UI update
    gameInfo.innerText=`current Player -${currentPlayer}`;
}

function checkGameOver(){
let answer ="";
winningPosition.forEach((position)=>{
    //all 3 boxes should be non empty and exactly same in value
    if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!==""||gameGrid[position[2]]!=="")
    &&(gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){

        // check if winner is X
        if(gameGrid[position[0]]==="X")
        {
            answer="X";
        }else
        {
            answer="O";
        }
        //disable pointer events
        boxes.forEach((box)=>{
            box.style.pointerEvents="none";
        })
        // now we know X or O is a winner 
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
   })
//    it means we have a winner 
 if (answer!=="")
 {
    gameInfo.innerText=`winner Player-${answer}`;
    newGameBtn.classList.add("active");
    return;
 }
//  lets check whether there is tie
let fillcount=0;
gameGrid.forEach((box)=>{
    if(box!=="")
    {
        fillcount++;
    }
});
//board is filled ,game is TIE
if(fillcount==9){
    gameInfo.innerText="Game Tied!";
    newGameBtn.classList.add("active");
}

}




 function handleClick(index){
    if(gameGrid[index]==="")
    {
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        swapTurn();
        checkGameOver();
    }
 }




boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame );