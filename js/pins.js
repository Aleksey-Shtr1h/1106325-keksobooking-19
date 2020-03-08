'use strict';

(function () {
  var ICON_PIN_WIDTH = 50;
  var ICON_PIN_HEIGHT = 70;
  var ICON_MAIN_PIN_AFTER = 22;

  var mapBlockOffsetWidth = document.querySelector('.map').offsetWidth;
  var map = document.querySelector('.map');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mainForm = document.querySelector('.ad-form');
  var mapPins = map.querySelector('.map__pins');
  var mainIconButton = map.querySelector('.map__pin--main');
  var userInputAddress = mainForm.querySelector('#address');

  var mainPinOffsetTop = mainIconButton.offsetTop;
  var mainPinOffsetLeft = mainIconButton.offsetLeft;
  var mainPinOffsetHeight = mainIconButton.offsetHeight;
  var mainPinOffsetWidth = mainIconButton.offsetWidth;
  var minHieghtBlock = 130 - mainPinOffsetHeight - ICON_MAIN_PIN_AFTER;
  var maxHieghtBlock = 630;
  var minLengthBlock = 0 - mainPinOffsetWidth / 2;
  var maxLengthBlock = mapBlockOffsetWidth - mainPinOffsetWidth / 2;

  function renderPins(dataPin) {
    var takeNumber = dataPin.length > 5 ? 5 : dataPin.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      var pinElement = pinTemplate.cloneNode(true);

      pinElement.style.left = (dataPin[i].location.x - ICON_PIN_WIDTH / 2) + 'px';
      pinElement.style.top = (dataPin[i].location.y - ICON_PIN_HEIGHT) + 'px';

      pinElement.querySelector('img').src = dataPin[i].author.avatar;
      pinElement.querySelector('img').alt = dataPin[i].offer.title;

      fragment.appendChild(pinElement);
    }
    mapPins.appendChild(fragment);
  }

  mainIconButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
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

      mainIconButton.style.top = getRestrictionForPin(mainIconButton.style.top, minHieghtBlock, maxHieghtBlock, false, true);
      mainIconButton.style.left = getRestrictionForPin(mainIconButton.style.left, minLengthBlock, maxLengthBlock, true, false);

      var topAddress = mainIconButton.style.top;
      var leftAddress = mainIconButton.style.left;

      userInputAddress.value = window.form.whriteCoordMainIcon(leftAddress, topAddress);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function cleanPins() {
    var btnPins = document.querySelectorAll('.map__pin:not(.map__pin--main');
    btnPins.forEach(function (btnPin) {
      btnPin.remove();
    });
  }

  function addActivePin(target) {
    target.classList.add('map__pin--active');
  }

  function removeActivePin() {
    var activePins = mapPins.querySelector('.map__pin--active');
    if (activePins) {
      activePins.classList.remove('map__pin--active');
    }
  }

  function returnMainPin() {
    mainIconButton.style.top = mainPinOffsetTop + 'px';
    mainIconButton.style.left = mainPinOffsetLeft + 'px';
  }

  window.pins = {
    render: renderPins,
    clean: cleanPins,
    returnMainIcon: returnMainPin,
    addActiveClass: addActivePin,
    removeActiveClass: removeActivePin,
  };
  // window.pins.returnMainPin
})();