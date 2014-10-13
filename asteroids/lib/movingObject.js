(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (pos, vel, color, radius) {
    this.posX = pos[0];
    this.posY = pos[1];
    this.velX = vel[0];
    this.velY = vel[1];
    this.radius = radius;
    this.color = color;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    console.log(this.radius);
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
    this.posX += this.velX;
    this.posY -= this.velY;
  };

})();