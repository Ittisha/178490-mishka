var mainNav = document.querySelector('.main-nav');
var navButton = document.querySelector('.main-nav__toggle');
var navButtonText = navButton.querySelector('span');

mainNav.classList.remove('main-nav--no-js');

var navButtonClick = function (event) {
  event.preventDefault();

  if (mainNav.classList.contains('main-nav--closed')) {
    mainNav.classList.remove('main-nav--closed');
    mainNav.classList.add('main-nav--opened');
    navButtonText.innerText = 'Закрыть меню';
  } else {
    mainNav.classList.remove('main-nav--opened');
    mainNav.classList.add('main-nav--closed');
    navButtonText.innerText = 'Открыть меню';
  }
};

navButton.addEventListener('click', navButtonClick);
