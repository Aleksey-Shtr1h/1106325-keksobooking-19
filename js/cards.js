'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var mapPins = document.querySelector('.map__pins');
  var filter = document.querySelector('.map__filters-container');

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');

  // Заполнение карточек
  var renderCard = function (arg, index) {
    var fragmentCard = document.createDocumentFragment();
    var cardElement = cardTemplate.cloneNode(true);
    var featureItem = cardElement.querySelectorAll('.popup__feature');
    var divPhoto = cardElement.querySelector('.popup__photos');
    var imgPhoto = divPhoto.querySelector('img');
    var imgPhotoArray = divPhoto.querySelectorAll('img');

    cardElement.querySelector('.popup__avatar').src = arg[index].author.avatar;

    cardElement.querySelector('.popup__title').textContent = arg[index].offer.title;

    cardElement.querySelector('.popup__text--address').textContent = arg[index].offer.address;

    cardElement.querySelector('.popup__text--price').textContent = arg[index].offer.price + ' ₽/ночь';

    cardElement.querySelector('.popup__type').textContent = window.data.type[arg[index].offer.type];

    cardElement.querySelector('.popup__text--capacity').textContent = window.util.getRoomGuestCard(arg[index].offer.rooms, arg[index].offer.guests);

    cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + arg[index].offer.checkin + ' , выезд до ' + arg[index].offer.checkout;

    window.util.getFeatureItemCard(featureItem, arg[index].offer.features);

    cardElement.querySelector('.popup__description').textContent = arg[index].offer.description;

    window.util.getPhotoCard(arg[index].offer.photos, divPhoto, imgPhoto, imgPhotoArray);

    filter.before(cardElement);

    fragmentCard.appendChild(cardElement);

    mapPins.appendChild(fragmentCard);

    return cardElement;
  };

  // Показ карточек пинов
  function getCardsPins(http) {
    var mapPinsParent = document.querySelector('.map__pins');
    var btnPins = document.querySelectorAll('.map__pin:not(.map__pin--main');

    function closePopupClick(btnClose, cardPopup) {
      btnClose.addEventListener('click', function () {
        cardPopup.remove();
      });
    }

    function closePopupBtnEsx(btnClose, cardPopup) {
      btnClose.addEventListener('keydown', function (evt) {
        if (evt.key === ESC_KEY) {
          cardPopup.remove();
        }
      });
    }

    function showIndexCard(target) {
      btnPins.forEach(function (item, index) {
        if (item === target) {
          window.cards.renderCard(http, index);
          var btnPopupClose = document.querySelector('.popup__close');
          var articlePopup = map.querySelector('.map__card.popup');
          closePopupClick(btnPopupClose, articlePopup);
          closePopupBtnEsx(btnPopupClose, articlePopup);
        }
      });
    }

    function onTargentClick(evt) {
      var target = evt.target;
      if (target.closest('.map__pin')) {
        removeCard();
        showIndexCard(target.closest('.map__pin'));
        evt.stopPropagation();
      } else {
        return;
      }
    }
    mapPinsParent.addEventListener('click', onTargentClick);
  }

  // Удаление карточек пинов
  function removeCard() {
    var activeCard = map.querySelector('.map__card');
    if (activeCard) {
      activeCard.remove();
    }
  }

  window.cards = {
    renderCard: renderCard,
    getCardsPins: getCardsPins,
    removeCard: removeCard,
  };
})();
// window.cards.removeCard
