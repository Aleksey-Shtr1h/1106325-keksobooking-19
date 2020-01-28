'use strict';

var objCount = 8;
var avatars = [];
var titles = ['apartment', 'studio', 'room', 'garage', 'house'];
var addressNumbers = [];
var prices = [];
var types = ['palace', 'flat', 'house', 'bungalo'];
var roomsNumbers = [];
var guestsNumbers = [];
var checkins = ['12:00', '13:00', '14:00'];
var checkouts = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var descriptions = ['best property', 'comfortable', 'near the subway', 'to city center'];
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
var xValues = [];
var yValues = [];

var getRandomValues = function (count) {
  for (var i = 1; i <= count; i++) {
    var valueAddres = String(Math.round(200 - 0.5 + Math.random() * (650 - 200 + 1)));
    addressNumbers.push(valueAddres);

    var price = Math.floor(Math.random() * 5000) * 1200;
    prices.push(price);

    var valuesX = Math.round(100 - 0.5 + Math.random() * (800 - 100 + 1));
    xValues.push(valuesX);

    var valuesY = Math.round(130 - 0.5 + Math.random() * (630 - 130 + 1));
    yValues.push(valuesY);

    var avatar = 'img/avatars/user0' + i + '.png';
    avatars.push(avatar);

    var room = Math.round(1 - 0.5 + Math.random() * 7);
    roomsNumbers.push(room);

    var guest = Math.round(1 - 0.5 + Math.random() * 12);
    guestsNumbers.push(guest);
  }
};

getRandomValues(objCount);

var renderRandomValues = function (countArray) {
  return Math.floor(Math.random() * countArray.length);
};

var arrayOfObjects = [];

var getArrayOfObjects = function (count) {
  for (var i = 0; i < count; i++) {
    arrayOfObjects.push({
      author: {
        avatar: avatars[i],
      },
      offer: {
        title: titles[renderRandomValues(titles)],
        address: addressNumbers[renderRandomValues(addressNumbers)],
        price: prices[renderRandomValues(prices)],
        type: types[renderRandomValues(types)],
        rooms: roomsNumbers[renderRandomValues(roomsNumbers)],
        guests: guestsNumbers[renderRandomValues(guestsNumbers)],
        checkin: checkins[renderRandomValues(checkins)],
        checkout: checkouts[renderRandomValues(checkouts)],
        features: features[renderRandomValues(features)],
        description: descriptions[renderRandomValues(descriptions)],
        photos: photos[renderRandomValues(photos)],
      },
      location: {
        x: xValues[renderRandomValues(xValues)],
        y: yValues[renderRandomValues(yValues)],
      }
    });
  }
  return arrayOfObjects;
};

getArrayOfObjects(objCount);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var mapPins = document.querySelector('.map__pins');

var renderPin = function (arg) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arrayOfObjects.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = arg[i].location.x + 'px';
    pinElement.style.top = arg[i].location.y + 'px';
    pinElement.querySelector('img').src = arg[i].author.avatar;
    pinElement.querySelector('img').alt = arg[i].offer.title;

    fragment.appendChild(pinElement);
  }
  mapPins.appendChild(fragment);
};

renderPin(arrayOfObjects);
