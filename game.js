//var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width = 757;
var height = canvas.height = 710;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/background.png";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = "images/hero.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
};
monsterImage.src = "images/monster.png";

var hero = {
  speed: 256
};
var monster = {};
var monstersCaught = 0;

var keysDown = {};
var state = 0;
addEventListener("keydown", function (key) {
  keysDown[key.keyCode] = true;
}, false);
addEventListener("keyup", function (key) {
  delete keysDown[key.keyCode];
}, false);

var reset = function () {
  // Reset player's position to centre of canvas
  if (state == 0) {
    hero.x = width/2;
    hero.y = height/2;    
  } else {
    // hero.x = Math.min(Math.max(hero.x, 2), width);
    // hero.y = Math.min(Math.max(hero.y, 2), height);
    hero.x = hero.x;
    hero.y = hero.y;
  }
  // Place the monster somewhere on the canvas randomly
  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
};

var update = function (modifier) {
  // var x = Math.min(Math.max(x,0+20),width-80);
  // var y = Math.min(Math.max(y,0+80),height-90);  
  if (38 in keysDown) {
    hero.y -= hero.speed * modifier;
    hero.y = Math.min(Math.max(hero.y, 2), height-30);
  }
  if (40 in keysDown) {
    hero.y += hero.speed * modifier;
    hero.y = Math.min(Math.max(hero.y, 2), height-30);

  }
  if (37 in keysDown) {
    hero.x -= hero.speed * modifier;
    hero.x = Math.min(Math.max(hero.x, 2), width-30);
  }
  if (39 in keysDown) {
    hero.x += hero.speed * modifier;
    hero.x = Math.min(Math.max(hero.x, 2), width-30);

  }

  if (
    hero.x <= (monster.x + 32)
    && monster.x <= (hero.x + 32)
    && hero.y <= (monster.y + 32)
    && monster.y <= (hero.y + 32)
  ) {
    ++monstersCaught;
    state = 1;
    reset();
  }
};

var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "30px VTFMisterPixelRegular";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Monsters caught: " + monstersCaught, 20, 20);
  ctx.fillText("Time: " + count, 20, 50);

  if(finished==true){
    ctx.fillText("Game over !", (width/2)-72, height/2);
  }
};

var count = 30;
var finished = false;
var counter =function(){
  count=count-1;
  // when count reaches 0 clear the timer, hide monster and
  // hero and finish the game
    if (count <= 0)
    {
       clearInterval(counter);
       // set game to finished
       finished = true;
       count=0;
       // hider monster and hero
       monsterReady=false;
       heroReady=false;
    }
}

setInterval(counter, 1000);
// The main game loop
var main = function () {
  // run the update function
  update(0.02);
  // run the render function
  render();
  // Request to do this again ASAP
  requestAnimationFrame(main);
};

  function Replay(){
    location.reload();
  }

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
// Let's play this game!
reset();
main();