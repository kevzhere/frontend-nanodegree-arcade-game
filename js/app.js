let scoreKeeper = document.querySelector("#score"),
    character = document.querySelector("#char"),
    charSelector= ["images/char-boy.png", "images/char-cat-girl.png", "images/char-horn-girl.png",
                "images/char-pink-girl.png", "images/char-princess.png"],
    enemies = document.querySelector("#enemy"),
    enemy = 5;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //randomly generator for speed
    this.modifier = Math.floor(Math.random() * 1000)/950 + 1;
    //initial starting location x
    this.locX = -50;
    //random starting location y
    this.locY = 43 + ((Math.floor(Math.random() * 3) * 85));

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
//if enemy runs into player, player is resetted
Enemy.prototype.update = function(dt) {
    //reset enemy location
    if(this.locX >= 500){
        this.locY = 43 + ((Math.floor(Math.random() * 3) * 85));
        this.modifier = Math.floor(Math.random() * 1000)/2000 + 1;
    }
    this.locX = (this.locX + dt * 100 * this.modifier) % 505;
    this.render();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.locX, this.locY);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//instantiate player info
var Player = function(){
    this.score = 0;
    this.locX = canvas.width / 2 - 50;
    this.locY = canvas.height / 2 + 80;
    this.sprite1 = charSelector[character.value-1];
}

//update player score and location if player reaches the end
Player.prototype.update = function(){
    if(this.locY < 0){
        this.locY = 383;
        this.score++;
    }
            scoreKeeper.textContent = this.score;

};

//render player character
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite1), this.locX, this.locY);
}

//player movement handler
Player.prototype.handleInput = function(input){
    switch(input){
        case "up":
            if(this.locY - 85 >= -90){
                this.locY -= 85;
                this.render();
            }
                break;
        case "down":
            if(this.locY + 85 <= 383){
                this.locY += 85;
                this.render();
                console.log(charSelector[character.value-1], enemy)
            }
                break;
        case "left":
            if(this.locX - 101 >= 0){
                this.locX -= 101;
                this.render();
            }
                break;
        case "right":
            if(this.locX + 101 <= 505){
                this.locX += 101;
                this.render();
            }
                break;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//creating enemies
var allEnemies = [];
for(var i = 0; i < enemy; i++){
    allEnemies[i] = new Enemy();
}

//creating new player
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

function changeChar(){
    console.log(character.value);
    console.log("changing char", player.sprite1);
    player.sprite1 = charSelector[character.value-1];
    player.render();
}

function changeEnemy(){
    enemy = enemies.value;
    console.log(enemy);
}

