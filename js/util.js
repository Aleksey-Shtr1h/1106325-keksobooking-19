'use strict';

(function () {

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

  function showFeatureCard(arrayFeature, elem) {
    arrayFeature.forEach(function (elemItem) {
      var result = window.data.featureDependence[elemItem.className];
      if (elem.includes(result)) {
        elemItem.style.display = 'inline-block';
      } else {
        elemItem.style.display = 'none';
      }
    });
  }

  function showPhotoCard(photoData, div, img, imgArray) {
    photoData.forEach(function (dataElem) {
      var photoElement = img.cloneNode(true);
      photoElement.src = dataElem;
      div.append(photoElement);
    });
    imgArray[0].remove();
  }


  window.util = {
    getRoomGuestCard: getRoomGuestCard,
    showFeatureCard: showFeatureCard,
    showPhotoCard: showPhotoCard,
  };

})();
