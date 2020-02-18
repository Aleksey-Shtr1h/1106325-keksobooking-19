'use strict';

(function () {
  var arrayOfObjects = [];
  // var form = document.querySelector('.ad-form');

  var successHandler = function (pins) {
    for (var i = 0; i < 8; i++) {
      arrayOfObjects.push(pins[i]);
    }
    return arrayOfObjects;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // var formHandler = function (evt) {
  //   var formDataPost = new FormData(form);
  //   var buttonSubmit = document.querySelector('.setup-submit');
  //   buttonSubmit.textContent = 'Отправка данных...';
  //   buttonSubmit.disabled = true;
  //   window.backend.save(formDataPost, function () {
  //     userDialog.classList.add('hidden');
  //     buttonSubmit.textContent = 'Сохранить';
  //     buttonSubmit.disabled = false;
  //   }, errorHandler);
  //   evt.preventDefault();
  // };

  // form.addEventListener('submit', formHandler);

  window.xmlHttpRequest = {
    arrayOfObjects: arrayOfObjects,
    successHandler: successHandler,
    errorHandler: errorHandler,
  };
})();
