'use strict';

(function () {

  var URLLOAD = 'https://js.dump.academy/keksobooking/data';
  var statusCode = {
    OK: 200,
    TIMEOUT: 10000,
  };

  function xmlHttpSetup(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = statusCode.TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  }

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = xmlHttpSetup(onLoad, onError);
      xhr.open('GET', URLLOAD);
      xhr.send();
    },
  };

})();
