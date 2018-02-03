var modal = document.querySelector('.modal');
var promoOrderButton = document.querySelector('.promo-product__order');

var showModal = function (event) {
  event.preventDefault();
modal.classList.remove('modal--hidden');
};

var hideModal = function (event) {
  if (event.target === modal) {
    modal.classList.add('modal--hidden');
  }
};

promoOrderButton.addEventListener('click', showModal);
modal.addEventListener('click', hideModal);
