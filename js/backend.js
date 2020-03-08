'use strict';

(function () {

  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var RESPONSE_TYPE = 'json';
  var StatusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVICE_UNAVAILABLE: 503,
  };


  function getDataHttpRequest(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCodes.OK:
          onLoad(xhr.response);
          break;
        case StatusCodes.BAD_REQUEST:
          onError('Неверный запрос, правильно заполните данные таблицы');
          break;
        case StatusCodes.NOT_FOUND:
          onError('Ничего не найдено');
          break;
        case StatusCodes.SERVICE_UNAVAILABLE:
          onError('Сервер не отвечает');
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

  function loadData(onLoad, onError) {
    var xhr = getDataHttpRequest(onLoad, onError);
    xhr.open('GET', URL_LOAD);
    xhr.send();
  }

  function saveData(data, onLoad, onError) {
    var xhr = getDataHttpRequest(onLoad, onError);
    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  }

  window.backend = {
    load: loadData,
    save: saveData,
  };
  // window.backend.load
})();
