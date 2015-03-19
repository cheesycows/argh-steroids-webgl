/* Start up everything, run the main loop.
 */

'use strict';

var shaderPrograms = [];
var currentProgram;

function setShaderProgram(program) {
    currentProgram = program;
    gl.useProgram(currentProgram);
}

function initShaders() {
    shaderPrograms[0] = getProgram("shader-fs-particle", "shader-vs-particle");

    shaderPrograms[0].vertexVelocityAttribute = 
        gl.getAttribLocation(shaderPrograms[0], "aVertexVelocity");

    shaderPrograms[0].vertexBirthticksAttribute = 
        gl.getAttribLocation(shaderPrograms[0], "aVertexBirthticks");

    shaderPrograms[0].vertexLifespanAttribute = 
        gl.getAttribLocation(shaderPrograms[0], "aVertexLifespan");

    shaderPrograms[0].vertexColourstartAttribute = 
        gl.getAttribLocation(shaderPrograms[0], "aVertexColourstart");

    shaderPrograms[0].vertexColourscaleAttribute = 
        gl.getAttribLocation(shaderPrograms[0], "aVertexColourscale");

    shaderPrograms[0].vertexSizeAttribute = 
        gl.getAttribLocation(shaderPrograms[0], "aVertexSize");

    shaderPrograms[0].vertexDampAttribute = 
        gl.getAttribLocation(shaderPrograms[0], "aVertexDamp");

    shaderPrograms[0].ticksUniform = 
        gl.getUniformLocation(shaderPrograms[0], "uTicks");
    shaderPrograms[0].rampUniform = 
        gl.getUniformLocation(shaderPrograms[0], "uRamp");
    shaderPrograms[0].textureUniform = 
        gl.getUniformLocation(shaderPrograms[0], "uTexture");

    shaderPrograms[1] = getProgram("shader-fs-vector", "shader-vs-vector");
}

var mvMatrix = mat4.create();
var mvMatrixStack = [];

function mvPushMatrix() {
    var copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
}

function mvPopMatrix() {
    if (mvMatrixStack.length == 0) {
        throw "Invalid popMatrix!";
    }
    mvMatrix = mvMatrixStack.pop();
}

var pMatrix = mat4.create();

function setMatrixUniforms() {
    gl.uniformMatrix4fv(currentProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(currentProgram.mvMatrixUniform, false, mvMatrix);
}

var world;

function epilogue_tick() {
    world.draw();
    world.draw_hud(); 
    if (Key.isDown(Key.I)) { 
        world.draw_info();
    }

    text_draw_immediate("PRESS ENTER TO PLAY AGAIN", 
                        world.width / 2, world.height / 2,
                        20, 0,
                        true);

    world.update();

    if (Key.isDown(Key.ENTER)) {
        gamestart();
    }
    else {
        requestAnimFrame(epilogue_tick);
    }
}

function epilogue() {
    epilogue_tick();
}

var gameover_timer = 0;
var gameover_frames = 100;

function gameover_tick() {
    world.draw();
    world.draw_hud(); 
    if (Key.isDown(Key.I)) { 
        world.draw_info();
    }

    var t = gameover_timer / gameover_frames;
    text_draw_immediate("GAME OVER", 
                        world.width / 2, world.height / 2,
                        Math.log(t + 0.001) * 150, 180,
                        true);

    world.update();

    gameover_timer -= world.dt;
    if (gameover_timer < 0) {
        epilogue();
    }
    else {
        requestAnimFrame(gameover_tick);
    }
}

function gameover() {
    gameover_timer = gameover_frames;
    gameover_tick();
}

var terminate_ok = true;

function levelplay_tick() {
    world.draw();
    world.draw_hud(); 
    if (Key.isDown(Key.I)) { 
        world.draw_info();
    }

    // need to debounce N key
    if (terminate_ok && 
        Key.isDown(Key.N)) {
        world.terminate_asteroids();
        terminate_ok = false;
    }
    if (!terminate_ok && 
        !Key.isDown(Key.N)) {
        terminate_ok = true;
    }

    world.update();

    if (!world.player) {
        gameover();
    }
    else if (world.n_asteroids == 0) {
        world.level += 1;
        levelstart();
    }
    else {
        requestAnimFrame(levelplay_tick);
    }
}

function levelplay() {
    for (var i = 0; i < world.level * 2; i += 1) 
        new Asteroid(world, randint(75, 100), 0.5 + world.level / 4.0);

    levelplay_tick();
}

var levelstart_timer = 0;
var levelstart_frames = 100;

function levelstart_tick() {
    world.draw();
    world.draw_hud(); 
    if (Key.isDown(Key.I)) { 
        world.draw_info();
    }
    if (Key.isDown(Key.S)) { 
        new Asteroid(world, randint(75, 100), 0.5 + world.level / 4.0);
    }

    var t = levelstart_timer / levelstart_frames;
    text_draw_immediate("LEVEL START", 
                        world.width / 2, world.height / 2,
                        t * 150, t * 200.0, true); 

    world.update();

    levelstart_timer -= world.dt;
    if (levelstart_timer < 0) {
        levelplay();
    }
    else {
        requestAnimFrame(levelstart_tick);
    }
}

function levelstart() {
    levelstart_timer = levelstart_frames;
    levelstart_tick();
}

function gamestart() {
    world.reset();
    world.particles.starfield();
    world.add_player();
    levelstart();
}

function startscreen_tick() {
    world.draw();
    if (Key.isDown(Key.I)) { 
        world.draw_info();
    }

    world.update();

    if (Key.isDown(Key.ENTER)) {
        world.resize_handler = null;
        gamestart();
    }
    else {
        requestAnimFrame(startscreen_tick);
    }
}

function startscreen() {
    world.reset();
    world.particles.starfield();

    for (var i = 0; i < 2; i += 1) 
        new Asteroid(world, randint(50, 100), 2);

    world.add_text('ARGH ITS THE ASTEROIDS', 20)
    world.add_text('PRESS LEFT AND RIGHT TO ROTATE') 
    world.add_text('PRESS UP FOR THRUST')
    world.add_text('PRESS SPACE FOR FIRE')
    world.add_text('OR DOUBLE-CLICK FOR MOUSE CONTROLS') 
    world.add_text('WATCH OUT FOR ALLEN THE ALIEN')
    world.add_text('PRESS ENTER TO START', 20)

    // on a resize, re-run this function
    world.resize_handler = startscreen;
}

function arghsteroids() {
    var canvas = document.getElementById("argh-steroids-canvas");

    Mouse.attach(canvas);

    initGL(canvas);
    initShaders()
    asteroidsCreate();
    alienCreate();
    bulletCreate();
    shipCreate();
    textCreate();
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    world = new World(canvas);

    startscreen();
    startscreen_tick();
}
