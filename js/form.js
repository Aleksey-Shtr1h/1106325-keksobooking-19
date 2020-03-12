'use strict';

(function () {
  var ICON_MAIN_PIN_AFTER = 22;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var roomsForGuest = [
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

  var avatarFileInput = mainForm.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = mainForm.querySelector('.ad-form-header__preview img');
  var photoHouseFileInput = mainForm.querySelector('.ad-form__upload input[type=file]');
  var photoHousePreview = mainForm.querySelector('.ad-form__photo');

  var mainPinStyleLeft = mainIconButton.style.left;
  var mainPinStyleTop = mainIconButton.style.top;
  var mainPinDiameter = 65;

  function deactivateForm(arrayFieldsets) {
    for (var i = 0; i < arrayFieldsets.length; i++) {
      arrayFieldsets[i].disabled = true;
    }
    userInputAddress.disabled = true;
    userInputAddress.value = whriteCoordMainIcon(mainPinStyleLeft, mainPinStyleTop, false);
  }

  deactivateForm(formFieldsets);

  function activateForm(arrayFieldsets) {
    for (var i = 0; i < arrayFieldsets.length; i++) {
      arrayFieldsets[i].disabled = false;
    }

    userInputAddress.value = whriteCoordMainIcon(mainPinStyleLeft, mainPinStyleTop, true);
  }

  function whriteCoordMainIcon(left, top, active) {
    var leftCoordinate = parseInt(left, 10);
    var topCoordinate = parseInt(top, 10);
    var addressElementary = Math.round(leftCoordinate + mainPinDiameter / 2) + ', ' + Math.round(topCoordinate + mainPinDiameter / 2);
    if (active) {
      addressElementary = Math.round(leftCoordinate + mainPinDiameter / 2) + ', ' + Math.round(topCoordinate + mainPinDiameter + ICON_MAIN_PIN_AFTER);
    }
    return addressElementary;
  }

  function removeValidationStyle() {
    var formValidationElement = mainForm.querySelectorAll('.ad-error_validation');
    formValidationElement.forEach(function (elem) {
      elem.classList.remove('ad-error_validation');
    });
  }

  function removeImgForm() {
    avatarPreview.src = 'img/muffin-grey.svg';
    photoHousePreview.innerHTML = '';
  }

  function resetFilterForm() {
    filterForm.reset();
  }

  function loadImageIcon(domElement, preview) {
    var file = domElement.files[0];
    var photoNow = preview.src;
    if (file !== undefined) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
    preview.src = photoNow;
  }

  function pasteImgBlock(domBlock) {
    var photoHouse = document.querySelector('.house_photo');
    if (!photoHouse) {
      photoHouse = document.createElement('img');
      photoHouse.classList = 'house_photo';
      photoHouse.alt = 'Фото жилья';
      domBlock.append(photoHouse);
    }
    return photoHouse;
  }

  function onFormSubmit(evt) {
    userInputAddress.disabled = false;
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
        var result = roomsForGuest.find(function (item) {
          return item.ROOM === Number(roomElem.value);
        });
        selectCapacity.value = result.CAPACITY;
      }
    });
  }

  function onResetFormClick() {
    window.switchPage.disable();
  }

  function onValidationClick() {
    window.valid.check();
  }

  function addListener() {
    avatarFileInput.addEventListener('change', function () {
      loadImageIcon(avatarFileInput, avatarPreview);
    });
    photoHouseFileInput.addEventListener('change', function () {
      loadImageIcon(photoHouseFileInput, pasteImgBlock(photoHousePreview));
    });
    selectTimein.addEventListener('change', onTimeinChange);
    selectTimeout.addEventListener('change', onTimeoutChange);
    selectRoomNumber.addEventListener('change', onAdjustRoomToGuest);
    resetBtn.addEventListener('click', onResetFormClick);
    btnSubmit.addEventListener('click', onValidationClick);
    mainForm.addEventListener('submit', onFormSubmit);
  }

  function removeListener() {
    avatarFileInput.removeEventListener('change', function () {
      loadImageIcon(avatarFileInput, avatarPreview);
    });
    photoHouseFileInput.removeEventListener('change', function () {
      loadImageIcon(photoHouseFileInput, pasteImgBlock(photoHousePreview));
    });
    selectTimein.removeEventListener('change', onTimeinChange);
    selectTimeout.removeEventListener('change', onTimeoutChange);
    selectRoomNumber.removeEventListener('change', onAdjustRoomToGuest);
    resetBtn.removeEventListener('click', onResetFormClick);
    btnSubmit.removeEventListener('click', onValidationClick);
    mainForm.removeEventListener('submit', onFormSubmit);
  }

  window.form = {
    whriteCoordMainIcon: whriteCoordMainIcon,
    activate: activateForm,
    deactivate: deactivateForm,
    removeValidation: removeValidationStyle,
    removeImg: removeImgForm,
    resetFilter: resetFilterForm,
    addListener: addListener,
    removeListener: removeListener,
  };
})();
