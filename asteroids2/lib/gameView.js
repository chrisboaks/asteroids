(function () {
  window.Asteroids = window.Asteroids || {}

  var GameView = Asteroids.GameView = function GameView(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };


  //add more bindings!
  GameView.prototype.bindKeyHandlers = function () {
    key('w', function () {
      this.game.ship.power(1);
    }.bind(this));

    key('a', function () {
      this.game.ship.turn(-1);
    }.bind(this));

    key('s', function () {
      this.game.ship.power(-1);
    }.bind(this));

    key('d', function () {
      this.game.ship.turn(1);
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
    }).bind(this), 15);
  };
})();