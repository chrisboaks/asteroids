(function () {
  window.Asteroids = window.Asteroids || {};

  var GameText = Asteroids.GameText = function(game) {
    this.game = game;
    this.opacity = 0;
    this.won = false;
  };

  GameText.WINTEXT1 = "you shattered the surrounding debris.";
  GameText.WINTEXT2 = "nothing but the boundless emptiness of space surrounds you.";
  GameText.WINTEXT3 = "you win.";

  GameText.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color();
    ctx.font = "16px Arial";
    ctx.textAlign = 'center';
    ctx.fillText(GameText.WINTEXT1, 500, 300);
    ctx.fillText(GameText.WINTEXT2, 500, 400);
    ctx.fillText(GameText.WINTEXT3, 500, 500);
  };

  GameText.prototype.winGame = function () {
    if (!this.won) {
      this.won = true;
      this.opacity = 200;
      setTimeout(function () {
        this.fadeOut();
      }.bind(this), 7000);
    }
  };

  GameText.prototype.fadeOut = function () {
    if (this.opacity > 0) {
      this.opacity--;
      setTimeout(function () {
        this.fadeOut();
      }.bind(this), 10);
    }
  };

  GameText.prototype.color = function () {
    return 'rgba(227, 227, 227, ' + this.opacity/200 + ')';
  };

})();
