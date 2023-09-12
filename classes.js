class Sprite{
    constructor({position, imageSrc, scale = 1, framesMax = 1, imageOffset = {x:0, y:0}}){
        this.position = position
        //this.height = 150
        //this.width = 0 - This was here originally because Sprite was the original hitbox and that later because Fighter
        this.image = new Image()// creates an html image in javascript property
        this.image.src = imageSrc // stores image in property of image
        this.scale = scale
        this.framesMax  = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.imageOffset = imageOffset
        
        

    }
    
draw(){
    c.drawImage(this.image,// image used
        this.framesCurrent * (this.image.width / this.framesMax),//x coordinate where to start clipping
        0,//y coordinate where to start clipping- this is 0 because you always start clipping on the bottom of the image
        this.image.width / this.framesMax,//width of cropped image
        this.image.height, //height of cropped image
        this.position.x - this.imageOffset.x, //x position of image
        this.position.y - this.imageOffset.y,//y position of image
        (this.image.width / this.framesMax) * this.scale,//width of image
         this.image.height * this.scale )//height of image
        

    }
animateFrames(){
    this.framesElapsed++
    if(this.framesElapsed % this.framesHold === 0){ //slows down the animation
        if(this.framesCurrent < this.framesMax - 1){
            this.framesCurrent++
        }
        else{
            this.framesCurrent = 0
        }
        
        }
    }
update(){// UPDATES FOR STATIC SPRITES
    this.draw()
    this.animateFrames()
}
}//player uses the class Sprite with an object as a parameter


//FIGHTER CLASS
class Fighter extends Sprite{
    constructor({position, velocity, height, width, color, imageSrc, scale = 1, framesMax = 1, attackBox = { offset : {}, width: undefined, height: undefined}, attackBox_air = { offset : {}, width: undefined, height: undefined} ,imageOffset = {x:0, y:0}, sprites}){// takes a postion arguement because different Sprites will have different positons
    //when ever you start a class you need a cosntructor method
        //contrusctor is fired everytime we create a new sprite
        //position and velocity are wrapped because remembering order of input will be harder as it gets bigger, not nessecary bit useful\
        super({
            position, imageSrc, scale, framesMax, imageOffset
        })//calls const of parent
        
        this.velocity = velocity
        this.height = height
        this.width = width
        this.lastKey = ''// added this because both player and enemy need it, lastKey is meaning if the button is being held
        this.attackBox = {
            position:  {
                x: this.position.x,
                y:this.position.y 
            },
            offset: attackBox.offset,// adjust attackBox for player and enemy, this is short hand syntax
            width: attackBox.width,
            height: attackBox.height
        }
        this.attackBox_air = {
            position:  {
                x: this.position.x,
                y:this.position.y 
            },
            offset: attackBox_air.offset,// adjust air attackBox for player and enemy, this is short hand syntax
            width: attackBox_air.width,
            height: attackBox_air.height
        }
        this.color = color
        this.isAttacking = false
        this.isAttacking_air = false
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites
        this.dead = false
    

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc
        }

    }
    // draw() {//draws players and attack boxes
    //     c.fillStyle = this.color
    //     c.fillRect(this.position.x, this.position.y, this.width, this.height)
    //     // attack box
    //     if (this.isAttacking) {
    //       c.fillStyle = 'green'
    //       c.fillRect(
    //         this.attackBox.position.x,
    //         this.attackBox.position.y,
    //         this.attackBox.width,
    //         this.attackBox.height
    //       )
    //     }
    // }
