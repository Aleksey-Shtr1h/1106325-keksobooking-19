'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var filter = document.querySelector('.map__filters-container');

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');

  var renderCard = function (arg, index) {
    var fragmentCard = document.createDocumentFragment();
    var cardElement = cardTemplate.cloneNode(true);
    var featureList = cardElement.querySelector('.popup__features');
    var featureItem = cardElement.querySelectorAll('.popup__feature');

    var cardPhoto = cardElement.querySelector('.popup__photos');
    var photo = cardPhoto.querySelector('img');
    var cardPhotosArray = cardPhoto.querySelectorAll('img');

    var getTypeCard = function (elementType) {
      if (arg[index].offer.type === 'palace') {
        elementType = 'Дворец';
      } else if (arg[index].offer.type === 'flat') {
        elementType = 'Квартира';
      } else if (arg[index].offer.type === 'house') {
        elementType = 'Дом';
      } else {
        elementType = 'Бунгало';
      }
      return elementType;
    };

    var getRoomGuestCard = function (valueRoom, valueGuest) {
      var roomValue = '';
      var guestValue = '';
      if (valueRoom === 1) {
        roomValue = ' комната';
      } else if (valueRoom > 1 && valueRoom < 5) {
        roomValue = ' комнаты';
      } else {
        roomValue = ' комнат';
      }

      if (valueGuest === 1) {
        guestValue = ' гостя';
      } else {
        guestValue = ' гостей';
      }
      return valueRoom + roomValue + ' для ' + valueGuest + guestValue;
    };

    var myFun = function (array, list, elem) {
      for (var i = 0; i < array.length; i++) {
        array[i].style.display = 'none';
      }

      for (var j = 0; j < array.length; j++) {
        if (array[j].className === 'popup__feature popup__feature--wifi') {
          elem.forEach(function (item) {
            if (item === 'wifi') {
              array[j].style.display = 'inline-block';
            }
          });
        } else if (array[j].className === 'popup__feature popup__feature--dishwasher') {
          elem.forEach(function (item) {
            if (item === 'dishwasher') {
              array[j].style.display = 'inline-block';
            }
          });
        } else if (array[j].className === 'popup__feature popup__feature--parking') {
          elem.forEach(function (item) {
            if (item === 'parking') {
              array[j].style.display = 'inline-block';
            }
          });
        } else if (array[j].className === 'popup__feature popup__feature--washer') {
          elem.forEach(function (item) {
            if (item === 'washer') {
              array[j].style.display = 'inline-block';
            }
          });
        } else if (array[j].className === 'popup__feature popup__feature--elevator') {
          elem.forEach(function (item) {
            if (item === 'elevator') {
              array[j].style.display = 'inline-block';
            }
          });
        } else {
          elem.forEach(function (item) {
            if (item === 'conditioner') {
              array[j].style.display = 'inline-block';
            }
          });
        }
      }
    };

    cardElement.querySelector('.popup__avatar').src = arg[index].author.avatar;
    cardElement.querySelector('.popup__title').textContent = arg[index].offer.title;
    cardElement.querySelector('.popup__text--address').textContent = arg[index].offer.address;
    cardElement.querySelector('.popup__text--price').textContent = arg[index].offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getTypeCard(cardElement.querySelector('.popup__type').textContent);
    cardElement.querySelector('.popup__text--capacity').textContent = getRoomGuestCard(arg[index].offer.rooms, arg[index].offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + arg[index].offer.checkin + ' , выезд до ' + arg[index].offer.checkout;

    if (arg[index].offer.feature.length > 0) {
      myFun(featureItem, featureList, arg[index].offer.feature);
    } else {
      cardElement.querySelector('.popup__features').style.display = 'none';
    }

    cardElement.querySelector('.popup__description').textContent = arg[index].offer.description;

    for (var k = 0; k < arg[index].offer.photos.length; k++) {
      var photoElement = photo.cloneNode(true);
      photoElement.src = arg[index].offer.photos[k];
      cardPhoto.append(photoElement);
    }
    cardPhotosArray[0].remove();

    filter.before(cardElement);

    fragmentCard.appendChild(cardElement);

    mapPins.appendChild(fragmentCard);

    return cardElement;
  };

  function getCardsPins() {
    var ESC_KEY = 'Escape';
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

    function showIndexCard(td) {
      var activeCard = map.querySelector('.map__card');
      if (activeCard) {
        activeCard.remove();
      }
      btnPins.forEach(function (item, index) {
        if (item === td) {
          window.cards.renderCard(window.data.arrayOfObjects, index);
          var btnPopupClose = document.querySelector('.popup__close');
          var articlePopup = map.querySelector('.map__card.popup');
          closePopupClick(btnPopupClose, articlePopup);
          closePopupBtnEsx(btnPopupClose, articlePopup);
        }
      });
    }

    mapPinsParent.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.closest('.map__pin')) {
        showIndexCard(target.closest('.map__pin'));
      } else {
        return;
      }
    });
  }

  window.cards = {
    renderCard: renderCard,
    getCardsPins: getCardsPins,
  };
})();

