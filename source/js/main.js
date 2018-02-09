var mainNav = document.querySelector('.main-nav');
var navButton = document.querySelector('.main-nav__toggle');
var navButtonText = navButton.querySelector('span');
var modal = document.querySelector('.modal');
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

if (pageMain && modal) {
  var onModalButtonClick = function (event) {
    event.preventDefault();

    if (event.target.classList.contains('promo-product__order') || event.target.classList.contains('product__order')) {
      modal.classList.remove('modal--hidden');
    }
  };

  var onModalOverlayClick = function (event) {
    if (event.target === modal) {
      modal.classList.add('modal--hidden');
    }
  };

  pageMain.addEventListener('click', onModalButtonClick);
  modal.addEventListener('click', onModalOverlayClick);
}

if (mapContainer) {
  function initMap() {
    var center = {lat: 59.938660, lng: 30.323000};
    var pin = "../img/icon-map-pin.svg";

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
