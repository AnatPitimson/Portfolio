let questions;

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.querySelector('.js-question');
const scorePrint = document.querySelector('.js-score');
const nextButton = document.querySelector('.js-next-btn');
const buttons = document.querySelectorAll('.js-answer');
const answerButton = document.querySelector('.js-answers-container');
const startBtn = document.querySelector('.js-start-button');
const stratContainer = document.querySelector('.js-start-container');
const wrapperContainer = document.querySelector('.js-wrapper');
const scoreContainer = document.querySelector('.js-score-container');
const finalScorePrint = document.querySelector('.js-final-score');


startBtn.addEventListener('click', () => {
    stratContainer.style.visibility = 'hidden';
    startBtn.style.visibility = 'hidden';
    wrapperContainer.style.visibility = 'visible';
});

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    nextButton.style.visibility = 'hidden';
    if (currentQuestionIndex === questions.length) {
        showFinalScore();
    } else {
        showQuestion();
    }
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = `${questionNumber}.  ${currentQuestion.question}`;

    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        button.textContent = currentQuestion.answers[i].answerOptions;
        button.disabled = false;
        button.style.backgroundColor = '';
    }
}

function checkAnswer(event) {

    const currentQuestion = questions[currentQuestionIndex];
    const clickedButton = event.target;
    const currectAnswer = findCurrectAnswer();

    if (clickedButton.innerHTML === currentQuestion.answers[currectAnswer].answerOptions) {
        score++;
        scorePrint.innerHTML = `Score: ${score}`;
        clickedButton.style.backgroundColor = 'lightgreen';
    } else {
        clickedButton.style.backgroundColor = 'pink';
    }
    buttons[currectAnswer].style.backgroundColor = 'lightgreen';
    nextButton.style.visibility = 'visible';
}

function findCurrectAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    let index;
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
        if (currentQuestion.answers[i].correct) {
            index = i;
        }
    }
    return index;
}

function showFinalScore() {
    wrapperContainer.style.visibility = 'hidden';
    scoreContainer.style.visibility = 'visible';
    finalScorePrint.innerHTML = `Great! Your Score is: ${score}`;
}

answerButton.addEventListener('click', checkAnswer);

function fetchTriviaData() {
    fetch('../JSON/json.json')
        .then((response) => response.json())
        .then((data) => {
            questions = data;
            console.log('Fetched data:', data);
            startQuiz();
        })
        .catch((error) => console.error('Error fetching trivia data:', error));
}

fetchTriviaData();


