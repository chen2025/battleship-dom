import Board from "./board.js";

function makeGame(){
    let board = new Board();

    console.log(board.grid);

    // Game Over Div
    let newDivElementGO = document.createElement("div");
    document.body.appendChild(newDivElementGO);

    //Reset Div
    let newDivElementRes = document.createElement("div");
    let newButtonElementRes = document.createElement("button");
    newButtonElementRes.setAttribute("id", "reset");
    newButtonElementRes.innerText = "Reset Game";
    newDivElementRes.appendChild(newButtonElementRes);
    document.body.appendChild(newDivElementRes);

    // Container Div
    let newDivElement = document.createElement("div");
    newDivElement.setAttribute("id", "container");

    // Display grid
    board.grid.forEach((row, i) => {
        row.forEach((ele, j) => {
            let insideSpan = document.createElement("span");
            insideSpan.innerText = ele;
            insideSpan.setAttribute("id", "inside");
            insideSpan.setAttribute("class", `InRow${i}Col${j}`);

            let newSpanElement = document.createElement("span");
            newSpanElement.appendChild(insideSpan);
            newSpanElement.setAttribute("id", "cell");
            newSpanElement.setAttribute("class", `OutRow${i}Col${j}`);
            newSpanElement.setAttribute("data-row", i);
            newSpanElement.setAttribute("data-col", j);
            newDivElement.appendChild(newSpanElement);
        });
    });

    document.body.appendChild(newDivElement);

    return board;
}

window.addEventListener("DOMContentLoaded", function () {

    let board = makeGame();
    let over = false;

    // reset listener
    const reset = document.getElementById("reset");
    reset.addEventListener("click", event => {

        board = new Board();
        over = false;
        if (document.body.children[1].children[0]){
            document.body.children[1].children[0].remove();
        }

        // Display grid
        board.grid.forEach((row, i) => {
            row.forEach((ele, j) => {
                let insideSpan = document.getElementsByClassName(`InRow${i}Col${j}`)[0];
                insideSpan.innerText = ele;

                let newSpanElement = document.getElementsByClassName(`OutRow${i}Col${j}`)[0];
                newSpanElement.setAttribute("data-row", i);
                newSpanElement.setAttribute("data-col", j);
                newSpanElement.style.backgroundColor = "white";
                newSpanElement.children[0].setAttribute("id", "inside");
            });
        });
    });

    // grid listener
    const container = document.getElementById("container");
    container.addEventListener("click", event => {
        let square = event.target;

        if (square.getAttribute("id") === "cell" && !over){
            let result = board.makeHit(square.dataset.row, square.dataset.col);

            if (!result) {
                square.style.backgroundColor = "red";
            }
            else{
                square.style.backgroundColor = "green";
                square.children[0].removeAttribute("id");
            }

            if (board.isGameOver()){
                let newPElement = document.createElement("p");
                newPElement.innerText = "YOU WIN!";
                document.body.children[1].appendChild(newPElement);
                over = true;
            }
        }

        else{
            event.preventDefault();
        }

    });
});
