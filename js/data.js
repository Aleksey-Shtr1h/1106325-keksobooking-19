'use strict';

(function () {
  var objCount = 8;
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
  var guestMax = 7;
  var priceMin = 3000;
  var priceMax = 20000;

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

  var successHandler = function (pins) {
    for (var i = 0; i < 8; i++) {
      arrayOfObjects.push(pins[i]);
    }
    return arrayOfObjects;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  window.data = {
    arrayOfObjects: arrayOfObjects,
  };

})();
