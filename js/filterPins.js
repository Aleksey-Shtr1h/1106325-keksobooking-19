'use strict';

(function () {

  var wrapperMapFilter = document.querySelector('.map__filters-container');
  var filterHousingType = wrapperMapFilter.querySelector('#housing-type');
  var filterHousingPrice = wrapperMapFilter.querySelector('#housing-price');
  var filterHousingRoom = wrapperMapFilter.querySelector('#housing-rooms');
  var filterHousingGuest = wrapperMapFilter.querySelector('#housing-guests');
  var filterHousingFeature = wrapperMapFilter.querySelector('.map__features');
  var featureLabels = wrapperMapFilter.querySelectorAll('.map__checkbox');

  var housingTypeValue = window.data.filterValueStart.ANY;
  var housingPriceValue = window.data.filterValueStart.ANY;
  var housingRoomValue = window.data.filterValueStart.ANY;
  var housingGuestValue = window.data.filterValueStart.ANY;
  var DEBOUNCE_INTERVAL = 500;

  var housingFeatureArray = [];

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
    var filterPinsData = httpPins.filter(function (it) {
      return (getFilterType(it) && getFilterPrice(it) && getFilterRoom(it) && getFilterGuest(it)) && getFilterFeature(it);
    });

    window.cards.removeCard();
    window.pin.cleanPinsBtn();
    window.pin.renderPin(filterPinsData);
    window.cards.getCardsPins(filterPinsData);
  };

  function getFilterType(httpElem) {
    return housingTypeValue === window.data.filterValueStart.ANY ? true : httpElem.offer.type === housingTypeValue;
  }

  filterHousingType.addEventListener('change', function () {
    housingTypeValue = filterHousingType.value;
    debounce();
    // window.debounce(updatePins(httpPins));
  });

  function getFilterPrice(httpElem) {
    var result = window.data.filterValuePrice.find(function (item) {
      return item.HOUSE_PRICE === housingPriceValue;
    });

    if (httpElem.offer.price >= result.MIN_PRICE && httpElem.offer.price <= result.MAX_PRICE) {
      return housingPriceValue;
    } else {
      return housingPriceValue === window.data.filterValueStart.ANY;
    }
  }

  filterHousingPrice.addEventListener('change', function () {
    housingPriceValue = filterHousingPrice.value;
    debounce();
  });

  function getFilterRoom(httpElem) {
    return housingRoomValue === window.data.filterValueStart.ANY ? true : httpElem.offer.rooms === Number(housingRoomValue);
  }

  filterHousingRoom.addEventListener('change', function () {
    housingRoomValue = filterHousingRoom.value;
    debounce();
  });

  function getFilterGuest(httpElem) {
    return housingGuestValue === window.data.filterValueStart.ANY ? true : httpElem.offer.guests === Number(housingGuestValue);
  }

  filterHousingGuest.addEventListener('change', function () {
    housingGuestValue = filterHousingGuest.value;
    debounce();
  });

  function fillFeatureArray(tg) {
    if (tg.checked) {
      housingFeatureArray.push(tg.value);
    } else if (!tg.checked) {
      var result = housingFeatureArray.findIndex(function (item) {
        return item === tg.value;
      });

      housingFeatureArray.splice(result, 1);
    }
  }

  function getFilterFeature(httpElem) {
    var result = true;

    housingFeatureArray.forEach(function (elem) {
      if (!httpElem.offer.features.includes(elem)) {
        result = false;
      }
    });

    return result;
  }

  filterHousingFeature.addEventListener('change', function (evt) {
    var target = evt.target;
    if (target.closest('.map__checkbox')) {
      featureLabels.forEach(function (elem) {
        if (elem === target) {
          fillFeatureArray(target);
          debounce();
        } else {
          return;
        }
      });
      evt.stopPropagation();
    }
  });

  function debounce() {
    setTimeout(function () {
      updatePins(httpPins);
    }, DEBOUNCE_INTERVAL);
  }

  window.filterPins = {
    updatePins: updatePins,
    activateOffmapFilter: activateOffmapFilter,
    activateMapFilter: activateMapFilter,
  };

})();
// window.filterPins.updatePins
