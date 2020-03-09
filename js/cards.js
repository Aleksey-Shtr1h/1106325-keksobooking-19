'use strict';
(function () {
  var ESC_KEY = 'Escape';

  var TypesOfHouses = {
    BUNGALO: 'Бунгало',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
  };

  var body = document.querySelector('body');
  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapPins = map.querySelector('.map__pins');
  var filter = map.querySelector('.map__filters-container');

  function renderCard(dataCard, indexCard) {
    var fragmentCard = document.createDocumentFragment();
    var cardElement = cardTemplate.cloneNode(true);
    var featureItem = cardElement.querySelectorAll('.popup__feature');
    var divPhoto = cardElement.querySelector('.popup__photos');
    var imgPhoto = divPhoto.querySelector('img');
    var imgPhotoArray = divPhoto.querySelectorAll('img');

    cardElement.querySelector('.popup__avatar').src = dataCard[indexCard].author.avatar;

    cardElement.querySelector('.popup__title').textContent = dataCard[indexCard].offer.title;

    cardElement.querySelector('.popup__text--address').textContent = dataCard[indexCard].offer.address;

    cardElement.querySelector('.popup__text--price').textContent = dataCard[indexCard].offer.price + ' ₽/ночь';

    cardElement.querySelector('.popup__type').textContent = TypesOfHouses[dataCard[indexCard].offer.type.toUpperCase()];

    cardElement.querySelector('.popup__text--capacity').textContent = window.util.getRoomGuestCard(dataCard[indexCard].offer.rooms, dataCard[indexCard].offer.guests);

    cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + dataCard[indexCard].offer.checkin + ' , выезд до ' + dataCard[indexCard].offer.checkout;

    window.util.showFeatureCard(featureItem, dataCard[indexCard].offer.features);

    cardElement.querySelector('.popup__description').textContent = dataCard[indexCard].offer.description;

    window.util.showPhotoCard(dataCard[indexCard].offer.photos, divPhoto, imgPhoto, imgPhotoArray);

    filter.before(cardElement);

    fragmentCard.appendChild(cardElement);

    mapPins.appendChild(fragmentCard);

    return cardElement;
  }

  function showCard(dataCard) {
    var mapPinsParent = document.querySelector('.map__pins');
    var btnPins = document.querySelectorAll('.map__pin:not(.map__pin--main');

    function showIndexCard(target) {
      window.pins.addActiveClass(target);
      btnPins.forEach(function (item, index) {
        if (item === target) {
          renderCard(dataCard, index);
          var btnPopupClose = document.querySelector('.popup__close');
          var articlePopup = map.querySelector('.map__card.popup');
          closePopupClick(btnPopupClose, articlePopup, mapPinsParent);
          closePopupKeydown(btnPopupClose, articlePopup);
        }
      });
    }

    function onTargetClick(evt) {
      var target = evt.target;
      if (!target.closest('.map__pin')) {
        return;
      }
      removeCard();
      window.pins.removeActiveClass();
      showIndexCard(target.closest('.map__pin'));
      evt.stopPropagation();
    }
    mapPinsParent.removeEventListener('click', onTargetClick);
    mapPinsParent.addEventListener('click', onTargetClick);
  }

  function closePopupClick(btnClose, cardPopup) {
    btnClose.addEventListener('click', function () {
      cardPopup.remove();
    });
  }

  function closePopupKeydown(btnClose, cardPopup) {
    btnClose.addEventListener('keydown', function (evtBtn) {
      if (evtBtn.key === ESC_KEY) {
        cardPopup.remove();
      }
    });

    body.addEventListener('keydown', function (evtBody) {
      if (evtBody.key === ESC_KEY) {
        cardPopup.remove();
      }
    });
  }

  function removeCard() {
    var activeCard = map.querySelector('.map__card');
    if (activeCard) {
      activeCard.remove();
    }
  }

  window.cards = {
    render: renderCard,
    remove: removeCard,
    show: showCard,
  };
})();
