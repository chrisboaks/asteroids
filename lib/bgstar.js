(function () {
  window.Asteroids = window.Asteroids || {}

  var BGStar = Asteroids.BGStar = function (options) {

    var prox = BGStar.proximity();
    var newOptions = {
      pos: options.pos,
      vel: [0, 0],
      color: BGStar.COLOR,
      radius: prox,
      game: options.game,
      wrappable: true
    }

    this.proxRoot = Math.sqrt(prox);

    Asteroids.MovingObject.call(this, newOptions);
  };

  BGStar.COLOR = '#FFFAD8';

  Asteroids.Util.inherits(BGStar, Asteroids.MovingObject);

  BGStar.proximity = function () {
    return Math.floor(Math.random() * 4 + 1);
  };

  BGStar.prototype.draw = function (ctx, translation) {
    var trans = translation || [0, 0]
    ctx.fillStyle = this.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(
      this.pos[0] + trans[0],
      this.pos[1] + trans[1],
      this.radius,
      0,
      2 * Math.PI,
      false);

    ctx.fill();
  };

  BGStar.prototype.move = function () {
    var vel = Asteroids.Util.scalarMultiply(this.game.ship.vel, -this.proxRoot);
    this.pos = [this.pos[0] + vel[0], this.pos[1] + vel[1]];
  };

})();
