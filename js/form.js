'use strict';

(function () {

  var ENTER_KEY = 'Enter';
  var map = document.querySelector('.map');
  var mainIconButton = map.querySelector('.map__pin--main');
  var mainForm = document.querySelector('.ad-form');
  var formFieldsets = mainForm.querySelectorAll('.ad-form fieldset');
  var userInputAddress = mainForm.querySelector('#address');
  var selectRoomNumber = mainForm.querySelector('#room_number');
  var selectRoomNumberOption = mainForm.querySelectorAll('#room_number option');
  var selectCapacity = mainForm.querySelector('#capacity');
  // var selectCapacityOption = mainForm.querySelectorAll('#capacity option');
  var resetBtn = mainForm.querySelector('.ad-form__reset');
  var wrapperMapFilter = document.querySelector('.map__filters-container');
  var mapFilter = wrapperMapFilter.querySelector('.map__filters');
  var mapFilterSelect = wrapperMapFilter.querySelectorAll('.map__filters select');
  var mapFilterFieldset = wrapperMapFilter.querySelector('.map__filters fieldset');
  var iconMainWidth = mainIconButton.offsetWidth;
  var iconMainHieght = mainIconButton.offsetHeight;
  var iconMainHeightAfter = 22;
  var topAddress = mainIconButton.style.top;
  var leftAddress = mainIconButton.style.left;


  // для задания.......................................................
  var priceForm = document.querySelector('#price'); //  ...................
  priceForm.value = 5000; //  .............................................
  var titleForm = document.querySelector('#title'); //  ...................
  titleForm.value = 'Et id sunt veniam velit proident excepteur laboris adipisicing adipisicing dolore minim.'; //  ...........................

  function activateOffFormElement(arrayAtr) {
    for (var i = 0; i < arrayAtr.length; i++) {
      arrayAtr[i].setAttribute('disabled', '');
      userInputAddress.value = indicateCoordinates(leftAddress, topAddress);
    }
  }

  function activateFormElement(arrayAtr) {
    for (var i = 0; i < arrayAtr.length; i++) {
      arrayAtr[i].removeAttribute('disabled');
    }
  }

  var indicateCoordinates = function (left, top) {
    var leftCoordinate = parseInt(left, 10);
    var topCoordinate = parseInt(top, 10);
    var addressElementary = Math.round(leftCoordinate + iconMainWidth / 2) + ', ' + Math.round(topCoordinate + iconMainHieght + iconMainHeightAfter);
    return addressElementary;
  };

  var enabledForm = function () {
    map.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    onAdjustRoomToGuest();
    activateFormElement(formFieldsets);
    window.filterPins.activateOffmapFilter(mapFilter, mapFilterSelect, mapFilterFieldset);
    window.backend.load(window.xmlHttpRequest.successHandler, window.xmlHttpRequest.errorHandler);
    window.backend.xmlHttpSetup();
    mainIconButton.removeEventListener('mousedown', onTurnOnLeftButton);
  };

  var onTurnOnLeftButton = function (evt) {
    if (evt.button === 0) {
      enabledForm();
    }
  };

  var onAdjustRoomToGuest = function () {
    selectRoomNumberOption.forEach(function (roomElem, index) {
      if (selectRoomNumber.selectedIndex === index) {
        var result = window.data.roomsForGuest.find(function (item) {
          return item.ROOM === Number(roomElem.value);
        });
        selectCapacity.value = result.CAPACITY;
      }
    });
    window.valid.onValidationRoomToGuest();
  };

  function showActivePage() {
    mainIconButton.addEventListener('mousedown', onTurnOnLeftButton);
    mainIconButton.addEventListener('keydown', function (evt) {
      if (evt.key === ENTER_KEY) {
        enabledForm();
      }
    });
  }

  showActivePage();

  selectRoomNumber.addEventListener('change', onAdjustRoomToGuest);

  resetBtn.addEventListener('click', function () {
    mainForm.reset();
  });

  activateOffFormElement(formFieldsets);

  window.form = {
    indicateCoordinates: indicateCoordinates,
    onTurnOnLeftButton: onTurnOnLeftButton,
    showActivePage: showActivePage,
    activateOffFormElement: activateOffFormElement,
    onAdjustRoomToGuest: onAdjustRoomToGuest,
  };
})();
