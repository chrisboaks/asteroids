(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (pos, vel, color, radius, game) {
    this.posX = pos[0];
    this.posY = pos[1];
    this.velX = vel[0];
    this.velY = vel[1];
    this.color = color;
    this.radius = radius;
    this.game = game;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.posX,
      this.posY,
      this.radius,
      0,
      2 * Math.PI,
      false);

      ctx.fill();
  };

  MovingObject.prototype.move = function () {
    var pos = this.game.wrap([this.posX += this.velX, this.posY += this.velY]);
    this.posX = pos[0];
    this.posY = pos[1];
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var dx = this.posX - otherObject.posX;
    var dy = this.posY - otherObject.posY;
    var maxDist = this.radius + otherObject.radius;
    return ((dx * dx) + (dy * dy) < maxDist * maxDist);
  };

  MovingObject.prototype.collideWith = function (otherObj) {
    // this.game.remove(this);
    // this.game.remove(otherObj);
  };

})();