'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var START_VALUE_FILTER = 'any';
  var filterValuePrices = [
    {housePrice: 'any', minPrice: undefined, maxPrice: undefined},
    {housePrice: 'low', minPrice: 0, maxPrice: 10000},
    {housePrice: 'middle', minPrice: 10001, maxPrice: 49999},
    {housePrice: 'high', minPrice: 50000, maxPrice: Infinity},
  ];
  var wrapperMapFilter = document.querySelector('.map__filters-container');
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

  function deactivateMapFilter(form, select, fieldset) {
    housingFeatureArray = [];
    housingTypeValue = START_VALUE_FILTER;
    housingPriceValue = START_VALUE_FILTER;
    housingRoomValue = START_VALUE_FILTER;
    housingGuestValue = START_VALUE_FILTER;

    form.classList.add('ad-form--disabled');
    select.forEach(function (elemSelect) {
      elemSelect.disabled = true;
    });
    fieldset.disabled = true;
  }

  function activateMapFilter(form, select, fieldset) {
    form.classList.remove('ad-form--disabled');
    select.forEach(function (elemSelect) {
      elemSelect.disabled = false;
    });
    fieldset.disabled = false;
  }

  function updatePins(dataHttpRequest) {
    var httpPins = dataHttpRequest.slice();
    var filterPinsData = httpPins.filter(function (it) {
      return (getFilterType(it) && getFilterPrice(it) && getFilterRoom(it) && getFilterGuest(it)) && getFilterFeature(it);
    });
    window.cards.remove();
    window.pins.clean();
    window.pins.render(filterPinsData);
    window.cards.show(filterPinsData);
  }

  function getFilterType(httpElem) {
    return housingTypeValue === START_VALUE_FILTER || housingTypeValue === httpElem.offer.type;
  }

  function onFilterTypeChange() {
    housingTypeValue = filterHousingType.value;
    debouncePins();
  }

  function getFilterPrice(httpElem) {
    var result = filterValuePrices.find(function (item) {
      return item.housePrice === housingPriceValue;
    });

    if (httpElem.offer.price >= result.minPrice && httpElem.offer.price <= result.maxPrice) {
      return housingPriceValue;
    }
    return housingPriceValue === START_VALUE_FILTER;
  }

  function onFilterPriceChange() {
    housingPriceValue = filterHousingPrice.value;
    debouncePins();
  }

  function getFilterRoom(httpElem) {
    return housingRoomValue === START_VALUE_FILTER || Number(housingRoomValue) === httpElem.offer.rooms;
  }

  function onFilterRoomChange() {
    housingRoomValue = filterHousingRoom.value;
    debouncePins();
  }

  function getFilterGuest(httpElem) {
    return housingGuestValue === START_VALUE_FILTER || Number(housingGuestValue) === httpElem.offer.guests;
  }

  function onFilterGuestChange() {
    housingGuestValue = filterHousingGuest.value;
    debouncePins();
  }

  function getFilterFeature(httpElem) {
    var result = true;
    var i = 0;
    while (i < housingFeatureArray.length) {
      if (!httpElem.offer.features.includes(housingFeatureArray[i])) {
        result = false;
        break;
      }
      i++;
    }
    return result;
  }

  function onFilterFeatureChange(evt) {
    var target = evt.target;
    if (target.closest('.map__checkbox')) {
      featureLabels.forEach(function (elem) {
        if (!elem === target) {
          return;
        }
        fillFeatureArray(target);
        debouncePins();
      });
      evt.stopPropagation();
    }
  }

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

  function debouncePins() {
    setTimeout(function () {
      updatePins(window.network.offer);
    }, DEBOUNCE_INTERVAL);
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
    load: updatePins,
    activate: activateMapFilter,
    deactivate: deactivateMapFilter,
    addListner: addFilterListner,
    removeListner: removeFilterListner,
  };
})();
