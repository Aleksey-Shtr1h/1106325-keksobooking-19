'use strict';

(function () {

  var ENTER_KEY = 'Enter';
  var map = document.querySelector('.map');
  var mainIconButton = map.querySelector('.map__pin--main');
  var mainForm = document.querySelector('.ad-form');
  var formFieldsets = mainForm.querySelectorAll('.ad-form fieldset');
  var userInputAddress = mainForm.querySelector('#address');
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

  function activateOffFormElement(arrayAtr) {
    for (var i = 0; i < arrayAtr.length; i++) {
      arrayAtr[i].setAttribute('disabled', '');
    }
    userInputAddress.setAttribute('disabled', 'disabled');
    userInputAddress.value = indicateCoordinates(leftAddress, topAddress);
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
    // onAdjustRoomToGuest();
    activateFormElement(formFieldsets);
    // window.valid.onValidationRoomToGuest();
    window.filterPins.activateOffmapFilter(mapFilter, mapFilterSelect, mapFilterFieldset);
    window.backend.load(window.xmlHttpRequest.successHandler, window.xmlHttpRequest.errorHandler);
    // window.backend.xmlHttpSetup();
    window.filterPins.addFilterListner();
    mainIconButton.removeEventListener('mousedown', onTurnOnLeftButton);
  };

  var onTurnOnLeftButton = function (evt) {
    if (evt.button === 0) {
      enabledForm();
    }
  };

  function showActivePage() {
    mainIconButton.addEventListener('mousedown', onTurnOnLeftButton);
    mainIconButton.addEventListener('keydown', function (evt) {
      if (evt.key === ENTER_KEY) {
        enabledForm();
      }
    });
  }

  resetBtn.addEventListener('click', function () {
    mainForm.reset();
    window.pin.returnMainPin();
    // activateOffFormElement(formFieldsets);
    window.xmlHttpRequest.hideMainForm();
    // window.valid.onValidationRoomToGuest();
  });

  showActivePage();
  activateOffFormElement(formFieldsets);

  window.form = {
    enabledForm: enabledForm,
    indicateCoordinates: indicateCoordinates,
    onTurnOnLeftButton: onTurnOnLeftButton,
    showActivePage: showActivePage,
    activateOffFormElement: activateOffFormElement,
  };
  // window.form.enabledForm
})();
