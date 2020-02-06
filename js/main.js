'use strict';

var ENTER_KEY = 'Enter';
var map = document.querySelector('.map');
var mainIconButton = map.querySelector('.map__pin--main');
var mainForm = document.querySelector('.ad-form');
var formFieldsets = mainForm.querySelectorAll('.ad-form fieldset');
var userInputAddress = mainForm.querySelector('#address');
var selectRoomNumber = mainForm.querySelector('#room_number');
var selectCapacity = mainForm.querySelector('#capacity');
var iconMainWidth = mainIconButton.offsetWidth;
var iconMainHieght = mainIconButton.offsetHeight;
var iconMainHeightAfter = 22;

function activateOffFormElement(arrayAtr) {
  for (var i = 0; i < arrayAtr.length; i++) {
    arrayAtr[i].setAttribute('disabled', '');
  }
}

function activateFormElement(arrayAtr) {
  for (var i = 0; i < arrayAtr.length; i++) {
    arrayAtr[i].removeAttribute('disabled');
  }
}

var indicateCoordinates = function () {
  var leftCoordinate = parseInt(mainIconButton.style.left, 10);
  var topCoordinate = parseInt(mainIconButton.style.top, 10);
  var addressElementary = Math.round(leftCoordinate + iconMainWidth / 2) + ', ' + Math.round(topCoordinate + iconMainHieght + iconMainHeightAfter);
  return addressElementary;
};

var enabledForm = function () {
  map.classList.remove('map--faded');
  mainForm.classList.remove('ad-form--disabled');
  activateFormElement(formFieldsets);
  userInputAddress.value = indicateCoordinates();
};

var onTurnOnLeftButton = function (evt) {
  if (evt.button === 0) {
    enabledForm();
  }
};

var onSynchronizationRoomToGuest = function () {
  for (var i = 0; i < selectRoomNumber.length; i++) {
    if (selectRoomNumber.item(i).selected) {
      for (var j = 0; j < selectCapacity.length; j++) {
        if (selectCapacity.options[j].value === selectRoomNumber.options[i].value) {
          selectCapacity.item(j).selected = true;
        } else if (selectRoomNumber.options[i].value === '100') {
          selectCapacity.item(j).selected = true;
        }
      }
    }
  }
};

var validationRoomToGuest = function () {
  var roomValue = Number(selectRoomNumber.value);
  var questValue = Number(selectCapacity.value);

  if (roomValue !== 100 && questValue === 0) {
    selectCapacity.setCustomValidity('Выберете колличество гостей');
  } else if (roomValue === 100 && questValue !== 0) {
    selectCapacity.setCustomValidity('Не предназначенно для гостей');
  } else if (roomValue < questValue) {
    selectCapacity.setCustomValidity('Гостей надо поменьше');
  } else {
    selectCapacity.setCustomValidity('');
  }
};

mainIconButton.addEventListener('mousedown', function () {
  document.addEventListener('mousedown', onTurnOnLeftButton);
});

mainIconButton.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    enabledForm();
  }
});
selectRoomNumber.addEventListener('change', onSynchronizationRoomToGuest);
selectCapacity.addEventListener('input', validationRoomToGuest);


activateOffFormElement(formFieldsets);
userInputAddress.value = indicateCoordinates();

// 'use strict';

// var objCount = 8;
// var avatars = [];
// var titles = ['apartment', 'studio', 'room', 'garage', 'house'];
// var addressNumbers = [];
// var prices = [];
// var types = ['palace', 'flat', 'house', 'bungalo'];
// var roomsNumbers = [];
// var guestsNumbers = [];
// var checkins = ['12:00', '13:00', '14:00'];
// var checkouts = ['12:00', '13:00', '14:00'];
// var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var descriptions = ['best property', 'comfortable', 'near the subway', 'to city center'];
// var photos = [
//   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
// ];
// var xValues = [];
// var yValues = [];

// var mapBlock = document.querySelector('.map').offsetWidth;
// var iconHeight = 70;
// var iconWidth = 50;
// var locationMinY = 130;
// var locationMaxY = 630;
// var valueAddresMin = 200;
// var valueAddresMax = 650;
// var roomMin = 1;
// var roomMax = 7;
// var guestMin = 1;
// var guestMax = 12;
// var priceMin = 100000;
// var priceMax = 9000000;

// var getRandomValues = function (count) {
//   for (var i = 1; i <= count; i++) {

//     addressNumbers.push(String(selectRandomValuse(valueAddresMin, valueAddresMax)));

//     prices.push(selectRandomValuse(priceMin, priceMax));

//     var avatar = 'img/avatars/user0' + i + '.png';
//     avatars.push(avatar);

//     roomsNumbers.push(selectRandomValuse(roomMin, roomMax));
//     guestsNumbers.push(selectRandomValuse(guestMin, guestMax));
//     xValues.push(selectRandomValuse(iconWidth, mapBlock));
//     yValues.push(selectRandomValuse(locationMinY, locationMaxY));
//   }
// };

// var selectRandomValuse = function (min, max) {
//   return Math.round(min - 0.5 + Math.random() * (max - min + 1));
// };

// getRandomValues(objCount);

// var renderRandomValues = function (countArray) {
//   return Math.floor(Math.random() * countArray.length);
// };

// function getAdjustArray(arg) {
//   var adjust = [];

//   for (var i = 0; i < arg.length; i++) {
//     if (!adjust.includes(arg[i])) {
//       adjust.push(arg[i]);
//     }
//   }
//   return adjust;
// }

// function getLengthArray(arg) {
//   var result = [];
//   var len = 1 - 0.5 + Math.random() * arg.length;
//   for (var i = 0; i < len; i++) {
//     result.push(arg[i]);
//   }
//   return getAdjustArray(result);
// }

// var arrayOfObjects = [];

// var getArrayOfObjects = function (count) {
//   for (var i = 0; i < count; i++) {
//     arrayOfObjects.push({
//       author: {
//         avatar: avatars[i],
//       },
//       offer: {
//         title: titles[renderRandomValues(titles)],
//         address: addressNumbers[renderRandomValues(addressNumbers)],
//         price: prices[renderRandomValues(prices)],
//         type: types[renderRandomValues(types)],
//         rooms: roomsNumbers[renderRandomValues(roomsNumbers)],
//         guests: guestsNumbers[renderRandomValues(guestsNumbers)],
//         checkin: checkins[renderRandomValues(checkins)],
//         checkout: checkouts[renderRandomValues(checkouts)],
//         feature: getLengthArray(features),
//         description: descriptions[renderRandomValues(descriptions)],
//         photos: getLengthArray(photos),
//       },
//       location: {
//         x: xValues[renderRandomValues(xValues)],
//         y: yValues[renderRandomValues(yValues)],
//       }
//     });
//   }
//   return arrayOfObjects;
// };

// getArrayOfObjects(objCount);


// var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// var mapPins = document.querySelector('.map__pins');

// var renderPin = function (arg) {
//   var fragment = document.createDocumentFragment();

//   for (var i = 0; i < arrayOfObjects.length; i++) {
//     var pinElement = pinTemplate.cloneNode(true);

//     pinElement.style.left = (arg[i].location.x - iconWidth / 2) + 'px';
//     pinElement.style.top = (arg[i].location.y - iconHeight) + 'px';

//     pinElement.querySelector('img').src = arg[i].author.avatar;
//     pinElement.querySelector('img').alt = arg[i].offer.title;

//     fragment.appendChild(pinElement);
//   }
//   mapPins.appendChild(fragment);
// };

// renderPin(arrayOfObjects);

