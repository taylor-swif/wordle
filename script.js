let word ='';
let inputWord = '';
let attempts = 0;
const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;
const wordLetters = document.querySelectorAll('.tile');
const buttons = document.querySelectorAll('.key');
const WORDS =['kamil', 'karol', 'konik', 'kutas'];
let isGuessed = new Array(WORD_LENGTH).fill(0);
const animation_duration = 500; // ms

function generateWord(){
    word = WORDS[Math.floor(Math.random()*WORDS.length)];
    console.log(word);
}


function addLetter(val) {
    if (inputWord.length < WORD_LENGTH) {
        inputWord += val;
        wordLetters[attempts * WORD_LENGTH + inputWord.length - 1].innerHTML = val.toUpperCase();
        console.log(inputWord === word);
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
        wordLetters[WORD_LENGTH * attempts + i].innerHTML = letter.toUpperCase();
        if(word.includes(letter)){
            if (word[i] === letter) {
                wordLetters[WORD_LENGTH * attempts + i].classList.add('animated');
                wordLetters[WORD_LENGTH * attempts + i].style.backgroundColor = '#4CAF50';
                wordLetters[WORD_LENGTH * attempts + i].style.color = '#fff';
                wordLetters[WORD_LENGTH * attempts + i].style.animationDelay = `${(i * animation_duration) / 2}ms`;
                isGuessed[i] = 1;
                colorButton(letter, 1);
            } else {
                letterMatches.push([letter,i]);
            }
        }
        else{
            wordLetters[WORD_LENGTH * attempts + i].classList.add('animated');
            wordLetters[WORD_LENGTH * attempts + i].style.animationDelay = `${(i * animation_duration) / 2}ms`;

            colorButton(letter, 0);
        }
    }
    console.log(letterMatches);
    console.log(word);

    for (let i = 0; i < letterMatches.length; i++){
        let letter = letterMatches[i][0];
        let letter_idx = letterMatches[i][1];
        let idx = word.indexOf(letter);
        while (idx !== -1) {
            if (isGuessed[idx] === 0){
                isGuessed[idx] = 2;
                wordLetters[WORD_LENGTH * attempts + letter_idx].classList.add('animated');
                wordLetters[WORD_LENGTH * attempts + letter_idx].style.backgroundColor = '#ffcc00'
                wordLetters[WORD_LENGTH * attempts + letter_idx].style.color = '#000';
                wordLetters[WORD_LENGTH * attempts + i].style.animationDelay = `${(i * animation_duration) / 2}ms`;

                colorButton(letter, 2);
                break;
            }
            idx = word.indexOf(letter, idx + 1);
        }
    }
    attempts += 1;
    isGuessed.fill(0);

    if (word === inputWord){
        alert(`You won in ${attempts} attempts`);
        resetWord();
    }
    else if (attempts === MAX_ATTEMPTS){
        alert(`You lost! To many attempts!\nThe word was ${word}`);
        resetWord();
    }
    inputWord = '';

}
generateWord();
