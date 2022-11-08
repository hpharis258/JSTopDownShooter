function playShotSound()
{
    let shotSound = new Audio('./GameSounds/GameShotSound.mp3');
    shotSound.play();
}

// Player Class
class Player{
    // Constructor
    constructor()
    {
        this.pos = createVector(width/2, height /2);
        this.angle = 0;
        this.bullets = [];
    }
    // Method to draw the player on to the canvas
    draw()
    {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        rect(0, 0, 20, 20);
        pop();

        for(let bullet of this.bullets)
        {
            bullet.update();
            bullet.draw();
        }
    }
    // Controls and Update
    update()
    {
        let xSpeed = 0;
        let ySpeed = 0;
        if(keyIsDown(65)){
            xSpeed = -2;
        }
        if(keyIsDown(68)){
            xSpeed = 2;
        }
        if(keyIsDown(87)){
            ySpeed = -2;
        }
        if(keyIsDown(83)){
            ySpeed = 2;
        }
        this.pos.add(xSpeed, ySpeed);
        this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
    }
    shoot()
    {
        this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle));
        playShotSound();
    }
    hasShot(enemy)
    {
        for(let i = 0; i < this.bullets.length; i++)
        {
            if(dist(this.bullets[i].x, this.bullets[i].y, enemy.pos.x, enemy.pos.y) < 15)
            {
                this.bullets.splice(i, 1);
                enemyShotSoundEffect();
                return true;
            }
        }
        return false;
    }
}

function enemyShotSoundEffect()
{
    let soundEffect = new Audio('./GameSounds/enemyShot.mp3');
    soundEffect.play();
}