'use strict';

(function () {

  var featureDependence = {
    'popup__feature popup__feature--wifi': 'wifi',
    'popup__feature popup__feature--dishwasher': 'dishwasher',
    'popup__feature popup__feature--parking': 'parking',
    'popup__feature popup__feature--washer': 'washer',
    'popup__feature popup__feature--elevator': 'elevator',
    'popup__feature popup__feature--conditioner': 'conditioner',
  };

  // var RoomsForGuest = [
  //   {ROOM: 1, CAPACITY: 1},
  //   {ROOM: 2, CAPACITY: 2},
  //   {ROOM: 3, CAPACITY: 3},
  //   {ROOM: 100, CAPACITY: 0},
  // ];

  // var FilterValuePrice = [
  //   {HOUSE_PRICE: 'any', MIN_PRICE: undefined, MAX_PRICE: undefined},
  //   {HOUSE_PRICE: 'low', MIN_PRICE: 0, MAX_PRICE: 10000},
  //   {HOUSE_PRICE: 'middle', MIN_PRICE: 10001, MAX_PRICE: 49999},
  //   {HOUSE_PRICE: 'high', MIN_PRICE: 50000, MAX_PRICE: Infinity},
  // ];

  window.data = {
    featureDependence: featureDependence,
    // roomsForGuest: RoomsForGuest,
    // filterValueStart: FilterValueStart,
    // filterValuePrice: FilterValuePrice,
    // filterValueGuest: FilterValueGuest,
  };

})();
// window.data.type
