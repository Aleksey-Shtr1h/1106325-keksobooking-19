'use strict';

(function () {

  var wrapperMapFilter = document.querySelector('.map__filters-container');
  var filterHousingType = wrapperMapFilter.querySelector('#housing-type');
  // var filterHousingRoom = wrapperMapFilter.querySelector('#housing-rooms');
  var housingTypeValue;
  // var housingRoomValue;
  var httpPins = [];

  function activateOffmapFilter(form, select, fieldset) {
    form.classList.add('ad-form--disabled');
    select.forEach(function (elemSelect) {
      elemSelect.setAttribute('disabled', 'disabled');
    });
    fieldset.setAttribute('disabled', 'disabled');
  }

  function activateMapFilter(form, select, fieldset) {
    form.classList.remove('ad-form--disabled');
    select.forEach(function (elemSelect) {
      elemSelect.removeAttribute('disabled', 'disabled');
    });
    fieldset.removeAttribute('disabled', 'disabled');
  }

  var updatePins = function (data) {
    httpPins = data;
    var typeQwer = httpPins.filter(function (it) {
      return it.offer.type === housingTypeValue;
    });

    window.cards.removeCard();
    window.pin.cleanPinsBtn();
    window.pin.renderPin(typeQwer);
    window.cards.getCardsPins(typeQwer);
  };

  filterHousingType.addEventListener('change', function () {
    housingTypeValue = filterHousingType.value;
    updatePins(httpPins);
  });

  // filterHousingRoom.addEventListener('change', function () {
  //   housingRoomValue = filterHousingRoom.value;
  //   updatePins(httpPins);
  // });


  window.filterPins = {
    updatePins: updatePins,
    activateOffmapFilter: activateOffmapFilter,
    activateMapFilter: activateMapFilter,
  };

})();
// window.filterPins.updatePins
