'use strict';

(function () {
  var objCount = 8;
  var titles = ['apartment', 'studio', 'room', 'garage', 'house'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkins = ['12:00', '13:00', '14:00'];
  var checkouts = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var descriptions = ['best property', 'comfortable', 'near the subway', 'to city center'];
  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];

  var avatars = [];
  var addressNumbers = [];
  var prices = [];
  var roomsNumbers = [];
  var guestsNumbers = [];
  var xValues = [];
  var yValues = [];
  var iconWidth = 50;
  var locationMinY = 130;
  var locationMaxY = 630;
  var valueAddresMin = 200;
  var valueAddresMax = 650;
  var roomMin = 1;
  var roomMax = 7;
  var guestMin = 1;
  var guestMax = 12;
  var priceMin = 100000;
  var priceMax = 9000000;

  var mapBlock = document.querySelector('.map').offsetWidth;

  //  Главный сгенерированный массив случайных меток
  var arrayOfObjects = [];

  var getRandomValues = function (count) {
    for (var i = 1; i <= count; i++) {

      addressNumbers.push(String(window.util.selectRandomValues(valueAddresMin, valueAddresMax)));

      prices.push(window.util.selectRandomValues(priceMin, priceMax));

      var avatar = 'img/avatars/user0' + i + '.png';
      avatars.push(avatar);

      roomsNumbers.push(window.util.selectRandomValues(roomMin, roomMax));
      guestsNumbers.push(window.util.selectRandomValues(guestMin, guestMax));
      xValues.push(window.util.selectRandomValues(iconWidth, mapBlock));
      yValues.push(window.util.selectRandomValues(locationMinY, locationMaxY));
    }
  };

  getRandomValues(objCount);

  var getArrayOfObjects = function (count) {
    for (var i = 0; i < count; i++) {
      arrayOfObjects.push({
        author: {
          avatar: avatars[i],
        },
        offer: {
          title: titles[window.util.renderRandomValues(titles)],
          address: addressNumbers[window.util.renderRandomValues(addressNumbers)],
          price: prices[window.util.renderRandomValues(prices)],
          type: types[window.util.renderRandomValues(types)],
          rooms: roomsNumbers[window.util.renderRandomValues(roomsNumbers)],
          guests: guestsNumbers[window.util.renderRandomValues(guestsNumbers)],
          checkin: checkins[window.util.renderRandomValues(checkins)],
          checkout: checkouts[window.util.renderRandomValues(checkouts)],
          feature: window.util.getLengthArray(features),
          description: descriptions[window.util.renderRandomValues(descriptions)],
          photos: window.util.getLengthArray(photos),
        },
        location: {
          x: xValues[window.util.renderRandomValues(xValues)],
          y: yValues[window.util.renderRandomValues(yValues)],
        }
      });
    }
    return arrayOfObjects;
  };

  getArrayOfObjects(objCount);

  window.data = {
    arrayOfObjects: arrayOfObjects,
  };

})();
