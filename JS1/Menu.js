/*
 * Open new tab with some url or html file
window.open('../HTML1/HomePage.html');
*/

document.querySelector('.js-home-page-button').addEventListener('click', () => {
    window.location.href = '/Portfolio/HTML1/HtmlPage1.html';
});
document.querySelector('.js-about-me-button').addEventListener('click', () => {
    window.location.href = '/Portfolio/HTML1/AboutMe.html';
});
document.querySelector('.js-trivia-game-button').addEventListener('click', () => {
    window.location.href = '/Portfolio/HTML1/TriviaGame.html';
});
document.querySelector('.js-memory-game-button').addEventListener('click', () => {
    window.location.href = '/Portfolio/HTML1/MemoryGame.html';
});
document.querySelector('.js-flags-game-button').addEventListener('click', () => {
    window.location.href = '/Portfolio/HTML1/FlagsGame.html'
})
document.querySelector('.js-missions-button').addEventListener('click', () => {
    window.location.href = '/Portfolio/HTML1/Missions.html';
});
document.querySelector('.js-contact-button').addEventListener('click', () => {
    window.location.href = '/Portfolio/HTML1/Contact.html';
});
document.querySelector('.logo').addEventListener('click', () => {
    console.log('Hello');
    window.location.href = '/Portfolio/HTML1/HtmlPage1.html';
});