update(){// this updates movement and stops you from falling on the ground, UPDATE FOR PLAYER SPRITES
    this.draw()
    if(!this.dead) this.animateFrames()
    //update attack box movement
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x//updates the basic attack box to move with you
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y
    // update air attack box movement
    this.attackBox_air.position.x = this.position.x + this.attackBox_air.offset.x//updates the basic attack box to move with you
    this.attackBox_air.position.y = this.position.y + this.attackBox_air.offset.y
    //c.fillRect(this.attackBox_air.position.x,this.attackBox_air.position.y, this.attackBox_air.width, this.attackBox_air.height)
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    //gravity function
    if(this.position.y + this.height + this.velocity.y >= canvas.height - 55){
        this.velocity.y = 0// position was added so you do not move
        this.position.y = 426// this was added to stop a stutter when you hit the ground
        }// when you hit the ground you would go from idle to fall back to idle for an instant
        else{// the small gap as you hit the floor caused issues beause velocity would go from like 21 to 0 in a frame
            this.velocity.y += gravity // velocity at 0 would get low enough to where it wouldnt pass the if statement and have gravity, so negative velocity gets you the fall animation
        }
    }
player_attack1(){//BASIC ATTACK AND AIR ATTACK ARE THE SAME COMMAND
    if(player.velocity.y != 0){
        player.switchSprite('air_attack_left')
    }
    
    if(player.position.x >= enemy.position.x){
        player.switchSprite('attack1_right')
        
    }
    else{
        player.switchSprite('attack1_left')
    }
    this.isAttacking = true
    // 100 milleseconds
}
enemy_attack(){
    if(player.position.x <= enemy.position.x){
        enemy.switchSprite('attack1_right')
        
    }
    else{
        enemy.switchSprite('attack1_left')
    }
    this.isAttacking = true
}
takeHit(){
    this.health -= 20
    if(this.health <= 0){
        this.switchSprite('death')
    }
    else{
        if(player.position.x >= enemy.position.x){
            this.switchSprite('takeHit_right')
            }
            else{
                this.switchSprite('takeHit_left')
            }
    }
}
takeHit_enemy(){
    this.health -= 20
    if(this.health <= 0){
        this.switchSprite('death')
    }
    else{
        if(player.position.x <= enemy.position.x){
        this.switchSprite('takeHit_left')
        }
        else{
            this.switchSprite('takeHit_right')
        }
    }
}
player_miss(){
    if(player.isAttacking && player.framesCurrent === 1){// so you don't walk into the enemy after attacking an hit them
        player.isAttacking = false
    }
}
switchSprite(sprite){// made this because player.image = player.sprites.run.image is inefficent to do in every frame
    if(this.image === this.sprites.death.image){//death overrides other animation
        if( this.framesCurrent === this.sprites.death.framesMax - 1){// stops death frame from repeating
            this.dead = true
        }
        return
    }
    // ATTACKS OVERRIDING ANIMATION
    if(this.image === this.sprites.attack1_right.image && this.framesCurrent < this.sprites.attack1_right.framesMax - 1){// so attack goes through regardles of that you are doing as long as its inputed, overrides all animations
        return// second condition in if statement means once the animation plays out do not return here
    }
    if(this.image === this.sprites.attack1_left.image && this.framesCurrent < this.sprites.attack1_left.framesMax - 1){// so attack goes through regardles of that you are doing as long as its inputed, overrides all animations
        return// second condition in if statement means once the animation plays out do not return here
    }
    if(this.image === this.sprites.air_attack_left.image && this.framesCurrent < this.sprites.air_attack_left.framesMax - 1){// so attack goes through regardles of that you are doing as long as its inputed, overrides all animations
        return// second condition in if statement means once the animation plays out do not return here
    }
    if(this.image === this.sprites.air_attack_right.image && this.framesCurrent < this.sprites.air_attack_right.framesMax - 1){// so attack goes through regardles of that you are doing as long as its inputed, overrides all animations
        return// second condition in if statement means once the animation plays out do not return here
    }
    //override fighter when hit
    if(this.image === this.sprites.takeHit_left.image && this.framesCurrent < this.sprites.takeHit_left.framesMax -1){
        return
    }
    if(this.image === this.sprites.takeHit_right.image && this.framesCurrent < this.sprites.takeHit_right.framesMax -1){
        return
    }
    ////////////
    switch(sprite){
        case 'idle_right':
            if(this.image !== this.sprites.idle_right.image){
                this.image = this.sprites.idle_right.image
                this.framesMax = this.sprites.idle_right.framesMax// need to set frames back to what is needed after a switch
                this.framesCurrent = 0
            }
            break
         case 'idle_left':
            if(this.image !== this.sprites.idle_left.image){
                this.image = this.sprites.idle_left.image
                this.framesMax = this.sprites.idle_left.framesMax
                this.framesCurrent = 0
        }
            break
        case 'run_left':
            if(this.image !== this.sprites.run_left.image){
                this.image = this.sprites.run_left.image
                this.framesMax = this.sprites.run_left.framesMax
                this.framesCurrent = 0
        }
            break
        case 'run_right':
            if(this.image !== this.sprites.run_right.image){
                this.image = this.sprites.run_right.image
                this.framesMax = this.sprites.run_right.framesMax
                this.framesCurrent = 0
        }
            break
        case 'jump_left':
            if(this.image !== this.sprites.jump_left.image){
                this.image = this.sprites.jump_left.image
                this.framesMax = this.sprites.jump_left.framesMax// needs to adjust the max frames, this sets it to 2 frames
                this.framesCurrent = 0
            }
            break
        case 'jump_right':
            if(this.image !== this.sprites.jump_right.image){
                this.image = this.sprites.jump_right.image
                this.framesMax = this.sprites.jump_right.framesMax// needs to adjust the max frames, this sets it to 2 frames
                this.framesCurrent = 0
            }
            break
        case 'fall_left':
            if(this.image !== this.sprites.fall_left.image){
                this.image = this.sprites.fall_left.image
                this.framesMax = this.sprites.fall_left.framesMax
                this.framesCurrent = 0
            }
            break
        case 'fall_right':
            if(this.image !== this.sprites.fall_right.image){
                this.image = this.sprites.fall_right.image
                this.framesMax = this.sprites.fall_right.framesMax
                this.framesCurrent = 0
            }
            break
        case 'attack1_right':
            if(this.image !== this.sprites.attack1_right.image){
                this.image = this.sprites.attack1_right.image
                this.framesMax = this.sprites.attack1_right.framesMax
                this.framesCurrent = 0
            }
            break
        case 'attack1_left':
                if(this.image !== this.sprites.attack1_left.image){
                    this.image = this.sprites.attack1_left.image
                    this.framesMax = this.sprites.attack1_left.framesMax
                    this.framesCurrent = 0
                }
                break
        case 'air_attack_right':
                    if(this.image !== this.sprites.air_attack_right.image){
                    this.image = this.sprites.air_attack_right.image
                    this.framesMax = this.sprites.air_attack_right.framesMax
                    this.framesCurrent = 0
                }
                break
        case 'air_attack_left':
                    if(this.image !== this.sprites.air_attack_left.image){
                    this.image = this.sprites.air_attack_left.image
                    this.framesMax = this.sprites.air_attack_left.framesMax
                    this.framesCurrent = 0
                }
                break
        case 'takeHit_left':
            if(this.image !== this.sprites.takeHit_left.image){
                this.image = this.sprites.takeHit_left.image
                this.framesMax = this.sprites.takeHit_left.framesMax
                this.framesCurrent = 0
            }
            break
        case 'takeHit_right':
            if(this.image !== this.sprites.takeHit_right.image){
                this.image = this.sprites.takeHit_right.image
                this.framesMax = this.sprites.takeHit_right.framesMax
                this.framesCurrent = 0
            }
            break
        case 'death':
            if(this.image !== this.sprites.death.image){
                this.image = this.sprites.death.image
                this.framesMax = this.sprites.death.framesMax
                this.framesCurrent = 0
            }
            break
    }

}
}//player uses the class Sprite with an object as a parameter