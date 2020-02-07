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
    var len = 1 - 0.5 + Math.random() * arg.length;
    for (var i = 0; i < len; i++) {
      result.push(arg[i]);
    }
    return getAdjustArray(result);
  }

  window.util = {
    selectRandomValues: selectRandomValues,
    renderRandomValues: renderRandomValues,
    getLengthArray: getLengthArray,
  };

})();
