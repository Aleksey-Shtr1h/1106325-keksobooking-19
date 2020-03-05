'use strict';

(function () {

  var type = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  var TypeToPrice = [
    {TYPE: 'bungalo', PRICEMIN: '0', PRICEMAX: '999', MESSAGE: 'Цена от 0 до 1000 - это бунгало'},
    {TYPE: 'flat', PRICEMIN: '1000', PRICEMAX: '4999', MESSAGE: 'Цена от 1000 до 5000 - это квартира'},
    {TYPE: 'house', PRICEMIN: '5000', PRICEMAX: '9999', MESSAGE: 'Цена от 5000 до 10000 - это дом'},
    {TYPE: 'palace', PRICEMIN: '10000', PRICEMAX: '999999', MESSAGE: 'Цена от 10000 до 1000000 - это дворец'},
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
