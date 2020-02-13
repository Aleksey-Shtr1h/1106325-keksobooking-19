'use strict';

(function () {
  var iconWidth = 50;
  var iconHeight = 70;
  var map = document.querySelector('.map');
  var mainIconButton = map.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainForm = document.querySelector('.ad-form');
  var userInputAddress = mainForm.querySelector('#address');
  var mapBlock = document.querySelector('.map').offsetWidth;
  var locationMinY = 130;
  var locationMaxY = 630;
  var iconMainWidth = mainIconButton.offsetWidth;
  var iconMainHieght = mainIconButton.offsetHeight;
  var iconMainHeightAfter = 22;
  var minTop = locationMinY - iconMainHieght - iconMainHeightAfter;
  var maxTop = locationMaxY - iconMainHieght - iconMainHeightAfter;
  var minLeft = (mapBlock - mapBlock) - iconMainWidth / 2;
  var maxLeft = mapBlock - iconMainWidth / 2;


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

  mainIconButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      function getCoordStyle(x, y) {
        return y ? (mainIconButton.offsetTop - shift.y) : (mainIconButton.offsetLeft - shift.x);
      }

      function getRestrictionForPin(position, min, max, x, y) {
        if (parseInt(position, 10) > max) {
          position = max + 'px';

        } else if (parseInt(position, 10) < min) {
          position = min + 'px';

        } else {
          position = getCoordStyle(x, y) + 'px';
        }
        return position;
      }

      mainIconButton.style.top = getRestrictionForPin(mainIconButton.style.top, minTop, maxTop, false, true);
      mainIconButton.style.left = getRestrictionForPin(mainIconButton.style.left, minLeft, maxLeft, true, false);

      var topAddress = mainIconButton.style.top;
      var leftAddress = mainIconButton.style.left;

      userInputAddress.value = window.form.indicateCoordinates(leftAddress, topAddress);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      // window.form.indicateCoordinates();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  // Альтернативная очистка пинов

  // function cleanPinsBtn() {
  //   var btnPins = document.querySelectorAll('.map__pin:not(.map__pin--main');
  //   btnPins.forEach(function (btnPin) {
  //     btnPin.remove();
  //   });
  // }

  window.pin = {
    renderPin: renderPin,
  };

})();
