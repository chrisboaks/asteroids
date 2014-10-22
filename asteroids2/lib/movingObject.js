(function () {
  window.Asteroids = window.Asteroids || {}

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.color = options.color;
    this.radius = options.radius;
    this.game = options.game;
    this.wrappable = options.wrappable;
    this.theta = 0;
    this.omega = options.omega;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false);

      ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var dist = Asteroids.Util.magnitude(this.pos, otherObject.pos);
    var maxDist = this.radius + otherObject.radius;
    return (dist <= maxDist);
  };

  MovingObject.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]
  };

})();