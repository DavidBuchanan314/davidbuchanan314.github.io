var rect = canvas.getBoundingClientRect();

var mouse = {
  x: 0,
  y: 0,
  isDown: false,
}

canvas.addEventListener('mousemove', function(e) {
  if (e.pageX || e.pageY) { 
    mouse.x = e.pageX;
    mouse.y = e.pageY;
  } else { 
    mouse.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
    mouse.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
  } 
  mouse.x -= c.offsetLeft;
  mouse.y -= c.offsetTop;
}, false);

canvas.addEventListener("mousedown", function() {
  mouse.isDown = true;
}, false);

canvas.addEventListener("mouseup", function() {
  mouse.isDown = false;
}, false);
