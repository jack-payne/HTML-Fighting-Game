const canvas = document.querySelector('canvas');// This selects the canvas element in the html page, we are storing canvas in canvas
const c = canvas.getContext('2d');// This makes it a 2d game, tags 2d functions for the canvas
//these are out two main const. calling c allows us to draw images on the html
canvas.width = 1024;// These two make the width and height of the game to fit on the screen
canvas.height = 576;
c.fillRect(0,0, canvas.width, canvas.height);//takes four arguements (x starting point, y starting point, width, height)
//use object oriented programming on player and enemy rectangles because they should interact
const gravity = 0.7
const background = new Sprite({
    position :{
        x: 0,
        y:-200
    },
    imageSrc: './img/finalNight.png',
    //imageSrc: './img/Free Pixel Art Forest/Preview/Resized.png'
    scale: 2.4
})
const shop = new Sprite({
    position :{
        x: 600,
        y: 175
    },
    imageSrc: './img/shop_anim.png',
    scale: 2.75,
    framesMax: 6
})
const ground_0 = new Sprite({
    position :{
        x: 0,
        y: 520
    },
    imageSrc: './img/dirt_ground_full.png',
    scale: 2.75
})
const player = new Fighter({//position is an object because it takes two parameters, and x and y value, now wrap twice because posotion is wrapped with velocity
    position:{
    x:0,
    y:100 // this is how you declare variables in an object
    },
    velocity :{
    x:0,
    y:10
    },
    height: 95,
    width: 80,
    color: 'red',
    attackBox: {
        offset:{
            x:65,
            y:0
        },
        width: 90,
        height: 40
    },
    attackBox_air: {
        offset:{
            x:100,
            y:-70
        },
        width: 110,
        height: 165
    },
    
    imageSrc: './img/Player1/wind_idle_right.png',
    framesMax: 8,
    scale: 2.8,
    imageOffset:  {
        x: 355,
        y: 260
    },
    sprites: {
        idle_right: {
            imageSrc: './img/Player1/wind_idle_right.png',
            framesMax: 8,
             
        },
        idle_left: {
            imageSrc: './img/Player1/wind_idle_left.png',
            framesMax: 8,

        },
        run_left: {
            imageSrc: './img/Player1/wind_run_left.png',
            framesMax: 8
            
        },
        run_right: {
            imageSrc: './img/Player1/wind_run_right.png',
            framesMax: 8
            
        },
        jump_left: {
            imageSrc: './img/Player1/wind_jump_left.png',
            framesMax: 3
            
        },
        jump_right: {
            imageSrc: './img/Player1/wind_jump_right.png',
            framesMax: 3
            
        },
        fall_left: {
            imageSrc: './img/Player1/wind_fall_left.png',
            framesMax: 3
            
        },
        fall_right: {
            imageSrc: './img/Player1/wind_fall_right.png',
            framesMax: 3
            
        },
        attack1_right: {
            imageSrc: './img/Player1/wind_attack1_right.png',
            framesMax: 8
            
        },
        attack1_left: {
            imageSrc: './img/Player1/wind_attack1_left.png',
            framesMax: 8
            
        },
        air_attack_right: {
            imageSrc: './img/Player1/wind_air_attack_right.png',
            framesMax: 7
            
        },
        air_attack_left: {
            imageSrc: './img/Player1/wind_air_attack_left.png',
            framesMax: 7
            
        },
        takeHit_left: {
            imageSrc: './img/Player1/wind_hit_left.png',
            framesMax: 6
        },
        takeHit_right: {
            imageSrc: './img/Player1/wind_hit_right.png',
            framesMax: 6
        },
        death: {
            imageSrc: './img/Player1/wind_death.png',
            framesMax: 19
        }
    }

    
    
})
const enemy = new Fighter({//position is an object because it takes two parameters, and x and y value
    position:{
        x:768,
        y:100 // this is how you declare variables in an object
    },
        velocity :{
        x:0,
        y:10
        },
        height: 95,
        width: 70,
        color: 'blue',
        
    
    imageSrc: './img/Player2/earth_idle_right.png',
    framesMax: 6,
    scale: 2.8,
    imageOffset:  {
        x: 365,
        y: 245
    },
    attackBox: {
        offset:{
            x:-70,
            y:0
        },
        width: 80,
        height: 50
    },
    attackBox_air: {
        offset:{
            x:-80,
            y:-60
        },
        width: 250,
        height: 130
    },
    sprites: {
        idle_right: {
            imageSrc: './img/Player2/earth_idle_right.png',
            framesMax: 6,

        },
        idle_left: {
            imageSrc: './img/Player2/earth_idle_left.png',
            framesMax: 6,

        },
        run_right: {
            imageSrc: './img/Player2/earth_run_right.png',
            framesMax: 8
            
        },
        run_left: {
            imageSrc: './img/Player2/earth_run_left.png',
            framesMax: 8
        },
        jump_left: {
            imageSrc: './img/Player2/earth_jump_right.png',
            framesMax: 3
            
        },
        jump_right: {
            imageSrc: './img/Player2/earth_jump_right.png',
            framesMax: 3
            
        },
        fall_left: {
            imageSrc: './img/Player2/earth_fall_left.png',
            framesMax: 3
            
        },
        fall_right: {
            imageSrc: './img/Player2/earth_fall_right.png',
            framesMax: 3
            
        },
        attack1_right: {
            imageSrc: './img/Player2/earth_attack1_right.png',
            framesMax: 6
            
        },
        attack1_left: {
            imageSrc: './img/Player2/earth_attack1_left.png',
            framesMax: 6
            
        },
        air_attack_right: {
            imageSrc: './img/Player2/earth_air_attack_right.png',
            framesMax: 7
            
        },
        air_attack_left: {
            imageSrc: './img/Player2/earth_air_attack_left.png',
            framesMax: 7
            
        },
        takeHit_left: {
            imageSrc: './img/Player2/earth_hit_left.png',
            framesMax: 6
        },
        takeHit_right: {
            imageSrc: './img/Player2/earth_hit_right.png',
            framesMax: 6
        },
        death: {
            imageSrc: './img/Player2/earth_death.png',
            framesMax: 19
        }
    }
})
player.draw()//this draws the player
enemy.draw()
//console.log(player)// console provides access to the browser, this outputs a message to the web console. give the website the player data
const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowUp:{
        pressed: false
    },
    ArrowDown:{
        pressed: false
    }
    
}
decreaseTimer()
function animation(){
    window.requestAnimationFrame(animation)// creates infinity loop of animation frame\
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.1)'// this makes white( Red Green, Blue, Alpha value is opacity of white)
    c.fillRect(0,0, canvas.width, canvas.height)// contrast to see players
    ground_0.update()
    player.update()
    enemy.update()

    //player movement
    player.velocity.x = 0// this sets defualt velocity to 0. If this wasn't here the velocity would not go back to normal when key is released
    
    if (keys.a.pressed && player.lastKey === 'a'){// this loop checks for keys pressed
        player.velocity.x = -5// this is so when we key up in the loop it doesn't just stop, without lastKey the movement would only go 5 pixel before stopping
        if(player.position.x >= enemy.position.x){
            player.switchSprite('run_right')
            }
            else{
                player.switchSprite('run_left')
            }
        
    }    else if (keys.d.pressed && player.lastKey === 'd'){
            player.velocity.x = 5
            if(player.position.x >= enemy.position.x){
                player.switchSprite('run_right')
                }
                else{
                    player.switchSprite('run_left')
                }
        }
        else{
            if(player.position.x >= enemy.position.x){
                player.switchSprite('idle_left')
        }
            else{
                player.switchSprite('idle_right')
        }
    }
    if(player.velocity.y < 0 && player.position.x >= enemy.position.x){
        player.switchSprite('jump_right')
    }
    else if(player.velocity.y < 0 && player.position.x <= enemy.position.x){
        player.switchSprite('jump_left')
    }
    else if(player.velocity.y > 0){
        if(player.position.x >= enemy.position.x){
            player.switchSprite('fall_right')
        }
        else{
            player.switchSprite('fall_left')
        }
    }
    //stop attacking while moving Player
    if(player.position.y >= 426 && (player.image === player.sprites.attack1_right.image || player.image === player.sprites.attack1_left.image) ){
        player.velocity.x = 0
    }
    //Player Walls
    if(player.position.x + player.width + player.velocity.x <= player.width || player.position.x + player.width + player.velocity.x > canvas.width){// stop sprite from going through the walls
        player.velocity.x = 0
        }
    
    
    //enemy movement / side switch
    enemy.velocity.x = 0// needed just like player velocity = 0
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' ){// this loop checks for keys pressed
        enemy.velocity.x = -5// this is so when we key up in the loop it doesn't just stop
        if(player.position.x <= enemy.position.x){
        enemy.switchSprite('run_right')
        }
        else{
            enemy.switchSprite('run_left')
        }
    }    else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
            enemy.velocity.x = 5
            if(player.position.x <= enemy.position.x){
                enemy.switchSprite('run_right')
                }
                else{
                    enemy.switchSprite('run_left')
                }
        }
        else{
            if(player.position.x <= enemy.position.x){
                enemy.switchSprite('idle_right')
        }
            else{
                enemy.switchSprite('idle_left')
        
    }
        }
        if(enemy.velocity.y < 0 && player.position.x >= enemy.position.x){
            enemy.switchSprite('jump_right')
        }
        else if(enemy.velocity.y < 0 && player.position.x <= enemy.position.x){
            enemy.switchSprite('jump_left')
        }
        else if(enemy.velocity.y > 0){
            if(player.position.x <= enemy.position.x){
                enemy.switchSprite('fall_right')
            }
            else{
                enemy.switchSprite('fall_left')
            }
        }
     //stop attacking while moving Enemy
     if(enemy.position.y >= 426 && (enemy.image === enemy.sprites.attack1_right.image || enemy.image === enemy.sprites.attack1_left.image) ){
        enemy.velocity.x = 0
    }
    //Enemy Walls
    if(enemy.position.x + enemy.width + enemy.velocity.x <= enemy.width || enemy.position.x + enemy.width + enemy.velocity.x > canvas.width){// stop sprite from going through the walls
        enemy.velocity.x = 0
        }
    //Detect Collision for player and enemy hit
    if(recCollision({
        rectangle1: player,
        rectangle2 : enemy}) && player.isAttacking && player.framesCurrent === 1  && player.velocity.y === 0){
            enemy.takeHit_enemy()
        player.isAttacking = false// so you only hit one and don't continuously keep hiting with one attack
        
        //document.querySelector('#enemyHealth').style.width = enemy.health + '%'//querySelector selects an element from a document
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
        
    }//if player misses
    //Detect Collision for player and enemy hit
    if(airRecCollision({
        rectangle1: player,
        rectangle2 : enemy}) && player.isAttacking && player.framesCurrent === 1 && player.velocity.y != 0){
            enemy.takeHit_enemy()
        player.isAttacking = false// so you only hit one and don't continuously keep hiting with one attack
        
        //document.querySelector('#enemyHealth').style.width = enemy.health + '%'//querySelector selects an element from a document
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
        }
        if(player.isAttacking && player.framesCurrent === 1){// so you don't walk into the enemy after attacking an hit them
            player.isAttacking = false
        }
     //if player misses
     //Detect Collision for Enemy and player hit
    if(recCollision({
        rectangle1: enemy,
        rectangle2 : player}) && enemy.isAttacking && enemy.framesCurrent === 1 && enemy.velocity.y === 0){
        player.takeHit()
        enemy.isAttacking = false// so you only hit one and don't continuously keep hiting with one attack
        
        //document.querySelector('#playerHealth').style.width = player.health + '%'
            gsap.to('#playerHealth', {
                width: player.health + '%'
            })
    }
    if(airRecCollision({
        rectangle1: enemy,
        rectangle2 : player}) && enemy.isAttacking && enemy.framesCurrent === 1 && enemy.velocity.y != 0){
        player.takeHit()
        enemy.isAttacking = false// so you only hit one and don't continuously keep hiting with one attack
        
        //document.querySelector('#playerHealth').style.width = player.health + '%'
            gsap.to('#playerHealth', {
                width: player.health + '%'
            })
            
    }// if enemy misses they are no longer attacking
    if(enemy.isAttacking && enemy.framesCurrent === 1){
        enemy.isAttacking = false
    }
    //Side Switch for both players
    if(player.position.x >= enemy.position.x){
        player.attackBox.offset.x = -65
        enemy.attackBox.offset.x = 70
        player.attackBox_air.offset.x = -110
        enemy.attackBox_air.offset.x = -80
        
    }
    else{
        player.attackBox.offset.x = 70
        enemy.attackBox.offset.x = -70
        player.attackBox_air.offset.x = 100
        enemy.attackBox_air.offset.x = -80
    }
    
    //End Game Based on Health
    if(enemy.health <= 0 || player.health <= 0){
        determineWinner({player, enemy, timerId})

    }
    
}

