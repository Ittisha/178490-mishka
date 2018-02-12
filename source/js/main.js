var ESC_CODE = 27;

var mainNav = document.querySelector('.main-nav');
var navButton = document.querySelector('.main-nav__toggle');
var navButtonText = navButton.querySelector('span');
var modal = document.querySelector('.modal');
var modalCloseButton = document.querySelector('.modal__close');
var pageMain = document.querySelector('.page-main');
var mapContainer = document.querySelector('.contacts__map');

if (mainNav) {
  mainNav.classList.remove('main-nav--no-js');
}

if (navButton && mainNav && navButtonText) {

  var onNavButtonClick = function (event) {
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

  navButton.addEventListener('click', onNavButtonClick);
}

if (pageMain && modal && modalCloseButton) {
  var onModalButtonClick = function (event) {
    event.preventDefault();

    if (event.target.classList.contains('promo-product__order') || event.target.parentNode.classList.contains('product__order') || event.target.parentNode.classList.contains('product__icon-cart')) {
      modal.classList.remove('modal--hidden');
    }
  };

  var modalClose = function () {
    modal.classList.add('modal--hidden');
  };

  var onModalOverlayClick = function (event) {
    if (event.target === modal) {
      modalClose();
    }
  };

  var onCloseButtonClick = function () {
    event.preventDefault();
    modalClose();
  };

  var onModalEscPress = function (event) {
    if (event.keyCode === ESC_CODE) {
      modalClose();
    }
  };

  pageMain.addEventListener('click', onModalButtonClick);
  modal.addEventListener('click', onModalOverlayClick);
  modalCloseButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onModalEscPress);
}

if (mapContainer) {
  function initMap() {
    var center = {lat: 59.938660, lng: 30.323000};
    var pin = 'img/icon-map-pin.svg';

    var map = new google.maps.Map(mapContainer, {
      zoom: 16,
      center: center
    });

    var marker = new google.maps.Marker({
      position: center,
      map: map,
      icon: pin
    });
  }
}
