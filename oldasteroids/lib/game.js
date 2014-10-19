(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function() {
    this.asteroids = this.addAsteroids();
    this.bullets = [];
    this.ship = new Asteroids.Ship(this);
  };

  Game.DIM_X = 600;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 4;


  Game.prototype.addAsteroids = function () {
    var result = [];
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      result.push(new Asteroids.Asteroid(this.randomPosition(), this));
    };
    return result;
  };

  Game.prototype.randomPosition = function () {
    var x = Math.random() * Game.DIM_X;
    var y = Math.random() * Game.DIM_Y;
    return [x, y];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    var game = this;
    var bulletsToRemove = []
    this.allObjects().forEach(function (obj) {
      if (obj instanceof Asteroids.Bullet && Game.isOutOfBounds([obj.posX, obj.posY])) {
        bulletsToRemove.push(obj);
      } else {
        obj.draw(ctx);
      }
    });
    if (bulletsToRemove.length > 0) {
      game.removeBullets(bulletsToRemove)
    };
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (obj) {
      obj.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    var x = pos[0] % Game.DIM_X;
    var y = pos[1] % Game.DIM_Y;
    if (x < 0) {
      x += Game.DIM_X;
    }
    if (y < 0) {
      y += Game.DIM_Y
    }
    return [x, y]
  };

  Game.prototype.checkCollisions = function () {
    var allObjects = this.allObjects();
    var numObjects = allObjects.length;
    for (var i = 0; i < numObjects - 1; i++) {
      for (var j = i + 1; j < numObjects; j++) {
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    };
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.removeAsteroid = function (asteroid) {
    var i = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(i, 1);
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]).concat(this.bullets);
  };

  Game.prototype.addBullet = function (bullet) {
    this.bullets.push(bullet);
  };

  Game.prototype.removeBullets = function (bulletsToRemove) {
    var that = this;
    bulletsToRemove.forEach(function (bullet) {
      var i = that.bullets.indexOf(bullet);
      that.bullets.splice(i, 1);
    });
  };

  Game.isOutOfBounds = function (pos) {
    return (pos[0] <= 0 || pos[1] <= 0 || pos[0] > Game.DIM_X || pos[1] > Game.DIM_Y);
  };

})();