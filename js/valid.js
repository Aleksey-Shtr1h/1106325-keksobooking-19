'use strict';

(function () {

  var mainForm = document.querySelector('.ad-form');
  var selectRoomNumber = mainForm.querySelector('#room_number');
  var selectCapacity = mainForm.querySelector('#capacity');

  var onValidationRoomToGuest = function () {
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

  selectCapacity.addEventListener('input', onValidationRoomToGuest);

})();
