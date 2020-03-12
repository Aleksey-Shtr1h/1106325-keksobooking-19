'use strict';

(function () {
  var TIMEOUT_MESSAGE = 500;
  var ESC_KEY = 'Escape';
  var body = document.querySelector('body');
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var wrapperMapFilter = document.querySelector('.map__filters-container');


  var noticeBlock = main.querySelector('.notice');
  var mapFilter = wrapperMapFilter.querySelector('.map__filters');
  var mapFilterSelect = wrapperMapFilter.querySelectorAll('.map__filters select');
  var mapFilterFieldset = wrapperMapFilter.querySelector('.map__filters fieldset');

  function onDataPinsSuccess(dataHttpRequest) {
    window.network.offer = dataHttpRequest.slice();
    window.filterPins.activate(mapFilter, mapFilterSelect, mapFilterFieldset);
    window.filterPins.load(dataHttpRequest);
    window.cards.show(dataHttpRequest);
  }

  function onDataPinsError(errorMessage) {
    createBlockError();
    closeBlockError(errorMessage);
  }

  function createBlockSuccess() {
    var fragment = document.createDocumentFragment();
    var successElement = successTemplate.cloneNode(true);
    successElement.after(noticeBlock);
    fragment.appendChild(successElement);
    main.appendChild(fragment);
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

  function closeBlockError(error) {
    var errorBlock = main.querySelector('.error');
    var errorText = main.querySelector('.error__message');
    var errorBtn = main.querySelector('.error__button');

    errorText.textContent = error;

    errorBtn.addEventListener('click', function () {
      errorBlock.remove();
    });

    setTimeout(function () {
      body.addEventListener('click', function () {
        errorBlock.remove();
      });
    }, TIMEOUT_MESSAGE);

    body.addEventListener('keydown', function (evt) {
      if (evt.key === ESC_KEY) {
        errorBlock.remove();
      }
    });
  }

  window.network = {
    success: onDataPinsSuccess,
    error: onDataPinsError,
    openPopupSuccess: createBlockSuccess,
    closePopupSuccess: closeBlockSuccess,
  };
})();
