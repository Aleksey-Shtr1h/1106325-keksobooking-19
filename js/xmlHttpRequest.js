'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var body = document.querySelector('body');
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var mainForm = document.querySelector('.ad-form');
  var formFieldsets = mainForm.querySelectorAll('.ad-form fieldset');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var noticeBlock = main.querySelector('.notice');
  var wrapperMapFilter = document.querySelector('.map__filters-container');
  var mapFilter = wrapperMapFilter.querySelector('.map__filters');
  var mapFilterSelect = wrapperMapFilter.querySelectorAll('.map__filters select');
  var mapFilterFieldset = wrapperMapFilter.querySelector('.map__filters fieldset');

  var successHandler = function (data) {
    window.filterPins.activateMapFilter(mapFilter, mapFilterSelect, mapFilterFieldset);
    window.filterPins.updatePins(data);
    window.pin.renderPin(data);
    window.cards.getCardsPins(data);
  };

  var errorHandler = function (errorMessage) {
    createBlockError();
    closeBlockError(errorMessage);
  };

  var formHandler = function (evt) {
    var formDataPost = new FormData(mainForm);
    window.backend.save(formDataPost, function () {
      createBlockSuccess();
      closeBlockSuccess();
      hideMainForm();
    }, errorHandler);
    evt.preventDefault();
  };

  function createBlockSuccess() {
    var fragment = document.createDocumentFragment();
    var successElement = successTemplate.cloneNode(true);
    successElement.after(noticeBlock);
    fragment.appendChild(successElement);
    main.appendChild(fragment);
  }

  function hideMainForm() {
    map.classList.add('map--faded');
    mainForm.classList.add('ad-form--disabled');
    mainForm.reset();
    window.form.activateOffFormElement(formFieldsets);
    window.pin.cleanPinsBtn();
    window.form.showActivePage();
  }

  function closeBlockSuccess() {
    var successBlock = main.querySelector('.success');
    body.addEventListener('click', function () {
      successBlock.remove();
    });
    body.addEventListener('keydown', function (evt) {
      if (evt.key === ESC_KEY) {
        successBlock.remove();
      }
    });
  }

  function createBlockError() {
    var fragment = document.createDocumentFragment();
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.after(noticeBlock);
    fragment.appendChild(errorElement);
    main.appendChild(fragment);
  }

  function closeBlockError(message) {
    var errorBlock = main.querySelector('.error');
    var errorText = main.querySelector('.error__message');
    var errorBtn = main.querySelector('.error__button');

    errorText.textContent = message;

    errorBtn.addEventListener('click', function () {
      errorBlock.remove();
    });

    setTimeout(function () {
      body.addEventListener('click', function () {
        errorBlock.remove();
      });
    }, 1000);

    body.addEventListener('keydown', function (evt) {
      if (evt.key === ESC_KEY) {
        errorBlock.remove();
      }
    });
  }

  mainForm.addEventListener('submit', formHandler);

  window.xmlHttpRequest = {
    successHandler: successHandler,
    errorHandler: errorHandler,
  };
})();
