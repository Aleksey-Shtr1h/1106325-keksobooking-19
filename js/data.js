'use strict';

(function () {

  var type = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец',
  };

  var featureDependence = {
    'popup__feature popup__feature--wifi': 'wifi',
    'popup__feature popup__feature--dishwasher': 'dishwasher',
    'popup__feature popup__feature--parking': 'parking',
    'popup__feature popup__feature--washer': 'washer',
    'popup__feature popup__feature--elevator': 'elevator',
    'popup__feature popup__feature--conditioner': 'conditioner',
  };

  var roomsForGuest = [
    {ROOM: 1, CAPACITY: 1},
    {ROOM: 2, CAPACITY: 2},
    {ROOM: 3, CAPACITY: 3},
    {ROOM: 100, CAPACITY: 0},
  ];


  window.data = {
    featureDependence: featureDependence,
    type: type,
    roomsForGuest: roomsForGuest,
  };

})();
