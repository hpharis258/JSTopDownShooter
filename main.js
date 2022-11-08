
startGameAudio();
let player;
let enemies = [];
let enemySpawnTime = 300;
let enemyMaxSpeed = 2;
let frame = 0;
let score = 0;
function setup(){
    createCanvas(700,700);
    player = new Player();
}



function draw(){
    
    background(100,100,100);
    rectMode(CENTER);
    player.draw();
    player.update();
    //
    for(let i = enemies.length - 1; i >= 0; i--)
    {
        enemies[i].draw();
        enemies[i].update();
        // Check if player is dead
        if(enemies[i].isPlayerAlive())
        {
            let listItem = document.createElement('li');
            //let addScore = document.getElementById("Scores");
            listItem.appendChild(document.createTextNode(score));
            document.querySelector('ol').appendChild(listItem);
            restart();
            break;
        }
        //
        if(player.hasShot(enemies[i]))
        {
            console.log("shot");
            score++;
            enemies.splice(i, 1);
        }
    }
    if(frame >= enemySpawnTime){
        enemies.push(new Enemy(2));
        enemySpawnTime *= 0.95;
        frame = 0;
    }
    if(frameCount % 1000 == 0)
    {
        enemyMaxSpeed += 0.1;
    }
    frame++;
    textAlign(CENTER);
    textSize(40);
    text(score, width/2, 100);
}
//
function mouseClicked()
{
    player.shoot();
}

// Reset the Game
function restart()
{
    player = new Player();
    enemies = [];
    enemySpawnTime = 300;
    enemyMaxSpeed = 2;
    score = 0;
    
}

//Game Audio
function startGameAudio()
{
    let audio = new Audio('./GameSounds/gameSoundTrack.mp3');
    audio.volume = 0.5;
    audio.play();
}