game.checkCollisions = function () {
  // List potentially collidable entities
  var watchTheseGuys = [];
  var bounds = game.player.doubleJump ? 8 : 6;
  for (var i = 0; i < game.map.structures.length; i++) {
    if (
      game.map.structures[i].x >
        game.player.x / game.options.tileWidth - bounds &&
      game.map.structures[i].x <
        game.player.x / game.options.tileWidth + bounds &&
      game.map.structures[i].y >
        game.player.y / game.options.tileHeight - bounds &&
      game.map.structures[i].y <
        game.player.y / game.options.tileHeight + bounds
    ) {
      watchTheseGuys.push(game.map.structures[i]);
    }
  }
  for (var i = 0; i < watchTheseGuys.length; i++) {
    for (var j = 0; j < game.structures[watchTheseGuys[i].name].length; j++) {
      if (
        game.player.x / game.options.tileWidth - 0.5 >=
          watchTheseGuys[i].x + game.structures[watchTheseGuys[i].name][j].x &&
        game.player.x / game.options.tileWidth - 0.5 <=
          watchTheseGuys[i].x +
            game.structures[watchTheseGuys[i].name][j].x +
            1 &&
        game.player.y / game.options.tileHeight <
          watchTheseGuys[i].y +
            game.structures[watchTheseGuys[i].name][j].y +
            0.2 &&
        game.player.y / game.options.tileHeight >
          watchTheseGuys[i].y +
            game.structures[watchTheseGuys[i].name][j].y -
            0.2 &&
        (game.structures[watchTheseGuys[i].name][j].collidable == undefined ||
          game.structures[watchTheseGuys[i].name][j].collidable == true) &&
        !game.player.startedJump
      ) {
        clearInterval(game.player.fallInterval);
        game.player.isInAir = false;
        game.player.doubleJump = true;
        game.player.y =
          Math.round(game.player.y / game.options.tileHeight) *
          game.options.tileHeight;
        return true;
      }
    }
  }
  for (var i = 0; i < watchTheseGuys.length; i++) {
    var structure = watchTheseGuys[i];
    if (structure.name === "fire" || structure.name === "knife") {
      if (
        game.player.x / game.options.tileWidth >= structure.x &&
        game.player.x / game.options.tileWidth <= structure.x + 1 &&
        game.player.y / game.options.tileHeight >= structure.y &&
        game.player.y / game.options.tileHeight <= structure.y + 1
      ) {
        game.isOver = true;
        return true;
      }
    }
  }
};
game.updateObstacles = function () {
  setInterval(function () {
    for (var i = 0; i < game.map.structures.length; i++) {
      var structure = game.map.structures[i];
      if (structure.name === "knife") {
        structure.x += 0.05;
        structure.y += 0.1;

        if (typeof structure.rotation === "undefined") {
          structure.rotation = 0;
        }
        structure.rotation += 5;
        if (structure.rotation >= 360) {
          structure.rotation = 0;
        }
      }
      if (structure.name === "fire") {
        structure.y -= 0.05;
      }
    }
    if (game.player.y < -300 && game.player.y > -350) {
      for (var i = 0; i < 20; i++) {
        game.map.structures.push({
          name: "knife",
          x: Math.floor(Math.random() * 8),
          y: -i * 10,
        });
      }
    }
    if (game.player.y < -500) {
      game.map.structures.push({
        name: "knife",
        x: Math.floor(Math.random() * 8),
        y: game.player.y - 30,
        rotation: 0,
      });
    }
    game.requestRedraw();
    console.log(game.player.x, game.player.y);
  }, 100);
};
game.updateObstacles();
