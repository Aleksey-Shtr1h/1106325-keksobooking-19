'use strict';

(function () {

  var selectRandomValues = function (min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  };

  var renderRandomValues = function (countArray) {
    return Math.floor(Math.random() * countArray.length);
  };

  function getAdjustArray(arg) {
    var adjust = [];

    for (var i = 0; i < arg.length; i++) {
      if (!adjust.includes(arg[i])) {
        adjust.push(arg[i]);
      }
    }
    return adjust;
  }

  function getLengthArray(arg) {
    var result = [];
    var len = Math.random() * arg.length;
    for (var i = 0; i < len; i++) {
      result.push(arg[i]);
    }
    return getAdjustArray(result);
  }

  function getRoomGuestCard(room, guest) {
    var roomValue = ' комната';
    var guestValue = ' гостя';

    if (room > 1 && room <= 4) {
      roomValue = ' комнаты';
    } else if (room >= 5 || room === 0) {
      roomValue = ' комнат';
    }

    if (guest > 1) {
      guestValue = ' гостей';
    }

    return room + roomValue + ' для ' + guest + guestValue;
  }

  function getFeatureItemCard(array, elem) {
    array.forEach(function (elemItem) {
      var result = window.data.featureDependence[elemItem.className];
      if (elem.includes(result)) {
        elemItem.style.display = 'inline-block';
      } else {
        elemItem.style.display = 'none';
      }
    });
  }

  function getPhotoCard(photoData, div, img, imgArray) {
    photoData.forEach(function (dataElem) {
      var photoElement = img.cloneNode(true);
      photoElement.src = dataElem;
      div.append(photoElement);
    });

    imgArray[0].remove();
  }


  window.util = {
    selectRandomValues: selectRandomValues,
    renderRandomValues: renderRandomValues,
    getLengthArray: getLengthArray,
    getRoomGuestCard: getRoomGuestCard,
    getFeatureItemCard: getFeatureItemCard,
    getPhotoCard: getPhotoCard,
  };

})();
