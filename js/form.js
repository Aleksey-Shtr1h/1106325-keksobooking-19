'use strict';

(function () {


  var ICON_MAIN_PIN_AFTER = 22;
  var RoomsForGuest = [
    {ROOM: 1, CAPACITY: 1},
    {ROOM: 2, CAPACITY: 2},
    {ROOM: 3, CAPACITY: 3},
    {ROOM: 100, CAPACITY: 0},
  ];
  var map = document.querySelector('.map');
  var wrapperMapFilter = document.querySelector('.map__filters-container');
  var mainForm = document.querySelector('.ad-form');
  var filterForm = wrapperMapFilter.querySelector('.map__filters');
  var mainIconButton = map.querySelector('.map__pin--main');
  var selectCapacity = mainForm.querySelector('#capacity');
  var selectRoomNumber = mainForm.querySelector('#room_number');
  var selectRoomNumberOption = selectRoomNumber.querySelectorAll('option');
  var selectTimein = mainForm.querySelector('#timein');
  var selectTimeinOption = selectTimein.querySelectorAll('option');
  var selectTimeout = mainForm.querySelector('#timeout');
  var selectTimeoutOption = selectTimeout.querySelectorAll('option');
  var formFieldsets = mainForm.querySelectorAll('.ad-form fieldset');
  var userInputAddress = mainForm.querySelector('#address');
  var resetBtn = mainForm.querySelector('.ad-form__reset');
  var btnSubmit = mainForm.querySelector('.ad-form__submit');
  var mainPinOffsetWidth = mainIconButton.offsetWidth;
  var mainPinOffsetHeight = mainIconButton.offsetHeight;
  var leftAddress = mainIconButton.style.left;
  var topAddress = mainIconButton.style.top;

  function deactivateForm(arrayFieldsets) {
    for (var i = 0; i < arrayFieldsets.length; i++) {
      arrayFieldsets[i].setAttribute('disabled', '');
    }
    userInputAddress.setAttribute('disabled', 'disabled');
    userInputAddress.value = whriteCoordMainIcon(leftAddress, topAddress);
  }

  deactivateForm(formFieldsets);

  function activateForm(arrayFieldsets) {
    for (var i = 0; i < arrayFieldsets.length; i++) {
      arrayFieldsets[i].removeAttribute('disabled');
    }
  }

  function whriteCoordMainIcon(left, top) {
    var leftCoordinate = parseInt(left, 10);
    var topCoordinate = parseInt(top, 10);
    var addressElementary = Math.round(leftCoordinate + mainPinOffsetWidth / 2) + ', ' + Math.round(topCoordinate + mainPinOffsetHeight + ICON_MAIN_PIN_AFTER);
    return addressElementary;
  }

  function resetFilterForm() {
    filterForm.reset();
  }

  function formHandler(evt) {
    userInputAddress.removeAttribute('disabled', 'disabled');
    var formDataPost = new FormData(mainForm);
    window.backend.save(formDataPost, function () {
      window.network.openPopupSuccess();
      window.network.closePopupSuccess();
      window.switchPage.disable();
    }, window.network.errorHandler);
    evt.preventDefault();
  }

  function onTimeinChange() {
    selectTimeinOption.forEach(function (timeinElem, index) {
      if (selectTimein.selectedIndex === index) {
        selectTimeout.value = timeinElem.value;
      }
    });
  }

  function onTimeoutChange() {
    selectTimeoutOption.forEach(function (timeoutElem, index) {
      if (selectTimeout.selectedIndex === index) {
        selectTimein.value = timeoutElem.value;
      }
    });
  }

  function onAdjustRoomToGuest() {
    selectRoomNumberOption.forEach(function (roomElem, index) {
      if (selectRoomNumber.selectedIndex === index) {
        var result = RoomsForGuest.find(function (item) {
          return item.ROOM === Number(roomElem.value);
        });
        selectCapacity.value = result.CAPACITY;
      }
    });
  }

  function onResetFormClick() {
    mainForm.reset();
    window.pins.returnMainIcon();
    window.switchPage.disable();
  }

  function onValidationClick() {
    window.valid.check();
  }

  selectTimein.addEventListener('change', onTimeinChange);
  selectTimeout.addEventListener('change', onTimeoutChange);
  selectRoomNumber.addEventListener('change', onAdjustRoomToGuest);
  resetBtn.addEventListener('click', onResetFormClick);
  btnSubmit.addEventListener('click', onValidationClick);
  mainForm.addEventListener('submit', formHandler);


  // selectRoomNumber.removeEventListener('change', onAdjustRoomToGuest);
  // selectTimein.removeEventListener('change', onValidTimeinChange);
  // selectTimeout.removeEventListener('change', onValidTimeoutChange);

  window.form = {
    // enablePage: enablePage,
    // startWorkingSite: startWorkingSite,
    whriteCoordMainIcon: whriteCoordMainIcon,
    activate: activateForm,
    deactivate: deactivateForm,
    resetFilter: resetFilterForm,
  };
  // window.form.activateForm
})();
