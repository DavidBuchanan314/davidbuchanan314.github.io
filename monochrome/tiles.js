function Tiles(layer, visibility, map) {
  this.level = 1;
  this.tiles = map
  this.layer = layer;
  this.visible = visibility;
  this.block;
  this.coin;
  this.coins = 2;
  this.spike;
  this.battery;
  this.star;
};

Tiles.prototype.update = function() {
  if (this.visible) {
    if (colored) {
      this.block = blockColor;
      this.coin = coinColor;
      this.spike = spikeColor;
      this.battery = batteryColor;
      this.star = starColor;
    } else {
      this.block = blockBlack;
      this.coin = blank;
      this.spike = spikeBlack;
      this.battery = batteryBlack;
      this.star = starBlack;
    }
    if (this.coins <= 0) this.nextLevel();
  }
}

Tiles.prototype.render = function() {
  if (this.visible) {

    for (var y = 0; y < this.tiles.length; y++) {
      for (var x = 0; x < this.tiles[0].length; x++) {
        if (this.tiles[y][x] == "1") {
          ctx.drawImage(this.block,  Math.round((x*64)+xOffset),  Math.round((y*64)+yOffset));
        } else if (this.tiles[y][x] == "c") {
          ctx.drawImage(this.coin,  Math.round((x*64)+xOffset),  Math.round((y*64)+yOffset));
        } else if (this.tiles[y][x] == "t") {
          ctx.drawImage(teleportBlack,  Math.round((x*64)+xOffset),  Math.round((y*64)+yOffset));
        } else if (this.tiles[y][x] == "s") {
          ctx.drawImage(this.spike,  Math.round((x*64)+xOffset),  Math.round((y*64)+yOffset));
        } else if (this.tiles[y][x] == "b") {
          ctx.drawImage(this.battery,  Math.round((x*64)+xOffset),  Math.round((y*64)+yOffset));
        } else if (this.tiles[y][x] == "5" && ((x+y+clock)%3 == 0) ) {
          ctx.drawImage(this.star,  Math.round((x*64)+xOffset),  Math.round((y*64)+yOffset));
        }
      }
    }
    
    this.renderText();

  }
}

var isSolid = {
 1: true,
 c: false,
 0: false,
 t: false,
 s: false,
 b: false,
 5: false,
}

Tiles.prototype.checkAction = function(xPos, yPos) {
  var item = this.tiles[yPos][xPos];
  if (item == "c" && colored) {
    this.tiles[yPos][xPos] = 0;
    this.coins -= 1;
    playAudio(coinSound);
  } else if (item == "t") {
    this.tiles[yPos][xPos] = 0;
    player.canTeleport = true;
    playAudio(coinSound);
  } else if (item == "s") {
    player.hurt();
  } else if (item == "5" && ((xPos+yPos+clock)%3 == 0)) {
    player.hurt();
  } else if (item == "b" && player.canTeleport) {
    this.tiles[yPos][xPos] = 0;
    player.power = 100;
    playAudio(chargeSound);
  } else {

  }
}

Tiles.prototype.nextLevel = function() {
  objects.splice(objects.indexOf(player), 1);
  player = new Char(layer["player"], true);
  objects.push(player);
  if (this.level == 1) {
    this.coins = 5;
    this.tiles = lv2Map;
    player.x = 128;
    player.y = 447;
  } else if (this.level == 2) {
    this.coins = 8;
    this.tiles = lv3Map;
    player.x = 128;
    player.y = 447;
  } else {
    console.log("win!");
    hideAll();
    youWin.visible = true;
    throw { name: "complete", message: "The game was completed." };  
  }
  
  levelComplete.visible = true;
  setTimeout(function(){levelComplete.visible = false;}, 500);
  
  this.level += 1;
}

Tiles.prototype.renderText = function() {

  ctx.font = "16.6666px slkscr";
  ctx.fillStyle = "black";
  if (this.level == 1) {
    if (player.canTeleport) {
      ctx.fillText("hold m to teleport", 1240+xOffset, 160+yOffset);
      if (colored) {
        ctx.fillText("collect all the coins", 1100+xOffset, 220+yOffset);
        ctx.fillText("to complete the level.", 1100+xOffset, 240+yOffset);
      }
      ctx.fillText("you can jump higher", 680+xOffset, 300+yOffset);
      ctx.fillText("in the colour world.", 680+xOffset, 320+yOffset);

      ctx.fillText("watch your power and air levels.", 250+xOffset, 100+yOffset);
      ctx.fillText("you cannot breathe in the colour world.", 250+xOffset, 115+yOffset);
      ctx.fillText("if you get stuck, press F5 to restart :)", 250+xOffset, 130+yOffset);
     
    } else {
      ctx.fillText("press a + d to move", 100+xOffset, 420+yOffset);
      ctx.fillText("press w to jump", 460+xOffset, 360+yOffset);
      ctx.fillText("grab the teleporter vvv", 1270+xOffset, 160+yOffset);
    }
    if (player.power == 0) {
      ctx.fillText("if you get stuck, press f5 to restart :)", 700+xOffset, 260+yOffset);
    }
  }
  
  if (this.level == 2) {
    ctx.fillText("spikes hurt", 450+xOffset, 700+yOffset);
    if (player.canTeleport) {
      ctx.fillText("look out for hidden coins", 200+xOffset, 250+yOffset);
    } else {
      ctx.fillText("keep trying!", 160+xOffset, 340+yOffset);
    }
  }
  
  if (this.level == 3) {
    if (player.canTeleport) {
      ctx.fillText("collect batteries to", 940+xOffset, 330+yOffset);
      ctx.fillText("recharge the teleporter", 940+xOffset, 350+yOffset);
    } else {
      ctx.fillText("avoid these things", 395+xOffset, 550+yOffset);
    }
  }

}

