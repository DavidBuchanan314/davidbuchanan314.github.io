function HUD(layer, visibility) {
  this.items = [];
  this.layer = layer;
  this.visible = visibility;
};

HUD.prototype.update = function() {
  if (this.visible) {

  }
}

HUD.prototype.render = function() {
  if (this.visible) {
  
    ctx.fillStyle = "green";
    ctx.fillRect(40,30,150,25);
    ctx.fillRect(450,30,150,25);
    if (!player.canTeleport) ctx.fillStyle = "grey";
    if (player.power <= 0) ctx.fillStyle = "red";
    ctx.fillRect(245,30,150,25);
    
    ctx.fillStyle = "#FF0000";

    ctx.globalAlpha=1-(player.health/100);
    ctx.fillRect(40,30,player.health*1.5,25); 
    
    if (player.canTeleport) {
      ctx.globalAlpha=1-(player.power/100); 
      ctx.fillRect(245,30,player.power*1.5,25);     
    }
    
    ctx.globalAlpha=1-(player.air/100);    
    ctx.fillRect(450,30,player.air*1.5,25);
    
    ctx.globalAlpha=1;
  
    ctx.font = "25px slkscr";
    ctx.fillStyle = "black";
    ctx.fillText("air", 450, 50);
    ctx.fillText("power", 245, 50);
    ctx.fillText("health", 40, 50);
    
    ctx.fillText("coins left: ", 245, 75);
    ctx.fillText(lv1.coins, 450, 75);
  }
}
