let canvas = document.querySelector("canvas");

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.modifier = Math.floor(Math.random() * 1000)/1000 + 1;
    this.locX = -50;
    this.locY = 43 + ((Math.floor(Math.random() * 3) * 85));
    console.log(this.locY);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.locX >= 480){
        this.locY = 43 + ((Math.floor(Math.random() * 3) * 85));
        this.modifier = Math.floor(Math.random() * 1000)/2000 + 1;
    }
    this.locX = (this.locX + dt * 100 * this.modifier) % 505;
    this.render();
    if(this.locX - 50 < player.locX && this.locX + 50 > player.locX && this.locY === player.locY){
        player.locY = 383;
        player.locX = 202.5;
        player.render();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.locX, this.locY);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.locX = canvas.width / 2 - 50;

    this.locY = canvas.height / 2 + 80;
    this.sprite1 = 'images/char-boy.png';
}

Player.prototype.update = function(){
    if(this.locY < 0){
        this.locY = 383;
    }
};
let char;
Player.prototype.render = function(){

    char = ctx.drawImage(Resources.get(this.sprite1), this.locX, this.locY);
}
console.log(Player);
Player.prototype.handleInput = function(input){
    switch(input){
        case "up":
            if(this.locY - 85 >= -90){
                this.locY -= 85;
                this.render();
            }
                console.log("x", this.locX, "y", this.locY);
                break;
        case "down":
            if(this.locY + 85 <= 383){
                this.locY += 85;
                this.render();
            }
                console.log("x", this.locX, "y", this.locY);
                break;
        case "left":
            if(this.locX - 101 >= 0){
                this.locX -= 101;
                this.render();
            }
                console.log("x", this.locX, "y", this.locY);
                break;
        case "right":
            if(this.locX + 101 <= 505){
                this.locX += 101;
                this.render();
            }
                console.log("x", this.locX, "y", this.locY);
                break;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for(var i = 0; i < 5; i++){
    allEnemies[i] = new Enemy();
}
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
