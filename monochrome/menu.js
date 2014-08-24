function Menu(layer, visibility) {
  this.items = [];
  this.layer = layer;
  this.visible = visibility;
};

Menu.prototype.update = function() {
  if (this.visible) {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].clickable) {
        if (mouse.y > this.items[i].y-(this.items[i].height*0.6) && mouse.y < this.items[i].y) {
          this.items[i].mouseOver = true;
          if (mouse.isDown) this.items[i].action();
        } else {
          this.items[i].mouseOver = false;
        }
      }
    } 
  }
}

Menu.prototype.render = function() {
  if (this.visible) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < this.items.length; i++) {
      ctx.font=this.items[i].font;
      if (this.items[i].mouseOver) {
        ctx.fillStyle = "red";
      } else {
        ctx.fillStyle = "black";
      }
      ctx.fillText(this.items[i].text,this.items[i].x,this.items[i].y);
    } 
  }
}

Menu.prototype.add = function(text, x, y, font, clickable, action) {
  this.items.push({
    text: text,
    x: x,
    y: y,
    height: font,
    font: font + "px slkscr",
    clickable: clickable,
    mouseOver:false,
    action: action,
  });
}

Menu.prototype.clear = function() {
  this.items = [];
}
