const picturs_container = document.querySelector('.picturs_container');
const cards_btn_eazy = document.querySelector('.cards_btn_eazy');
const cards_btn_medium = document.querySelector('.cards_btn_medium');
const cards_btn_container = document.querySelector('.cards_btn_container');
const game_container = document.querySelector('.container');

const specipicCardArray = [
    {
        name: 'pic1',
        pic: '../Picturs1/MemoryGame/pic1.png'
    }, {
        name: 'pic2',
        pic: '../Picturs1/MemoryGame/pic2.png'
    }, {
        name: 'pic3',
        pic: '../Picturs1/MemoryGame/pic3.png'
    }, {
        name: 'pic4',
        pic: '../Picturs1/MemoryGame/pic4.png'
    }, {
        name: 'pic5',
        pic: '../Picturs1/MemoryGame/pic5.png'
    }, {
        name: 'pic6',
        pic: '../Picturs1/MemoryGame/pic6.png'
    }, {
        name: 'pic7',
        pic: '../Picturs1/MemoryGame/pic7.png'
    }, {
        name: 'pic8',
        pic: '../Picturs1/MemoryGame/pic8.png'
    }, {
        name: 'pic9',
        pic: '../Picturs1/MemoryGame/pic9.png'
    }, {
        name: 'pic10',
        pic: '../Picturs1/MemoryGame/pic10.png'
    }
];
const cardArray = [];
let chosenCards1 = [];
let chosenCards2 = [];
let score = 0;

const scorePrinter = document.querySelector('.score');

cards_btn_eazy.addEventListener('click', () => {
    createBoard1(10)
    cards_btn_container.style.display = 'none';
    picturs_container.style.display = 'grid';
});
cards_btn_medium.addEventListener('click', () => {
    createBoard1(20)
    cards_btn_container.style.display = 'none';
    picturs_container.style.display = 'grid';
});

function clearCardsArray() {
    chosenCards2.forEach(card => {
        card.style.pointerEvents = 'auto';
        console.log(card);
    })

    chosenCards1 = [];
    chosenCards2 = [];
    picturs_container.style.pointerEvents = 'auto';
}

function createBoard1(num){
    for (let i = 0; i < num / 2; i++) {
        cardArray.push(specipicCardArray[i]);
        cardArray.push(specipicCardArray[i]);
    }
    cardArray.sort(() => 0.5 - Math.random());
    createBoard(num);
}

function createBoard(num) {
    scorePrinter.innerHTML = `Score: ${score}`;
    for (let i = 0; i < num; i++) {
        let picture = document.createElement('img');
        picture.setAttribute('src', '../Picturs1/MemoryGame/before.png');
        picture.setAttribute('id', i);
        picture.setAttribute('class', 'picture_item');
        picture.addEventListener('click', () => flipCard(picture));
        picturs_container.appendChild(picture);
    }
}

function flipCard(picture) {
    const cardId = picture.id;
    if (cardId != -1) {
        if (chosenCards2.length < 2) {
            chosenCards1.push(cardArray[cardId]);
            chosenCards2.push(picture);
            picture.setAttribute('src', cardArray[cardId].pic);
            picture.style.pointerEvents = 'none';
            if (chosenCards2.length === 2) {
                picturs_container.style.pointerEvents = 'none';
                setTimeout(() => {
                    checkForMatch();
                }, 1000);
            }
        }
    }
}

function checkForMatch() {
    picturs_container.style.pointerEvents = 'none';
    const optionOneId = chosenCards2[0];
    const optionTwoId = chosenCards2[1];

    if (chosenCards1[0].name === chosenCards1[1].name) {

        setTimeout(function () {
            optionOneId.setAttribute('src', '../Picturs1/MemoryGame/after.png');
            optionTwoId.setAttribute('src', '../Picturs1/MemoryGame/after.png');
            optionOneId.setAttribute('id',-1);
            optionTwoId.setAttribute('id', -1);
            optionOneId.setAttribute('class', '');
            optionTwoId.setAttribute('class', '');
            clearCardsArray();

        }, 700);

        score++;
        scorePrinter.innerHTML = `Score: ${score}`;

    } else {
        optionOneId.setAttribute('src', '../Picturs1/MemoryGame/before.png');
        optionTwoId.setAttribute('src', '../Picturs1/MemoryGame/before.png');
        clearCardsArray();
    }

    if (score === cardArray.length / 2) {
        alert('Very Nice');
    }
}


