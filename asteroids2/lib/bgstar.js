(function () {
  window.Asteroids = window.Asteroids || {}

  var BGStar = Asteroids.BGStar = function (options) {

    var prox = BGStar.proximity();
    var newOptions = {
      pos: options.pos,
      vel: [-Math.sqrt(prox), 0],
      color: BGStar.COLOR,
      radius: prox,
      game: options.game,
      wrappable: true
    }

    Asteroids.MovingObject.call(this, newOptions);
  };

  BGStar.COLOR = '#FFFAD8';

  Asteroids.Util.inherits(BGStar, Asteroids.MovingObject);

  BGStar.proximity = function () {
    return Math.floor(Math.random() * 3 + 1);
  }

})();