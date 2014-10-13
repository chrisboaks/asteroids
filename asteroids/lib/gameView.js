(function () {
  if (typeof Asteroids === 'undefined') {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function GameView(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.bindKeyHandlers = function () {
    key('w', function () {
      this.game.ship.power([0, -1]);
    }.bind(this));

    key('a', function () {
      this.game.ship.power([-1, 0]);
    }.bind(this));

    key('s', function () {
      this.game.ship.power([0, 1]);
    }.bind(this));

    key('d', function () {
      this.game.ship.power([1, 0]);
    }.bind(this));

    key('j', function () {
      this.game.ship.fireBullet();
    }.bind(this));


  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    window.setInterval((function () {
      this.game.draw(this.ctx);
      this.game.step();
    }).bind(this), 20);
  };
})();

// 30/1000