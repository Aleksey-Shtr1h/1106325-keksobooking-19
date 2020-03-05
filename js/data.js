'use strict';

(function () {

  var type = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  var TypeToPrice = [
    {TYPE: 'bungalo', MIN: 'min', PRICE: '0', MESSAGE: 'Цена от 0 до 1000 - это бунгало'},
    {TYPE: 'flat', MIN: 'min', PRICE: '1000', MESSAGE: 'Цена от 1000 до 5000 - это бунгало'},
    {TYPE: 'house', MIN: 'min', PRICE: '5000', MESSAGE: 'Цена от 5000 до 10000 - это бунгало'},
    {TYPE: 'palace', MIN: 'min', PRICE: '10000', MESSAGE: 'Цена от 10000 до 1000000 - это бунгало'},
  ];

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

  var filterValueStart = {
    ANY: 'any',
  };

  var filterValuePrice = [
    {HOUSE_PRICE: 'any', MIN_PRICE: undefined, MAX_PRICE: undefined},
    {HOUSE_PRICE: 'low', MIN_PRICE: 0, MAX_PRICE: 10000},
    {HOUSE_PRICE: 'middle', MIN_PRICE: 10001, MAX_PRICE: 49999},
    {HOUSE_PRICE: 'high', MIN_PRICE: 50000, MAX_PRICE: Infinity},
  ];

  var filterValueGuest = {
    ROOM_MIN: 0,
    ROOM_MAX: 100,
  };

  window.data = {
    featureDependence: featureDependence,
    type: type,
    TypeToPrice: TypeToPrice,
    roomsForGuest: roomsForGuest,
    filterValueStart: filterValueStart,
    filterValuePrice: filterValuePrice,
    filterValueGuest: filterValueGuest,
  };

})();
// window.data.filterValueGuest
