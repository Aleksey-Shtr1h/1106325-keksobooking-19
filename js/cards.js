'use strict';
(function () {
  var mapPins = document.querySelector('.map__pins');
  var filter = document.querySelector('.map__filters-container');

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var renderCard = function (arg) {
    var fragmentCard = document.createDocumentFragment();
    var cardElement = cardTemplate.cloneNode(true);
    var featureList = cardElement.querySelector('.popup__features');
    var featureItem = cardElement.querySelectorAll('.popup__feature');

    var cardPhoto = cardElement.querySelector('.popup__photos');
    var photo = cardPhoto.querySelector('img');
    var cardPhotosArray = cardPhoto.querySelectorAll('img');

    var getTypeCard = function (elementType) {
      if (arg[0].offer.type === 'palace') {
        elementType = 'Дворец';
      } else if (arg[0].offer.type === 'flat') {
        elementType = 'Квартира';
      } else if (arg[0].offer.type === 'house') {
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

    cardElement.querySelector('.popup__avatar').src = arg[0].author.avatar;
    cardElement.querySelector('.popup__title').textContent = arg[0].offer.title;
    cardElement.querySelector('.popup__text--address').textContent = arg[0].offer.address;
    cardElement.querySelector('.popup__text--price').textContent = arg[0].offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getTypeCard(cardElement.querySelector('.popup__type').textContent);
    cardElement.querySelector('.popup__text--capacity').textContent = getRoomGuestCard(arg[0].offer.rooms, arg[0].offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = 'заезд после ' + arg[0].offer.checkin + ' , выезд до ' + arg[0].offer.checkout;

    if (arg[0].offer.feature.length > 0) {
      myFun(featureItem, featureList, arg[0].offer.feature);
    } else {
      cardElement.querySelector('.popup__features').style.display = 'none';
    }

    cardElement.querySelector('.popup__description').textContent = arg[0].offer.description;

    for (var k = 0; k < arg[0].offer.photos.length; k++) {
      var photoElement = photo.cloneNode(true);
      photoElement.src = arg[0].offer.photos[k];
      cardPhoto.append(photoElement);
    }
    cardPhotosArray[0].remove();

    filter.before(cardElement);

    fragmentCard.appendChild(cardElement);

    // cardElement.classList.add('hidden');
    mapPins.appendChild(fragmentCard);
  };

  window.cards = {
    renderCard: renderCard(window.data.arrayOfObjects),
  };
})();

