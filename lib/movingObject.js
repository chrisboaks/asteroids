(function () {
  window.Asteroids = window.Asteroids || {};

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.color = options.color;
    this.radius = options.radius;
    this.game = options.game;
    this.wrappable = options.wrappable;
    this.theta = 0;
    this.driftOmega = options.driftOmega || 0;
  };

  MovingObject.prototype.draw = function (ctx, translation) {
    var trans = translation || [0, 0];
    ctx.fillStyle = this.color;
    ctx.strokeStyle = 'black';
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
    ctx.stroke();
  };

  MovingObject.prototype.isNearEdge = function () {
    return this.game.isNearEdge(this);
  };

  MovingObject.prototype.imageCollidedWith = function (otherObject) {
    var maxDist = this.radius + otherObject.radius;
    var x = this.pos[0];
    var y = this.pos[1];
    var gameX = Asteroids.Game.DIM_X;
    var gameY = Asteroids.Game.DIM_Y;
    var mag = Asteroids.Util.magnitude;
    return (
      mag([x - gameX, y], otherObject.pos) <= maxDist ||
      mag([x + gameX, y], otherObject.pos) <= maxDist ||
      mag([x, y - gameY], otherObject.pos) <= maxDist ||
      mag([x, y + gameY], otherObject.pos) <= maxDist
    );
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var maxDist = this.radius + otherObject.radius;
    if (this.isNearEdge() && this.imageCollidedWith(otherObject)) {
      return true;
    }
    var dist = Asteroids.Util.magnitude(this.pos, otherObject.pos);
    return (dist <= maxDist);
  };

  MovingObject.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  };

})();
