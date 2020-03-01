'use strict';

(function () {

  var URLLOAD = 'https://js.dump.academy/keksobooking/data';
  var URLSAVE = 'https://js.dump.academy/keksobooking';
  var statusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    TIMEOUT: 10000,
  };

  function xmlHttpSetup(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = statusCode.TIMEOUT;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case statusCode.OK:
          onLoad(xhr.response);
          break;
        case statusCode.BAD_REQUEST:
          onError('Неверный запрос, правильно заполните данные таблицы');
          break;
        case statusCode.NOT_FOUND:
          onError('Ничего не найдено');
          break;
        default:
          onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Плохое соединение с интернетом');
    });

    return xhr;
  }

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = xmlHttpSetup(onLoad, onError);
      xhr.open('GET', URLLOAD);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = xmlHttpSetup(onLoad, onError);
      xhr.open('POST', URLSAVE);
      xhr.send(data);
    },
    xmlHttpSetup: xmlHttpSetup,
  };

})();
