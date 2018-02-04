var modal = document.querySelector('.modal');
var pageMain = document.querySelector('.page-main');

var showModal = function (event) {
  event.preventDefault();

  if (event.target.classList.contains('promo-product__order') || event.target.classList.contains('product__order')) {
    modal.classList.remove('modal--hidden');
  }
};

var hideModal = function (event) {
  if (event.target === modal) {
    modal.classList.add('modal--hidden');
  }
};

pageMain.addEventListener('click', showModal);

modal.addEventListener('click', hideModal);
