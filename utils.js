function recCollision({rectangle1, rectangle2}){// two inputs
    return(
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && // if the right side of the attackbox collides with enemy
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&// left side of attack box
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && //botton of attack box
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height) // if top side of attackBox hits bottom side of enemy
}
//AIR ATTACK COLLISION
function airRecCollision({rectangle1, rectangle2}){// two inputs
    return(
        rectangle1.attackBox_air.position.x + rectangle1.attackBox_air.width >= rectangle2.position.x && // if the right side of the attackbox collides with enemy
        rectangle1.attackBox_air.position.x <= rectangle2.position.x + rectangle2.width &&// left side of attack box
        rectangle1.attackBox_air.position.y + rectangle1.attackBox_air.height >= rectangle2.position.y && //botton of attack box
        rectangle1.attackBox_air.position.y <= rectangle2.position.y + rectangle2.height) // if top side of attackBox_air hits bottom side of enemy
}
function determineWinner({player, enemy, timerId}){
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display ='flex'
    if(player.health === enemy.health){
        document.querySelector('#displayText').innerHTML = 'Tie'
    }
    else if(player.health > enemy.health){
        document.querySelector('#displayText').innerHTML = 'Player One Wins!'
    }
    else if(player.health < enemy.health){
        document.querySelector('#displayText').innerHTML = 'Player Two Wins!'
    }

}
let timer = 60
let timerId
function decreaseTimer(){
    if(timer > 0){
        timerId = setTimeout(decreaseTimer, 1000)// 1000 milliseconds
        timer--
        document.querySelector('#timer').innerHTML = timer// innerHTML property in JavaScript is used to get or set the HTML content of an element.
    }
    if(timer === 0){
        determineWinner({player,enemy,timerId})
    }
}