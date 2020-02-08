'use strict';

(function () {

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
    window.pin.renderPin(window.data.arrayOfObjects);
    // window.cards.renderCard;
  };

  var onTurnOnLeftButton = function (evt) {
    if (evt.button === 0) {
      enabledForm();
    }
  };

  var onAdjustRoomToGuest = function () {
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

  mainIconButton.addEventListener('mousedown', function () {
    document.addEventListener('mousedown', onTurnOnLeftButton);
  });

  mainIconButton.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      enabledForm();
    }
  });

  selectRoomNumber.addEventListener('change', onAdjustRoomToGuest);

  activateOffFormElement(formFieldsets);
  userInputAddress.value = indicateCoordinates();

})();
