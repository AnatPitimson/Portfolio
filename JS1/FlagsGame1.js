let flags = [];
let questionCounter;
let optionButtons;
let answerInputs;
let user_answer_arr = [];
let score;

const play = document.querySelector('.js-play');
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const questionPicture = document.querySelector('.js-flag');
const game_container = document.querySelector('.js-game');
const answers_container = document.querySelector('.js-answers-container');
const letters_container = document.querySelector('.js-letters-container');
const next_btn_wrapper = document.querySelector('.next_btn_wrapper');
const next_button = document.querySelector('.js-next-button');
const reset_button = document.querySelector('.js-reset-button');
const score_container = document.querySelector('.js-score');
const restart_game = document.querySelector('.js-restart-game');
const game_header = document.querySelector('.js-game-header');


if (JSON.parse(localStorage.getItem('Score')) !== null && JSON.parse(localStorage.getItem('Score')) !== 0) {
    play.innerHTML = `Resume`;
}

play.addEventListener('click', () => {
    startGame();
    play.style.visibility = 'hidden';
});

restart_game.addEventListener('click', () => {
    score = 0;
    questionCounter = 0;
    localStorage.setItem('Score', JSON.stringify(score));
    localStorage.setItem('QuestionCounter', JSON.stringify(questionCounter));
    startGame();
});

next_button.addEventListener('click', () => {
    next_button.style.visibility = 'hidden';
    if (flags.length > questionCounter) {
        user_answer_arr = [];
        questionCounter++;
        localStorage.setItem('QuestionCounter', JSON.stringify(questionCounter));
        showQuestion();
    } else {
        alert('Great');
        cleanGameContainers()
    }
});

reset_button.addEventListener('click', () => {
    optionButtons.forEach(button => {
        button.disabled = false
        button.style.cursor = 'pointer';
    });
    answerInputs.forEach((answerInput) => {
        answerInput.value = ' ';
        answerInput.style.backgroundColor = 'white';
    });
    user_answer_arr = [];
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showQuestion() {
    cleanGameContainers();
    game_header.appendChild(score_container);
    game_header.appendChild(restart_game);
    game_container.appendChild(game_header);


    if (questionCounter < flags.length) {

        //Get current question
        const currentQuestion = flags[questionCounter];

        //Add the picture of the flag
        const flagImg = document.createElement('img');
        flagImg.src = currentQuestion.Img;
        flagImg.id = questionCounter;
        flagImg.setAttribute('class', 'flag_pic');
        game_container.appendChild(flagImg);

        //Add the empty space for the answer
        const answerName = currentQuestion.Name.toLowerCase();
        const answerLength = answerName.length;

        for (let i = 0; i < answerLength; i++) {
            const answer1 = document.createElement('input');
            answer1.type = 'button';
            answer1.value = ' ';
            answer1.className = 'answer';
            answer1.id = i + 1;
            answers_container.append(answer1);
        }
        game_container.appendChild(answers_container);

        //Calc the answers letters
        const answer = [...answerName];

        //Calc of the option letters
        const elementsToAdd = 20 - answerLength;
        for (let i = 0; i < elementsToAdd; i++) {
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            answer.push(alphabet[randomIndex]);
        }

        shuffleArray(answer);

        //Add the option buttons for the letters of the answer
        for (let i = 0; i < 20; i++) {
            const option_button = document.createElement('input');
            option_button.type = 'button';
            option_button.className = 'letter_option';
            option_button.value = answer[i];
            option_button.id = i + 1;
            if (i === 10) {
                let br = document.createElement('br');
                letters_container.appendChild(br);
            }
            letters_container.appendChild(option_button);
        }
        game_container.appendChild(letters_container);
        game_container.appendChild(next_btn_wrapper);



        optionButtons = document.querySelectorAll('.letter_option');
        answerInputs = document.querySelectorAll('.answer');
        playGame();
    }
}

function playGame() {
    optionButtons.forEach(button => {
        button.addEventListener('click', handleOptionClick)
    });

    answerInputs.forEach(button => {
        button.addEventListener('click', handleAnswerClick)
    });
}

function handleOptionClick(event) {
    const selectedLetter = event.target.value;

    // Find the first empty answer input element
    const emptyInputs = Array.from(answerInputs).filter(input => input.value === ' ');

    if (emptyInputs.length > 0) {
        const emptyInput = emptyInputs[0];
        emptyInput.value = selectedLetter;
        emptyInput.style.backgroundColor = "floralwhite";
        event.target.disabled = true;
        event.target.className = 'letter_option';
        let elementToInsert = [event.target, emptyInput];
        user_answer_arr.splice(emptyInput.id - 1, 0, elementToInsert);
        if (emptyInputs.length === 1) {
            checkAnswer();
        }
    }
}

function handleAnswerClick(event) {

    for (let i = 0; i < user_answer_arr.length; i++) {
        if (user_answer_arr[i][1] == event.target) {
            user_answer_arr[i][0].disabled = false;
            user_answer_arr[i][0].style.cursor = 'pointer';
            user_answer_arr = user_answer_arr.filter(element => element[1] !== event.target);
            break;
        }
    }
    event.target.value = ' ';
    event.target.style.backgroundColor = 'white';
}

function checkAnswer() {
    let user_answer = '';
    for (let i = 0; i < user_answer_arr.length; i++) {
        user_answer += user_answer_arr[i][1].value;
    }

    if (user_answer === flags[questionCounter].Name.toLowerCase()) {
        next_button.style.visibility = 'visible';
        score++;
        localStorage.setItem('Score', JSON.stringify(score));
        score_container.innerHTML = `Score: ${score}`;
    }
}

function startGame() {
    restart_game.style.visibility = 'visible';
    score_container.style.visibility = 'visible';
    game_container.style.visibility = 'visible';
    questionCounter = JSON.parse(localStorage.getItem('QuestionCounter')) || 0;
    score = JSON.parse(localStorage.getItem('Score')) || 0;
    score_container.innerHTML = `Score: ${score}`;
    showQuestion();
}

function fetchCountriesData() {
    fetch('../JSON/flags.json')
        .then((response) => response.json())
        .then((data) => {
            flags = data;
        })
        .catch((error) => console.error('Error fetching data:', error));
}

function cleanGameContainers() {
    game_container.innerHTML = '';
    answers_container.innerHTML = '';
    letters_container.innerHTML = '';
}

fetchCountriesData();