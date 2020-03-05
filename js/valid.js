'use strict';

(function () {

  var mainForm = document.querySelector('.ad-form');
  var selectRoomNumber = mainForm.querySelector('#room_number');
  var selectRoomNumberOption = selectRoomNumber.querySelectorAll('option');
  var selectCapacity = mainForm.querySelector('#capacity');
  var inputTitle = mainForm.querySelector('#title');
  var inputPrice = mainForm.querySelector('#price');
  var selectType = mainForm.querySelector('#type');
  var selectTypeOption = selectType.querySelectorAll('option');
  var selectTimein = mainForm.querySelector('#timein');
  var selectTimeinOption = selectTimein.querySelectorAll('option');
  var selectTimeout = mainForm.querySelector('#timeout');
  var selectTimeoutOption = selectTimeout.querySelectorAll('option');

  function getValidMessage(elementForm, message) {
    if (message) {
      elementForm.style.border = '3px solid red';
    } else {
      elementForm.style.border = '1px solid white';
    }
    elementForm.setCustomValidity(message);
  }

  var onValidationRoomToGuest = function () {
    var roomValue = Number(selectRoomNumber.value);
    var questValue = Number(selectCapacity.value);
    var validMessage;

    if (roomValue !== 100 && questValue === 0) {
      validMessage = 'Выберете колличество гостей';
    } else if (roomValue === 100 && questValue !== 0) {
      validMessage = 'Не предназначенно для гостей';
    } else if (roomValue < questValue) {
      validMessage = 'Гостей надо поменьше';
    } else {
      validMessage = '';
    }
    getValidMessage(selectCapacity, validMessage);
  };

  var onValidationTitle = function () {
    var validMessage = '';
    var validity = inputTitle.validity;
    if (inputTitle.value.length === 0) {
      validMessage = 'Заполните обязательное поле';
    }
    if (validity.tooShort) {
      validMessage = 'Короткий текст описания';
    }
    if (validity.tooLong) {
      validMessage = 'Длинный текст описания';
    }
    getValidMessage(inputTitle, validMessage);
  };

  var onValidationPrice = function () {
    var validMessage = '';
    var validity = inputPrice.validity;
    if (inputPrice.value.length === 0) {
      validMessage = 'Заполните обязательное поле';
    }
    if (validity.rangeOverflow) {
      validMessage = 'Цена не может превышать 1 000 000';
    }
    getValidMessage(inputPrice, validMessage);
  };

  var onValidPriceToType = function () {
    selectTypeOption.forEach(function (typeElem, index) {
      if (selectType.selectedIndex === index) {
        var result = window.data.TypeToPrice.find(function (item) {
          return item.TYPE === typeElem.value;
        });
        if (Number(inputPrice.value) < Number(result.PRICEMIN)) {
          getValidMessage(inputPrice, result.MESSAGE);
          inputPrice.setAttribute('min', result.PRICEMIN);
          inputPrice.setAttribute('placeholder', result.PRICEMIN);
        } else {
          inputPrice.setAttribute('min', result.PRICEMIN);
          inputPrice.setAttribute('placeholder', result.PRICEMIN);
        }
      }
    });
    // onValidationPrice();
  };

  var onValidTimeinChange = function () {
    selectTimeinOption.forEach(function (timeinElem, index) {
      if (selectTimein.selectedIndex === index) {
        selectTimeout.value = timeinElem.value;
      }
    });
  };

  var onValidTimeoutChange = function () {
    selectTimeoutOption.forEach(function (timeoutElem, index) {
      if (selectTimeout.selectedIndex === index) {
        selectTimein.value = timeoutElem.value;
      }
    });
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
    // onValidationRoomToGuest();
  };

  selectRoomNumber.addEventListener('change', onAdjustRoomToGuest);

  selectCapacity.addEventListener('change', onValidationRoomToGuest);
  inputTitle.addEventListener('input', onValidationTitle);
  inputPrice.addEventListener('input', onValidationPrice);
  selectType.addEventListener('change', onValidPriceToType);
  selectTimein.addEventListener('change', onValidTimeinChange);
  selectTimeout.addEventListener('change', onValidTimeoutChange);

  // selectRoomNumber.removeEventListener('change', onAdjustRoomToGuest);
  // selectCapacity.removeEventListener('input', onValidationRoomToGuest);


  window.valid = {
    onValidationTitle: onValidationTitle,
    onValidationRoomToGuest: onValidationRoomToGuest,
    onAdjustRoomToGuest: onAdjustRoomToGuest,
    onValidationPrice: onValidationPrice,
    onValidPriceToType: onValidPriceToType,
  };
  // window.valid.onValidationPrice;
})();
