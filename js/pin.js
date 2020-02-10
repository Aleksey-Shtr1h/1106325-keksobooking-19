'use strict';

(function () {
  var iconWidth = 50;
  var iconHeight = 70;

  var mapPins = document.querySelector('.map__pins');

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');


  var renderPin = function (arg) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < window.data.arrayOfObjects.length; i++) {
      var pinElement = pinTemplate.cloneNode(true);

      pinElement.style.left = (arg[i].location.x - iconWidth / 2) + 'px';
      pinElement.style.top = (arg[i].location.y - iconHeight) + 'px';

      pinElement.querySelector('img').src = arg[i].author.avatar;
      pinElement.querySelector('img').alt = arg[i].offer.title;

      fragment.appendChild(pinElement);
    }
    mapPins.appendChild(fragment);
  };

  function cleanPinsBtn() {
    var btnPins = document.querySelectorAll('.map__pin:not(.map__pin--main');
    btnPins.forEach(function (btnPin) {
      btnPin.remove();
    });
  }

  window.pin = {
    renderPin: renderPin,
    cleanPinsBtn: cleanPinsBtn,
  };

})();
