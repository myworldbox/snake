    window.onload = function () {
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        document.addEventListener("keydown", keyPush);
        setInterval(game, 50); //refreshing speed
    }

canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

tc = 50; //tc: total number of grids
gs = canvas.height / tc; //gs: size of each grid of snake        

px = py = Math.floor(Math.random() * tc); //snake head position
ax = ay = Math.floor(Math.random() * tc); //coin position
xv = yv = 0; //snake velocity
trail = [];
tail = 5; //snake length
grid = 2;

//keep snake moving
function game() {
    px += xv;
    py += yv;

    //change snake x and y position when touching edges
    if (px < 0) {
        px = tc - 1; //move snake to right side
    }
    if (px > tc - 1) {
        px = 0; //move snake to left side
    }
    if (py < 0) {
        py = tc - 1; //move snake to down side
    }
    if (py > tc - 1) {
        py = 0; //move snake to top side
    }

    //draw the stage
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //draw the snake
    ctx.fillStyle = "yellow";

    //draw until it equals the snake length
    for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - grid, gs - grid);

        //tail turn back to 5 when eating itself
        if (trail[i].x == px && trail[i].y == py) {
            tail = 5;
        }
    }

    //keep checking the position of snake
    trail.push({ x: px, y: py });
    while (trail.length > tail) {

        //shift cell when moving
        trail.shift();
    }

    //for increasing trail length
    if (ax == px && ay == py) {
        tail++;
        ax = Math.floor(Math.random() * tc); //* tc makes it returns values from 0 to tc - 1
        ay = Math.floor(Math.random() * tc);
    }

    //draw coin details
    ctx.fillStyle = "white";
    ctx.fillRect(ax * gs, ay * gs, gs - grid, gs - grid); //minus 2 is to draw the grid feeling
}

function keyLeft() {
    xv = -1; yv = 0;
}

function keyUp() {
    xv = 0; yv = -1;
}

function keyRight() {
    xv = 1; yv = 0;
}

function keyDown() {
    xv = 0; yv = 1;
}

//for keyboard control
function keyPush(event) {
    switch (event.keyCode) {
        case 37: //left key
            keyLeft();
            break;
        case 38: //up key
            keyUp();
            break;
        case 39: //right key
            keyRight();
            break;
        case 40: //down key
            keyDown();
            break;
    }
}