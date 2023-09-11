const scroll = document.querySelector('.js-scroll');

scroll.addEventListener('click', () => {
    console.log('Hello');
    const targetElement = document.querySelector('#home_page_text_destination');
    const targetOffset = targetElement.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({ top: targetOffset, behavior: 'smooth' });

    slidingImage.style.transition = 'transform 1s ease';
    slidingImage.style.transform = 'translateX(200px)';

    setTimeout(() => slidingImage.style.transform = 'translateX(0)', 1000);
});
