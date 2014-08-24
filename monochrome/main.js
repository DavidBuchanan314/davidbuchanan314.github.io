var c=document.getElementById("canvas");
var ctx=c.getContext("2d");

xOffset = 0;
yOffset = -32;

var colored = false;

var clock = 0;

var objects = [];

var audio = [];

var layer = {
  level: 0,
  player: 1,
  hud: 2, 
  menu: 3,
}

var coinSound = new Audio("sound/coin.wav");
var jumpSound = new Audio("sound/jump.wav");
var teleportSound = new Audio("sound/teleport.wav");
var chargeSound = new Audio("sound/charge.wav");
var hurtSound = new Audio("sound/hurt.wav");

var mainMenu = new Menu(layer["menu"], true);
objects.push(mainMenu);
mainMenu.add("monochrome", 10, 80, 58.33333, false);
mainMenu.add("play", 10, 200, 50, true, play);
mainMenu.add("credits", 10, 240, 50, true, credits);

var levelComplete = new Menu(layer["menu"], false);
objects.push(levelComplete);
levelComplete.add("level", 10, 80, 75, false);
levelComplete.add("complete", 10, 160, 75, false);

var gameOver = new Menu(layer["menu"], false);
objects.push(gameOver);
gameOver.add("game over", 10, 80, 75, false);
gameOver.add("play again", 10, 200, 50, true, refresh);

var youWin = new Menu(layer["menu"], false);
objects.push(youWin);
youWin.add("you win!", 10, 80, 75, false);
youWin.add("thanks for playing.", 10, 200, 41.666, false);
youWin.add("play again", 10, 280, 50, true, refresh);

var credits = new Menu(layer["menu"], false);
objects.push(credits);
credits.add("credits", 10, 80, 75, false);
credits.add("programming:", 10, 200, 50, false);
credits.add(" david buchanan", 10, 240, 50, false);
credits.add("software:", 10, 290, 50, false);
credits.add(" jfxr, gimp, figure", 10, 330, 41.666, false);
credits.add("back", 10, 420, 50, true, quitCredits);

var hud = new HUD(layer["hud"], false);
objects.push(hud);

var blockBlack = new Image();
blockBlack.src = "img/tiles/main_black.png";
var blockColor = new Image();
blockColor.src = "img/tiles/main_color.png";

var batteryBlack = new Image();
batteryBlack.src = "img/tiles/battery_black.png";
var batteryColor = new Image();
batteryColor.src = "img/tiles/battery_color.png";

var spikeBlack = new Image();
spikeBlack.src = "img/tiles/spike_black.png";
var spikeColor = new Image();
spikeColor.src = "img/tiles/spike_color.png";

var charBlack = new Image();
charBlack.src = "img/tiles/char_black.png";

var teleportBlack = new Image();
teleportBlack.src = "img/tiles/teleport_black.png";

var starBlack = new Image();
starBlack.src = "img/tiles/star_black.png";
var starColor = new Image();
starColor.src = "img/tiles/star_color.png";

var coinColor = new Image();
coinColor.src = "img/tiles/coin_color.png";

var blank = new Image();
blank.src = "img/tiles/blank.png";

var lv1 = new Tiles(layer["level"], false, lv1Map);
objects.push(lv1);
//yOffset = (lv1Map.length*64)-544;

var player = new Char(layer["player"], false);
objects.push(player);
player.x = 64;
player.y = 447;

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var gameLoop = function() {
  requestAnimFrame(gameLoop);
  update();
  render();
}

var tick = function() {
  clock += 1
  setTimeout(tick, 300);
}

var hideAll = function() {
  for (var i = 0; i < objects.length; i++) {
    objects[i].visible = false;
  } 
}

var update = function() {
  for (var i = 0; i < objects.length; i++) {
    objects[i].update();
  } 
}

var render = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  objects.sort(compare);
  for (var i = 0; i < objects.length; i++) {
    objects[i].render();
  } 
}

var playAudio = function(sound) {
  audio.push(sound.cloneNode());
  audio[audio.length-1].play();
  setTimeout(function(){audio.splice( 0, 1 )}, 1000);
}

function play() {
  mainMenu.visible = false;
  lv1.visible = true;
  player.visible = true;
  hud.visible = true;
}

function credits() {
  mainMenu.visible = false;
  credits.visible = true;
}

function quitCredits() {
  mainMenu.visible = true;
  credits.visible = false;
}

function compare(a,b) {
  if (a.layer < b.layer)
     return -1;
  if (a.layer > b.layer)
    return 1;
  return 0;
}

function die() {
  gameOver.visible = true;
}

function refresh() {
  location.reload(); 
}

var loop = new Audio("sound/loop.mp3"); 
loop.addEventListener("ended", function() {
    this.currentTime = 0;
    this.play();
}, false);

console.log(localStorage.getItem("muted"));

if (localStorage.getItem("muted") != "true") {
  loop.play(); 
} else {
  document.getElementById("soundButton").src = "img/soundOff.png";
}

tick();
gameLoop();

