'use strict';
(function () {
  var ENTER_KEY = 'Enter';
  var map = document.querySelector('.map');
  var mainForm = document.querySelector('.ad-form');
  var wrapperMapFilter = document.querySelector('.map__filters-container');
  var mainIconButton = map.querySelector('.map__pin--main');
  var formFieldsets = mainForm.querySelectorAll('.ad-form fieldset');
  var mapFilter = wrapperMapFilter.querySelector('.map__filters');
  var mapFilterSelect = wrapperMapFilter.querySelectorAll('.map__filters select');
  var mapFilterFieldset = wrapperMapFilter.querySelector('.map__filters fieldset');

  function enablePage() {
    map.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    window.form.activate(formFieldsets);
    window.filterPins.deactivate(mapFilter, mapFilterSelect, mapFilterFieldset);
    window.backend.load(window.network.successHandler, window.network.errorHandler);
    window.filterPins.addListner();
    mainIconButton.removeEventListener('mousedown', onTurnOnLeftButton);
  }

  function disablePage() {
    map.classList.add('map--faded');
    mainForm.classList.add('ad-form--disabled');
    mainForm.reset();
    window.form.deactivate(formFieldsets);
    window.form.resetFilter();
    window.filterPins.removeListner();
    window.pins.clean();
    window.cards.remove();
    window.pins.returnMainIcon();
    startWorkingSite();
  }

  function startWorkingSite() {
    mainIconButton.addEventListener('mousedown', onTurnOnLeftButton);
    mainIconButton.addEventListener('keydown', function (evt) {
      if (evt.key === ENTER_KEY) {
        enablePage();
      }
    });
  }

  function onTurnOnLeftButton(evt) {
    if (evt.button === 0) {
      enablePage();
    }
  }

  startWorkingSite();
  // deactivateForm(formFieldsets);

  window.switchPage = {
    enable: enablePage,
    disable: disablePage,
  };
  // window.switchPage.enablePage
})();