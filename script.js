let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 700;
document.body.appendChild(canvas);

// Background image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";


// rat image
let submarineReady = false;
let submarineImage = new Image();
submarineImage.onload = function () {
    submarineReady = true;
};
submarineImage.src = "images/submarine.png";

// cheese image
let shellReady = false;
let shellImage = new Image();
shellImage.onload = function () {
    shellReady = true;
};
shellImage.src = "images/seashells.png";

// trap image
let trapReady = false;
let trapImage = new Image();
trapImage.onload = function () {
    trapReady = true;
};
trapImage.src = "images/jellyfish.gif";

// portalHome image
let portalHomeReady = false;
let portalHomeImage = new Image();
portalHomeImage.onload = function () {
    portalHomeReady = true;
};
portalHomeImage.src = "images/Home.png";

//===============================//

// Game objects
let portal = {
    speed: 256, // movement in pixels per second
    x: 0, // where on the canvas are they?
    y: 0 // where on the canvas are they?
};

let shell0 = {
    x: 0, // where on the canvas are they?
    y: 0 // where on the canvas are they?
};

let shell1 = {
    x: 0, // where on the canvas are they?
    y: 0 // where on the canvas are they?
};

let trap0 = {
    x: 0, // where on the canvas are they?
    y: 0 // where on the canvas are they?
};

let trap1 = {
    x: 0, // where on the canvas are they?
    y: 0 // where on the canvas are they?
};

let trap2 = {
    x: 0, // where on the canvas are they?
    y: 0 // where on the canvas are they?
};

let portalHome = {
    // for this version, the portalHome does not move, so just and x and y
    x: 0,
    y: 0
};
let shellsCollected = 0;
let shellOnHand = 0;

// Handle keyboard controls
let keysDown = {
    keysDown: [] //[38 = "down"]
};
//object were we properties when keys go down
// and then delete them when the key goes up
// so the object tells us if any key is down when that keycode
// is down. In our game loop, we will move the rat image if when
// we go thru render, a key is down

addEventListener("keydown", function (e) {
    keysDown.FirstName = "Yacquub";
    console.log(e.keyCode + " down")
    keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
    console.log(e.keyCode + " up")
    delete keysDown[e.keyCode];
}, false);

//================================// FUNCTIONS

//Timer code, counts down

    

// Update game objects
let update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        portal.y -= portal.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        portal.y += portal.speed * modifier;
    }
    if (37 in keysDown) { // Player holding left
        portal.x -= portal.speed * modifier;
    }
    if (39 in keysDown) { // Player holding right
        portal.x += portal.speed * modifier;
    }

    // rat + cheese detection
    if (
        portal.x <= (shell0.x + 64)
        && shell0.x <= (portal.x + 62)
        && portal.y <= (shell0.y + 64)
        && shell0.y <= (portal.y + 42)
    ) {
        ++shellOnHand;
        shell0.x = -200;
        shell0.y = -200;
    }
    if (

        portal.x <= (shell1.x + 64)
        && shell1.x <= (portal.x + 62)
        && portal.y <= (shell1.y + 64)
        && shell1.y <= (portal.y + 42)

    ) {
        ++shellOnHand;
        shell1.x = -200;
        shell1.y = -200;
    }

    // rat + ratHome detection
    if (
        portal.x <= (portalHome.x + 64)
        && portalHome.x <= (portal.x + 62)
        && portal.y <= (portalHome.y + 64)
        && portalHome.y <= (portal.y + 42)
        && shellOnHand >= 1
    ) {

        shellsCollected = shellsCollected + shellOnHand; // Earned points
        soundEfx.src = "sounds/timeup.mp3"
        soundEfx.play();
        reset(); // start a new cycle
    }

    // portal + trap detection
    if (
        portal.x <= (trap0.x + 64)
        && trap0.x <= (portal.x + 62)
        && portal.y <= (trap0.y + 18)
        && trap0.y <= (portal.y + 42)

        || portal.x <= (trap1.x + 64)
        && trap1.x <= (portal.x + 62)
        && portal.y <= (trap1.y + 18)
        && trap1.y <= (portal.y + 42)

        || portal.x <= (trap2.x + 64)
        && trap2.x <= (portal.x + 62)
        && portal.y <= (trap2.y + 18)
        && trap2.y <= (portal.y + 42)
    ) {
        GameOver("caught");
    }
};