animation()
//PART 3 Adding Event Listeners
let playerJumps = 0; // Jump count for the player
let enemyJumps = 0; // Jump count for the enemy
let isSpaceBarPressed = false;
let isArrowDownPressed = false;
window.addEventListener('keydown', (event) => {// input that triggers an event
    if(!player.dead){// stop moving after dead

    
    switch(event.key){// this makes the player or enemy move, gives the html the info to switch position
        case 'd'://player
        keys.d.pressed = true
        player.lastKey = 'd'
        break
        case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
        case 'w':
        if(player.position.y + player.height + player.velocity.y >= canvas.height -59){// if on ground can jump
            player.velocity.y = -16
            playerJumps = 0// basically resets jumps when you touch the ground
            playerJumps += 1    
        }
        else if(player.position.y + player.height + player.velocity.y < canvas.height && playerJumps < 2){// double jump
            player.velocity.y = -10
            playerJumps += 1
        }
        else{
            keys.w.pressed = false// no more jumps after double jump
        }
        break
        case ' ':
        if (!isSpaceBarPressed) {
            player.player_attack();
            isSpaceBarPressed = true;
        }
        break;
        
    }
    }
    if(!enemy.dead){
    switch(event.key){
        //enemy
        case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
        case 'ArrowUp':
            if(enemy.position.y + enemy.height + enemy.velocity.y >= canvas.height - 59){// if on ground can jump
                enemy.velocity.y = -16
                enemyJumps = 0// basically resets jumps when you touch the ground
                enemyJumps += 1    
            }
            else if(enemy.position.y + enemy.height + enemy.velocity.y < canvas.height && enemyJumps < 2){
                enemy.velocity.y = -10
                enemyJumps += 1
            }
            else{
                keys.ArrowUp.pressed = false
            }
        break
        case 'ArrowDown':
        if(!isArrowDownPressed) {
            enemy.enemy_attack()
            isArrowDownPressed = true;
            }
        break
    }
}
})
window.addEventListener('keyup', (event) => {// release key means stop moving
    if(event.key === ' ') {
        isSpaceBarPressed = false;
    }
    if(event.key === 'ArrowDown') {
        isArrowDownPressed = false;
    }
    switch(event.key){
        case 'd':
        keys.d.pressed = false
        break
        case 'a':
        keys.a.pressed = false
        break
        case 'w':
        keys.w.pressed = false
        break
    }
    switch(event.key){
        case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
        case 'ArrowUp':
        keys.ArrowUp.pressed = false
        break
    }
 // logs the value of the event.key property to the console
})