function random_int(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function default_snake() {
    return {
        body: [[20, 15]],
        dir: "right",
        length: 3,
        food: [random_int(40), random_int(30)],
    };
}

var snake = default_snake();
var canvas = null;
var ctx = null;
var interval = null;


function advance_head() {
    var head = snake.body.length - 1;
    var head_pos = [...snake.body[head]];

    if (snake.dir == "up") {
        head_pos[1] = (head_pos[1] + 29) % 30;
    }
    else if (snake.dir == "down") {
        head_pos[1] = (head_pos[1] + 1) % 30;
    }
    else if (snake.dir == "left") {
        head_pos[0] = (head_pos[0] + 39) % 40;
    }
    else if (snake.dir == "right") {
        head_pos[0] = (head_pos[0] + 1) % 40;
    }
    return head_pos;
}


function bit_itself(head_pos) {
    var head_on_body = function(element, index, array) {
        return (element[0] == head_pos[0] && element[1] == head_pos[1]);
    };
    return snake.body.some(head_on_body);
}


function drop_new_food() {
    snake.food[0] = random_int(40);
    snake.food[1] = random_int(30);
    ctx.fillStyle = "#0C0";
    ctx.fillRect(snake.food[0] * 20, snake.food[1] * 20, 20, 20);
}


function game_over() {
    clearInterval(interval);
    snake = default_snake();
    alert("Game Over.");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function advance_game() {
    head_pos = advance_head();

    if (bit_itself(head_pos)) {
        game_over();
    }

    snake.body.push(head_pos);
    if (head_pos[0] == snake.food[0] && head_pos[1] == snake.food[1]) {
        snake.length += 1;
        drop_new_food();
    }
    
    ctx.fillStyle = "#C00";
    ctx.fillRect(head_pos[0] * 20, head_pos[1] * 20, 20, 20);

    if (snake.body.length > snake.length) {
        var tail = snake.body.shift();
        ctx.clearRect(tail[0] * 20, tail[1] * 20, 20, 20);
    }
}


window.onload = function() {
    canvas = document.getElementById('snake-area');
    if (canvas.getContext){
        ctx = canvas.getContext('2d');
        drop_new_food();
        interval = setInterval(advance_game, 100);
    }
    else {
        alert("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
    }
}


document.onkeydown = function(event) {
    switch(event.keyCode) {
        case 37: if (snake.dir != "right") { snake.dir = "left"; } break;
        case 38: if (snake.dir != "down") { snake.dir = "up"; } break;
        case 39: if (snake.dir != "left") { snake.dir = "right"; } break;
        case 40: if (snake.dir != "up") { snake.dir = "down"; } break;
        default: break;
    }
}