let word ='';
let inputWord = '';
let attempts = 0;
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;
const wordLetters = document.querySelectorAll('.tile');
const buttons = document.querySelectorAll('.key');
const WORDS =['kamil', 'karol', 'konik', 'kutas'];
let isGuessed = new Array(WORD_LENGTH).fill(0);
const animation_duration = 500;

function generateWord(){
    word = WORDS[Math.floor(Math.random()*WORDS.length)];
    console.log(word);
}


function addLetter(val) {
    if (inputWord.length < WORD_LENGTH) {
        inputWord += val;
        wordLetters[attempts * WORD_LENGTH + inputWord.length - 1].innerHTML = val.toUpperCase();
    }
}
function backspace() {
    if (inputWord.length >= 1) {
        wordLetters[attempts * WORD_LENGTH + inputWord.length - 1].innerHTML = "";
        inputWord = inputWord.slice(0, inputWord.length - 1);
        console.log(inputWord);
    }
}
function colorButton(char, color) {
    buttons.forEach(element => {
        if (element.value === char){
            switch (color) {
                case 0:
                    element.style.backgroundColor = '#333334';
                    element.style.color = '#fff';
                    break;
                case 1:
                    element.style.backgroundColor = '#4CAF50';
                    element.style.color = '#fff';
                    break;
                case 2:
                    element.style.backgroundColor = '#ffcc00'
                    element.style.color = '#000';
                    break;
            }
        }
    });
}
function resetWord(){
    attempts = 0;
    generateWord();

    wordLetters.forEach((letter) =>{
        letter.style.backgroundColor = "#131314";
        letter.style.color = '#fff';
        letter.innerHTML = "";
        letter.classList.remove("animated")
    })

    buttons.forEach(element => {
        element.style.backgroundColor = '#818384';
        element.style.color = '#fff';
    });
}

function submitWord() {

    if (inputWord.length !== WORD_LENGTH){
        alert(`Pleas enter a word with ${WORD_LENGTH} letters`);
        return;
    }

    const letterMatches = [];

    for(let i = 0; i < WORD_LENGTH; i++){

        let letter = inputWord[i];
        let element = wordLetters[WORD_LENGTH * attempts + i];
        element.innerHTML = letter.toUpperCase();

        if(word.includes(letter)){
            if (word[i] === letter) {
                isGuessed[i] = 1;
            } else {
                letterMatches.push([letter,i]);
            }
        }
    }

    for (let i = 0; i < letterMatches.length; i++){
        let letter = letterMatches[i][0];
        let idx = word.indexOf(letter);

        while (idx !== -1) {
            if (isGuessed[idx] === 0){
                isGuessed[idx] = 2;
                break;
            }
            idx = word.indexOf(letter, idx + 1);
        }
    }

    // painting board and keyboard
    for (let i = 0; i < WORD_LENGTH; i++){
        let element = wordLetters[WORD_LENGTH * attempts + i];
        let letter = element.textContent.toLowerCase();

        switch (isGuessed[i]) {
            case 0:
                setTimeout(() =>{
                    colorButton(letter, 0);
                    element.style.backgroundColor = '#333334';
                    element.style.color = '#fff';
                }, (i * animation_duration) + 700 / 2);
                element.classList.add('animated');
                element.style.animationDelay = `${i * animation_duration}ms`;
                break;
            case 1:
                setTimeout(() =>{
                    colorButton(letter, 1);
                    element.style.backgroundColor = '#4CAF50';
                    element.style.color = '#fff';
                }, (i * animation_duration) + 700 / 2);
                element.classList.add('animated');

                element.style.animationDelay = `${i * animation_duration}ms`;
                break;
            case 2:
                setTimeout(() =>{
                    colorButton(letter, 2);
                    element.style.backgroundColor = '#ffcc00';
                    element.style.color = '#000';
                }, (i * animation_duration) + 700 / 2);
                element.classList.add('animated');

                element.style.animationDelay = `${i * animation_duration}ms`;
                break;
        }
    }

    attempts += 1;
    console.log(word === inputWord);

    if (word === inputWord){
        setTimeout(() => {
            console.log(word === inputWord);
            alert(`You won in ${attempts} attempts`);
            resetWord();
        }, 6 * animation_duration);
    }
    else if (attempts === MAX_ATTEMPTS){
        setTimeout(() => {
            alert(`You lost! To many attempts!\nThe word was ${word}`);
            resetWord();
        }, 6 * animation_duration);
    }
    inputWord = '';
    isGuessed.fill(0);
}
generateWord();
