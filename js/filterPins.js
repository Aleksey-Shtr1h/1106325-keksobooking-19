'use strict';

(function () {

  var wrapperMapFilter = document.querySelector('.map__filters-container');
  var filterForm = wrapperMapFilter.querySelector('.map__filters');
  var filterHousingType = wrapperMapFilter.querySelector('#housing-type');
  var filterHousingPrice = wrapperMapFilter.querySelector('#housing-price');
  var filterHousingRoom = wrapperMapFilter.querySelector('#housing-rooms');
  var filterHousingGuest = wrapperMapFilter.querySelector('#housing-guests');
  var filterHousingFeature = wrapperMapFilter.querySelector('.map__features');
  var featureLabels = wrapperMapFilter.querySelectorAll('.map__checkbox');

  var housingFeatureArray = [];
  var housingTypeValue;
  var housingPriceValue;
  var housingRoomValue;
  var housingGuestValue;
  var DEBOUNCE_INTERVAL = 500;

  function activateOffmapFilter(form, select, fieldset) {
    housingFeatureArray = [];
    housingTypeValue = window.data.filterValueStart.ANY;
    housingPriceValue = window.data.filterValueStart.ANY;
    housingRoomValue = window.data.filterValueStart.ANY;
    housingGuestValue = window.data.filterValueStart.ANY;

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
    var httpPins = data.slice();
    var filterPinsData = httpPins.filter(function (it) {
      return (getFilterType(it) && getFilterPrice(it) && getFilterRoom(it) && getFilterGuest(it)) && getFilterFeature(it);
    });

    window.cards.removeCard();
    window.pin.cleanPinsBtn();
    window.pin.renderPin(filterPinsData);
    window.cards.getCardsPins(filterPinsData);
  };

  // Фильтр типа жилья

  function getFilterType(httpElem) {
    return housingTypeValue === window.data.filterValueStart.ANY ? true : housingTypeValue === httpElem.offer.type;
  }

  function onFilterTypeChange() {
    housingTypeValue = filterHousingType.value;
    debounce();
  }

  // Фильтр цены

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

  function onFilterPriceChange() {
    housingPriceValue = filterHousingPrice.value;
    debounce();
  }

  // Фильтр комнат

  function getFilterRoom(httpElem) {
    return housingRoomValue === window.data.filterValueStart.ANY ? true : Number(housingRoomValue) === httpElem.offer.rooms;
  }

  function onFilterRoomChange() {
    housingRoomValue = filterHousingRoom.value;
    debounce();
  }

  // Фильтр гостей

  function getFilterGuest(httpElem) {
    return housingGuestValue === window.data.filterValueStart.ANY ? true : Number(housingGuestValue) === httpElem.offer.guests;
  }

  function onFilterGuestChange() {
    housingGuestValue = filterHousingGuest.value;
    debounce();
  }

  // Фильтр удобств

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

  function onFilterFeatureChange(evt) {
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
  }

  function debounce() {
    setTimeout(function () {
      updatePins(window.xmlHttpRequest.offer);
    }, DEBOUNCE_INTERVAL);
  }

  function resetFilterForm() {
    filterForm.reset();
  }

  function addFilterListner() {
    filterHousingType.addEventListener('change', onFilterTypeChange);
    filterHousingPrice.addEventListener('change', onFilterPriceChange);
    filterHousingRoom.addEventListener('change', onFilterRoomChange);
    filterHousingGuest.addEventListener('change', onFilterGuestChange);
    filterHousingFeature.addEventListener('change', onFilterFeatureChange);
  }

  function removeFilterListner() {
    filterHousingType.removeEventListener('change', onFilterTypeChange);
    filterHousingPrice.removeEventListener('change', onFilterPriceChange);
    filterHousingRoom.removeEventListener('change', onFilterRoomChange);
    filterHousingGuest.removeEventListener('change', onFilterGuestChange);
    filterHousingFeature.removeEventListener('change', onFilterFeatureChange);
  }

  window.filterPins = {
    addFilterListner: addFilterListner,
    removeFilterListner: removeFilterListner,
    resetFilterForm: resetFilterForm,
    updatePins: updatePins,
    activateOffmapFilter: activateOffmapFilter,
    activateMapFilter: activateMapFilter,
  };

})();
// window.filterPins.addListner
