'use strict';

(function () {

  var mainForm = document.querySelector('.ad-form');
  var selectRoomNumber = mainForm.querySelector('#room_number');
  var selectRoomNumberOption = mainForm.querySelectorAll('#room_number option');
  var selectCapacity = mainForm.querySelector('#capacity');
  var inputTitle = mainForm.querySelector('#title');
  var inputPrice = mainForm.querySelector('#price');
  var selectType = mainForm.querySelector('#type');
  var selectTypeOption = mainForm.querySelectorAll('#type option');

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
    // var validMessage = '';

    selectTypeOption.forEach(function (typeElem, index) {
      if (selectType.selectedIndex === index) {
        var result = window.data.TypeToPrice.find(function (item) {
          return item.TYPE === typeElem.value;
        });
      }
      if (result) {
        inputPrice.setAttribute(result.MIN, result.PRICE);
        inputPrice.setAttribute('placeholder', result.PRICE);
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

  // selectRoomNumber.removeEventListener('change', onAdjustRoomToGuest);
  // selectCapacity.removeEventListener('input', onValidationRoomToGuest);


  window.valid = {
    onValidationTitle: onValidationTitle,
    onValidationRoomToGuest: onValidationRoomToGuest,
    onAdjustRoomToGuest: onAdjustRoomToGuest,
  };
  // window.valid.onValidationRoomToGuest;
})();