// Draw everything in the main render function
let render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (submarineReady) {
        ctx.drawImage(submarineImage, portal.x, portal.y);
    }
    if (shellReady) {
        ctx.drawImage(shellImage, shell0.x, shell0.y);
        ctx.drawImage(shellImage, shell1.x, shell1.y);
    }
    if (portalHomeReady) {
        ctx.drawImage(portalHomeImage, portalHome.x, portalHome.y);
    }
    if (trapReady) {
        ctx.drawImage(trapImage, trap0.x, trap0.y);
        ctx.drawImage(trapImage, trap1.x, trap1.y);
        ctx.drawImage(trapImage, trap2.x, trap2.y);
    }
    // Score
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "20px Georgia";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + shellsCollected, 32, 32);
    ctx.fillText("On hand: " + shellOnHand, 32, 64);
    // Achievement badges :)
    if (shellsCollected >= 25) {
        ctx.fillText("25 POINT MILESTONE !", 32, 96);
    }
    if (shellsCollected >= 50) {
        ctx.fillText("50 POINT MILESTONE !!", 32, 128);
    }
    if (shellsCollected >= 100) {
        ctx.fillText("100 POINT MILESTONE !!! (Omg, I didn't think you could play this for so long)", 32, 128);
    }

}

//================================// MAIN GAME LOOP
let main = function () {
    let now = Date.now();
    let delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Reset the game when the player reaches ratHome
let reset = function () {
    shellOnHand = 0;

    portal.x = (canvas.width / 2) - 16;
    portal.y = (canvas.height / 2) - 16;

    //Place the ratHome somewhere on the screen randomly
    // but not in the hedges, Article in wrong, the 64 needs to be
    // hedge 64 + hedge 64 + char 64 = 96
    portalHome.x = 64 + (Math.random() * (canvas.width - 96));
    portalHome.y = 64 + (Math.random() * (canvas.height - 96));

    shell0.x = 64 + (Math.random() * (canvas.width - 96));
    shell0.y = 64 + (Math.random() * (canvas.height - 96));
    shell1.x = 64 + (Math.random() * (canvas.width - 96));
    shell1.y = 64 + (Math.random() * (canvas.height - 96));

    trap0.x = 64 + (Math.random() * (canvas.width - 96));
    trap0.y = 64 + (Math.random() * (canvas.height - 96));
    trap1.x = 64 + (Math.random() * (canvas.width - 96));
    trap1.y = 64 + (Math.random() * (canvas.height - 96));
    trap2.x = 64 + (Math.random() * (canvas.width - 96));
    trap2.y = 64 + (Math.random() * (canvas.height - 96));

    //makes sure nothing renders on top of the portal
    if (
        portal.x <= (trap0.x + 64)
        && trap0.x <= (portal.x + 62)
        && portal.y <= (trap0.y + 18)
        && trap0.y <= (portal.y + 42)

        || portal.x <= (trap1.x + 64)
        && trap1.x <= (portal.x + 62)
        && portal.y <= (trap1.y + 18)
        && trap1.y <= (portal.y + 42)

        || portal.x <= (trap2.x + 64)
        && trap2.x <= (portal.x + 62)
        && portal.y <= (trap2.y + 18)
        && trap2.y <= (portal.y + 42)

        || portal.x <= (portalHome.x + 64)
        && portalHome.x <= (portal.x + 62)
        && portal.y <= (portalHome.y + 64)
        && portalHome.y <= (portal.y + 42)

        || portal.x <= (shell0.x + 64)
        && shell0.x <= (portal.x + 62)
        && portal.y <= (shell0.y + 64)
        && shell0.y <= (portal.y + 42)

        || portal.x <= (shell1.x + 64)
        && shell1.x <= (portal.x + 62)
        && portal.y <= (shell1.y + 64)
        && shell1.y <= (portal.y + 42)
    ) {
        reset();
    }
};

// Game Over Function
let GameOver = function (condition) {
    if (condition === "caught") {
        alert("[GAME OVER] You got caught by the trap! You've collected " + shellsCollected + " pieces of shells.");
        timeleft = -1;
    } else if (condition = null) {
        alert("[GAME OVER] Times up! You've collected " + shellsCollected + " pieces of shells.");
        timeleft = -1;
    }
    soundEfx.src = "sounds/game-overmp3.mp3"
    soundEfx.play();
}

// Let's play this game!
var then = Date.now();
reset();
main(); 