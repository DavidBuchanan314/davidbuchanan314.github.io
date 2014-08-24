function Char(layer, visibility) {
  this.layer = layer;
  this.visible = visibility;
  this.sprite;
  this.velX = 0;
  this.velY = 0;
  this.x = 0;
  this.y = -32;
  this.gravity = 0.5;
  this.speed = 1;
  this.canJump = true;
  this.health = 100;
  this.power = 100;
  this.air = 100;
  this.canTeleport = false;
  this.immunity = 0;
};

Char.prototype.update = function() {
  if (this.visible) {
    if (isDown[key.m] && this.canTeleport && this.power > 0) {
      if (!colored) playAudio(teleportSound);
      colored = true;
      this.sprite = charBlack;
      this.gravity = 0.3;
      //this.speed = -1;
      this.air -= 1;
      this.power -= 0.5;
    } else {
      if (colored) playAudio(teleportSound);
      colored = false;
      this.sprite = charBlack;
      this.gravity = 0.5;
      this.speed = 1;
      this.air += 0.5;
    }
    
    if (this.immunity > 0) this.immunity -= 1;
    
    if (this.power > 100) this.power = 100;
    if (this.power < 0) this.power = 0;
    if (this.air > 100) this.air = 100;
    if (this.air < 0) this.air = 0;
    if (this.health > 100) this.health = 100;
    if (this.health < 0) this.health = 0;

    if (isDown[key.w] && this.canJump ) {
      this.velY -= 10;
      this.canJump = false;
      jumpSound.play();
    }
    //if (isDown[key.s]) this.velY += 1;
    if (isDown[key.a]) this.velX -= this.speed;
    if (isDown[key.d]) this.velX += this.speed;
    
    //if (isDown[key.space] && lv1.level != 4) {
    //  lv1.coins = 0;
    //}
    //if (isDown[key.space]) console.log(this.wouldCollide(this.x, this.y));
    
    //this.x += this.velX;
    //this.y += this.velY;
    
    if (this.wouldCollide(this.x + this.velX, this.y)) {
      this.velX = 0;
    } else {
      this.x += this.velX;
    }
    
    if (this.wouldCollide(this.x, this.y + this.velY)) {
      if (this.velY > 0) this.canJump = true;
      this.velY = 0;
    } else {
      this.y += this.velY;
      this.canJump = false;
    }
    
    this.velX *= 0.85;
    this.velY += this.gravity;
    
    //console.log(this.x+xOffset - (384 - 196));
    if (this.x+xOffset > 384) xOffset -= (this.x+xOffset - 384);
    if (this.x+xOffset < 196) xOffset -= (this.x+xOffset - 196);
    
    if (this.y+yOffset > 320) yOffset -= (this.y+yOffset - 320);
    if (this.y+yOffset < 128) yOffset -= (this.y+yOffset - 128);
    //if (xOffset>0) xOffset = 0;
    
    if (this.health <= 0 || this.air <=0) die();
  }
}

Char.prototype.render = function() {
  if (this.visible && (this.immunity % 4) != 1) {


    ctx.drawImage(this.sprite, Math.round(this.x+xOffset), Math.round(this.y+yOffset));


  }
}

Char.prototype.wouldCollide = function(x, y) {
  //return Math.floor(x/64) + ", " + Math.floor(y/64);
  x1 = Math.floor((x+1)/64);
  y1 = Math.floor((y+1)/64);
  x2 = Math.floor((x)/64)+1;
  y2 = Math.floor((y)/64)+1;
  lv1.checkAction(Math.round((x)/64), Math.round((y)/64));
  try {
  if (isSolid[lv1.tiles[y1][x1]]) {
    return true;
  } else if (isSolid[lv1.tiles[y1][x2]]) {
    return true;
  } else if (isSolid[lv1.tiles[y2][x1]]) {
    return true;
  } else if (isSolid[lv1.tiles[y2][x2]]) {
    return true;
  } else {
    return false;
  }
  } catch (err) {
    return true;
  }
}

Char.prototype.hurt = function() {
  if (!this.immunity) {
    this.health -= 50;
    this.immunity = 40;
    playAudio(hurtSound);
  }
}

