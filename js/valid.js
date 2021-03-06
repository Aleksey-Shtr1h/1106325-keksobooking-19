'use strict';

(function () {
  var typesHouseToPrices = [
    {type: 'bungalo', priceMin: '0', message: 'Цена на "Бунгало" начинается с "0"'},
    {type: 'flat', priceMin: '1000', message: 'Цена на "Квартиру" начинается с "1000"'},
    {type: 'house', priceMin: '5000', message: 'Цена на "Дом" начинается с "5000"'},
    {type: 'palace', priceMin: '10000', message: 'Цена на "Дворец" начинается с "10000"'},
  ];

  var mainForm = document.querySelector('.ad-form');
  var selectRoomNumber = mainForm.querySelector('#room_number');
  var selectCapacity = mainForm.querySelector('#capacity');
  var inputTitle = mainForm.querySelector('#title');
  var inputPrice = mainForm.querySelector('#price');
  var selectType = mainForm.querySelector('#type');
  var selectTypeOption = selectType.querySelectorAll('option');

  function showValidationMessage(elementForm, message) {
    if (message) {
      elementForm.classList.add('ad-error_validation');
    } else {
      elementForm.classList.remove('ad-error_validation');
    }
    elementForm.setCustomValidity(message);
  }

  function onValidationRoomToGuest() {
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
    showValidationMessage(selectCapacity, validMessage);
  }

  function onValidationTitle() {
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
    showValidationMessage(inputTitle, validMessage);
  }

  function onValidationPrice() {
    var validMessage = '';
    var validity = inputPrice.validity;
    if (inputPrice.value.length === 0) {
      validMessage = 'Заполните обязательное поле';
    }
    if (validity.rangeOverflow) {
      validMessage = 'Цена не может превышать 1 000 000';
    }
    showValidationMessage(inputPrice, validMessage);
  }

  function onValidationPriceToType() {
    selectTypeOption.forEach(function (typeElem, index) {
      if (selectType.selectedIndex === index) {
        var result = typesHouseToPrices.find(function (item) {
          return item.type === typeElem.value;
        });
        if (Number(inputPrice.value) < Number(result.priceMin)) {
          showValidationMessage(inputPrice, result.message);
          inputPrice.min = result.priceMin;
          inputPrice.placeholder = result.priceMin;
        } else {
          inputPrice.min = result.priceMin;
          inputPrice.placeholder = result.priceMin;
        }
      }
    });
  }

  function checkValitation() {
    onValidationRoomToGuest();
    onValidationTitle();
    onValidationPrice();
    onValidationPriceToType();
  }

  function addListener() {
    selectCapacity.addEventListener('change', onValidationRoomToGuest);
    inputTitle.addEventListener('input', onValidationTitle);
    inputPrice.addEventListener('input', onValidationPrice);
    selectType.addEventListener('change', onValidationPriceToType);
  }

  function removeListener() {
    selectCapacity.removeEventListener('change', onValidationRoomToGuest);
    inputTitle.removeEventListener('input', onValidationTitle);
    inputPrice.removeEventListener('input', onValidationPrice);
    selectType.removeEventListener('change', onValidationPriceToType);
  }

  window.valid = {
    check: checkValitation,
    addListener: addListener,
    removeListener: removeListener,
  };
})();
