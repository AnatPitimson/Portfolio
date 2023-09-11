const sendBtn = document.querySelector('.js-send-btn');
const outcome = document.querySelector('.outcome');
const incoming = document.querySelector('.incoming');
const start = document.querySelector('.start');
const startImg = document.createElement('img');
const chat_box = document.querySelector('.chat_box');
const chat_container = document.querySelector('.chat_bot');
let flag = 0;

startImg.setAttribute('src', '../Picturs1/myicon.png');
startImg.setAttribute('class', 'icon');


chat_box.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('js-option1-btn')) {
        printUserChoose('Skills and Abilities');
    } else if (target.classList.contains('js-option2-btn')) {
        printUserChoose('GitHub');
    } else if (target.classList.contains('js-option3-btn')) {
        printUserChoose('Linkedin');
    } else if (target.classList.contains('js-option4-btn')) {
        printUserChoose('Projects');
    } else if (target.classList.contains('back_btn')) {
        startChat();
    }
        chat_box.scrollTop = chat_box.scrollHeight;

});

function printUserChoose(optionChoosed) {

    const inputPrint = document.createElement('li');
    inputPrint.classList.add('chat');
    inputPrint.classList.add('outcome');
    inputPrint.innerHTML = `<p>${optionChoosed}</p>`;
    chat_box.appendChild(inputPrint);
    chat_box.scrollTop = chat_box.scrollHeight;
    printAnswer(optionChoosed);




}

function printAnswer(optionChoosed) {

    const answer = document.createElement('li');
    answer.classList.add('chat');
    answer.classList.add('incoming');

   
    setTimeout(() => {
        if (optionChoosed === 'Skills and Abilities') {
            answer.innerHTML = `<img class="icon" src="../Picturs1/myicon.png"/>
        <p>That's fun,</br> you may explore my Skills and Abilities <a href="../HTML1/AboutMe.html#skill_and_abilities_destination">here</a></br>
        <button class="back_btn">Back to Start</button></p>`;
        } else if (optionChoosed === 'GitHub') {
            answer.innerHTML = `<img class="icon" src="../Picturs1/myicon.png"/>
        <p>That's fun,</br> you may explore my GitHub <a href="https://github.com/AnatPitimson">here</a></br>
        <button class="back_btn">Back to Start</button></p>`;
        } else if (optionChoosed === 'Linkedin') {
            answer.innerHTML = `<img class="icon" src="../Picturs1/myicon.png"/>
        <p>That's fun,</br> you may explore my Linkedin <a href="https://www.linkedin.com/in/anat-pitimson/">here</a></br>
        <button class="back_btn">Back to Start</button></p>`;
        } else if (optionChoosed === 'Projects') {
            answer.innerHTML = `<img class="icon" src="../Picturs1/myicon.png"/>
        <p>That's fun,</br> you may explore my Projects <a href="../HTML1/AboutMe.html#projects_Destination">here</a></br>
        <button class="back_btn">Back to Start</button></p>`;
        } else {
            answer.innerHTML = `<img class="icon" src="../Picturs1/myicon.png"/>
        <p>Please choose one of the options</p>`;
            chat_box.appendChild(answer);
            chat_box.scrollTop = chat_box.scrollHeight;
            startChat();
            return;
        }

        chat_box.appendChild(answer);
        chat_box.scrollTop = chat_box.scrollHeight;
        const back_btn = answer.querySelector('.back_btn');
    }, 1000);
        answer.innerHTML = `<p>Thinking</p>`;
        chat_box.appendChild(answer);
        chat_box.scrollTop = chat_box.scrollHeight;




}

function startChat() {
    const startString = document.createElement('li');
    startString.classList.add('chat');
    startString.classList.add('incoming');
    startString.innerHTML = `<img class="icon" src="../Picturs1/myicon.png"/>
    <p>Hi there!</br>
    Welcome to my portfolio website.</br>
    I'm here to help you learn more about me.</br>
    <button class="option_btn js-option1-btn">Skills and Abilities</button><br />
    <button class="option_btn js-option2-btn">GitHub</button><br />
    <button class="option_btn js-option3-btn">Linkedin</button><br />
    <button class="option_btn js-option4-btn">Projects</button><br /></p>`
    chat_box.appendChild(startString);

    chat_box.scrollTop = chat_box.scrollHeight;

}

start.addEventListener('click', () => {

    if (flag === 0) {
        startChat();
        flag = 1;
    }
    if (flag === 1) {
        chat_container.style.visibility = 'visible';
        start.innerHTML = `<img  class="img_chat_icon" src="../Picturs1/minimize-icon.png" />`;
        flag = 2;
    } else {
        start.innerHTML = `<img  class="img_chat_icon" src="../Picturs1/chaticon.png" />`;
        chat_container.style.visibility = 'hidden';
        flag = 1;
    }


});

sendBtn.addEventListener('click', () => {

    const userInput = document.querySelector('.js-input').value;
    if (userInput !== '') {
        printUserChoose(userInput);
        document.querySelector('.js-input').value = '';
    }

});