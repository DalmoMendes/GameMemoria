/* ---------------------------------------------------------------------------
// Versão Original - Digitalinnovation.one
// Por Dalmo Silva Mendes, New Version: Jogo da Memória v2.0 - Street Fighter V 
// Boa Vista-RR, 01/01/2022 - Git: https://github.com/DalmoMendes/
------------------------------------------------------------------------------
*/
let nikname = prompt("Informe seu nome : ");
const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let count = 0;
console.log(nikname);

if(nikname == null || nikname == ""){
    nikname = "Play";
}

// Funções de Audios
let Acertou = () => {
    const audioAcerto = new Audio('./sounds/acertou.wav');
    audioAcerto.play();
}
let Errou = () => {
    const audioErrou = new Audio('./sounds/errou.wav');
    audioErrou.play();
}
let ClickSom = () => {
    const audioClick = new Audio('./sounds/click.wav');
    audioClick.play();
}
let Start = () => {
    const audioStart = new Audio('./sounds/start.wav');
    audioStart.play();
}
let GameEnd = () => {
    alert("Parabéns " + nikname + " !\n Você zerou o jogo da memória Street Fighter V.");
    //window.Location("../index.html");
    Start();
}

//função para virar carta
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
} 

//função que checa se as cartas são iguais
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        Acertou(); // Ativa o som de acertou 
        count++;
        //Exibir total de acertos - adicionar codigo aqui!
        console.log(count);
            if(count > 9){
                GameEnd();
            } 
      return;
    }
    Errou(); // Ativa o som de errou
    unflipCards();
}

//função que desabilita as cartas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//funcão que desvira as cartas
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//função que reseta o tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//função que embaralha as cartas
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 20); // número de cards 10
        card.style.order = ramdomPosition;
    })
})();

//adiciona evento de clique na carta
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});