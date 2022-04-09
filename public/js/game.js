// PLAYER 1
const userBatu = document.getElementById("userBatu");
const userKertas = document.getElementById("userKertas");
const userGunting = document.getElementById("userGunting");

// RESULT
const vs = document.querySelector(".vs");
const resultText = document.querySelector(".result-text");

// COMPUTER
const comBatu = document.getElementById("comBatu");
const comKertas = document.getElementById("comKertas");
const comGunting = document.getElementById("comGunting");

// REFRESH
const refreshPage = document.getElementById("refresh-page");
refreshPage.addEventListener('click', function () {
    if (confirm("Play Again??")) {
        location.reload()
    }
})

var Enabled = true;


const hands = document.querySelectorAll(".hand");

class Game {
    constructor() {
        const userBatu = document.getElementById("userBatu");
        const userKertas = document.getElementById("userKertas");
        const userGunting = document.getElementById("userGunting");

    }

    remove() {
        console.log("remove class");
        console.log(userKertas);

        userKertas.classList.remove('hightlight');
        console.log(userKertas);
    }
}
const removeAll = () => {
    hands.forEach((element) => {
        element.classList.remove("highlight");
    });
};


const game = new Game();

const computer = () => {
    const comRandom = [comBatu, comKertas, comGunting];
    const random = comRandom[Math.floor(Math.random() * 3)];
    random.classList.add("highlight");
    console.log("random :" + random.id);

    return random.id
};


userKertas.onclick = () => {

    if (Enabled == true) {
        let resultPlayer = userKertas.id;
        console.log("kertas di klik");
        removeAll();
        userKertas.classList.add("highlight");
        let resultCom = computer();
        document.querySelector("#game-result .player-result").style.display = "block";
        document.querySelector("#game-result .result-text").remove();
        document.querySelector("#game-result .player-result").textContent =
            getResult(resultCom, resultPlayer);

        Enabled = false;

    }
}

userBatu.onclick = () => {

    if (Enabled == true) {
        let resultPlayer = userBatu.id;
        console.log("batu di klik");
        removeAll();
        userBatu.classList.add("highlight");
        let resultCom = computer();
        document.querySelector("#game-result .player-result").style.display = "block";
        document.querySelector("#game-result .result-text").remove();
        document.querySelector("#game-result .player-result").textContent =
            getResult(resultCom, resultPlayer);

        Enabled = false;
    }
};

userGunting.onclick = () => {
    if (Enabled == true) {
        let resultPlayer = userGunting.id;
        console.log("gunting di klik");
        removeAll();
        userGunting.classList.add("highlight");
        let resultCom = computer();
        document.querySelector("#game-result .player-result").style.display = "block";
        document.querySelector("#game-result .result-text").remove();
        document.querySelector("#game-result .player-result").textContent =
            getResult(resultCom, resultPlayer);

        Enabled = false;
    }
};




function getResult(resultCom, resultPlayer) {
    let result = "";


    // perhitungan

    console.log("resultCom :" + resultCom);
    console.log("resultPlayer :" + resultPlayer);


    if (
        (resultCom == "comBatu" && resultPlayer == "userKertas") ||
        (resultCom == "comKertas" && resultPlayer == "userGunting") ||
        (resultCom == "comGunting" && resultPlayer == "userBatu")
    ) {
        result = "PLAYER 1 WIN";
    } else if (
        (resultCom == "comGunting" && resultPlayer == "userKertas") ||
        (resultCom == "comBatu" && resultPlayer == "userGunting") ||
        (resultCom == "comKertas" && resultPlayer == "userBatu")
    ) {
        result = "COM WIN";
    } else if (
        (resultCom == "comKertas" && resultPlayer == "userKertas") ||
        (resultCom == "comGunting" && resultPlayer == "userGunting") ||
        (resultCom == "comBatu" && resultPlayer == "userBatu")
    ) {
        result = "DRAW"
    }
    return result;
}