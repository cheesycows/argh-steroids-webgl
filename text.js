/* Text rendering.
 */

'use strict';

// character designs from https://github.com/rickwight/meteors, thank you rick
//
// oh god why
var text_points = {
   '0':  [[-0.5, 0.25], [-0.25, 0.5], [-0.25, 0.5], [0.25, 0.5], [0.25, 0.5], [0.5, 0.25], [0.5, 0.25], [0.5, -0.25], [0.5, -0.25], [0.25, -0.5], [0.25, -0.5], [-0.25, -0.5], [-0.25, -0.5], [-0.5, -0.25], [-0.5, -0.25], [-0.5, 0.25], [-0.25, 0.5], [0.25, -0.5]], 
   '1':  [[0.5, 0.25], [-0.0, 0.5], [-0.0, 0.5], [-0.0, -0.5], [0.5, -0.5], [-0.5, -0.5]], 
   '2':  [[-0.5, -0.5], [0.5, -0.5], [0.5, -0.5], [-0.25, 0.0], [-0.25, 0.0], [-0.5, 0.25], [-0.5, 0.25], [-0.25, 0.5], [-0.25, 0.5], [0.25, 0.5], [0.25, 0.5], [0.5, 0.25]], 
   '3':  [[0.5, 0.25], [0.25, 0.5], [0.25, 0.5], [-0.25, 0.5], [-0.25, 0.5], [-0.5, 0.25], [-0.5, 0.25], [-0.25, 0.0], [-0.25, 0.0], [-0.5, -0.25], [-0.5, -0.25], [-0.25, -0.5], [-0.25, -0.5], [0.25, -0.5], [0.25, -0.5], [0.5, -0.25], [0.25, 0.0], [-0.25, 0.0]], 
   '4':  [[-0.25, -0.5], [-0.25, 0.5], [-0.25, 0.5], [0.5, -0.25], [0.5, -0.25], [-0.5, -0.25]], 
   '5':  [[-0.5, 0.5], [0.5, 0.5], [0.5, 0.5], [0.5, 0.0], [0.5, 0.0], [-0.25, 0.0], [-0.25, 0.0], [-0.5, -0.25], [-0.5, -0.25], [-0.25, -0.5], [-0.25, -0.5], [0.5, -0.5]], 
   '6':  [[-0.5, 0.25], [-0.25, 0.5], [-0.25, 0.5], [0.25, 0.5], [0.25, 0.5], [0.5, 0.25], [0.5, 0.25], [0.5, -0.25], [0.5, -0.25], [0.25, -0.5], [0.25, -0.5], [-0.25, -0.5], [-0.25, -0.5], [-0.5, -0.25], [-0.5, -0.25], [-0.25, 0.0], [-0.25, 0.0], [0.5, 0.0]], 
   '7':  [[0.5, 0.5], [-0.5, 0.5], [-0.5, 0.5], [0.25, -0.5]], 
   '8':  [[0.5, 0.25], [0.25, 0.5], [0.25, 0.5], [-0.25, 0.5], [-0.25, 0.5], [-0.5, 0.25], [-0.5, 0.25], [-0.25, 0.0], [-0.25, 0.0], [-0.5, -0.25], [-0.5, -0.25], [-0.25, -0.5], [-0.25, -0.5], [0.25, -0.5], [0.25, -0.5], [0.5, -0.25], [0.5, -0.25], [0.25, 0.0], [0.25, 0.0], [0.5, 0.25], [0.25, 0.0], [-0.25, 0.0]], 
   '9':  [[0.5, -0.25], [0.25, -0.5], [0.25, -0.5], [-0.25, -0.5], [-0.25, -0.5], [-0.5, -0.25], [-0.5, -0.25], [-0.5, 0.25], [-0.5, 0.25], [-0.25, 0.5], [-0.25, 0.5], [0.25, 0.5], [0.25, 0.5], [0.5, 0.25], [0.5, 0.25], [0.25, 0.0], [0.25, 0.0], [-0.5, 0.0]], 
   'A':  [[0.5, -0.5], [-0.0, 0.5], [-0.0, 0.5], [-0.5, -0.5], [0.25, 0.0], [-0.25, 0.0]], 
   'B':  [[0.5, -0.5], [0.5, 0.5], [0.5, 0.5], [-0.25, 0.5], [-0.25, 0.5], [-0.5, 0.25], [-0.5, 0.25], [-0.25, 0.0], [-0.25, 0.0], [-0.5, -0.25], [-0.5, -0.25], [-0.25, -0.5], [-0.25, -0.5], [0.5, -0.5], [0.5, 0.0], [-0.25, 0.0]], 
   'C':  [[-0.5, -0.25], [-0.25, -0.5], [-0.25, -0.5], [0.25, -0.5], [0.25, -0.5], [0.5, -0.25], [0.5, -0.25], [0.5, 0.25], [0.5, 0.25], [0.25, 0.5], [0.25, 0.5], [-0.25, 0.5], [-0.25, 0.5], [-0.5, 0.25]], 
   'D':  [[0.5, -0.5], [0.5, 0.5], [0.5, 0.5], [-0.25, 0.5], [-0.25, 0.5], [-0.5, 0.25], [-0.5, 0.25], [-0.5, -0.25], [-0.5, -0.25], [-0.25, -0.5], [-0.25, -0.5], [0.5, -0.5]], 
   'E':  [[0.5, 0.5], [-0.5, 0.5], [0.5, 0.0], [-0.25, 0.0], [0.5, -0.5], [-0.5, -0.5], [0.5, -0.5], [0.5, 0.5]], 
   'F':  [[0.5, -0.5], [0.5, 0.5], [0.5, 0.5], [-0.5, 0.5], [0.5, 0.0], [-0.25, 0.0]], 
   'G':  [[-0.5, 0.25], [-0.25, 0.5], [-0.25, 0.5], [0.25, 0.5], [0.25, 0.5], [0.5, 0.25], [0.5, 0.25], [0.5, -0.25], [0.5, -0.25], [0.25, -0.5], [0.25, -0.5], [-0.25, -0.5], [-0.25, -0.5], [-0.5, -0.25], [-0.5, -0.25], [-0.5, 0.0], [-0.5, 0.0], [-0.0, 0.0]], 
   'H':  [[0.5, -0.5], [0.5, 0.5], [-0.5, -0.5], [-0.5, 0.5], [0.5, 0.0], [-0.5, 0.0]], 
   'I':  [[0.25, 0.5], [-0.25, 0.5], [0.25, -0.5], [-0.25, -0.5], [-0.0, -0.5], [-0.0, 0.5]], 
   'J':  [[0.5, -0.5], [-0.0, -0.5], [-0.0, -0.5], [-0.0, 0.5], [0.5, 0.5], [-0.5, 0.5]], 
   'K':  [[0.5, -0.5], [0.5, 0.5], [0.5, 0.0], [-0.5, 0.5], [0.5, 0.0], [-0.5, -0.5]], 
   'L':  [[0.5, -0.5], [0.5, 0.5], [0.5, -0.5], [-0.5, -0.5]], 
   'M':  [[0.5, -0.5], [0.5, 0.5], [0.5, 0.5], [-0.0, 0.0], [-0.0, 0.0], [-0.5, 0.5], [-0.5, 0.5], [-0.5, -0.5]], 
   'N':  [[0.5, -0.5], [0.5, 0.5], [0.5, 0.5], [-0.5, -0.5], [-0.5, -0.5], [-0.5, 0.5]], 
   'O':  [[-0.5, 0.25], [-0.25, 0.5], [-0.25, 0.5], [0.25, 0.5], [0.25, 0.5], [0.5, 0.25], [0.5, 0.25], [0.5, -0.25], [0.5, -0.25], [0.25, -0.5], [0.25, -0.5], [-0.25, -0.5], [-0.25, -0.5], [-0.5, -0.25], [-0.5, -0.25], [-0.5, 0.25]], 
   'P':  [[0.5, -0.5], [0.5, 0.5], [0.5, 0.5], [-0.25, 0.5], [-0.25, 0.5], [-0.5, 0.25], [-0.5, 0.25], [-0.25, 0.0], [-0.25, 0.0], [0.5, 0.0]], 
   'Q':  [[-0.5, 0.25], [-0.25, 0.5], [-0.25, 0.5], [0.25, 0.5], [0.25, 0.5], [0.5, 0.25], [0.5, 0.25], [0.5, -0.25], [0.5, -0.25], [0.25, -0.5], [0.25, -0.5], [-0.25, -0.5], [-0.25, -0.5], [-0.5, -0.25], [-0.5, -0.25], [-0.5, 0.25], [-0.25, -0.25], [-0.5, -0.5]], 
   'R':  [[0.5, -0.5], [0.5, 0.5], [0.5, 0.5], [-0.25, 0.5], [-0.25, 0.5], [-0.5, 0.25], [-0.5, 0.25], [-0.25, 0.0], [-0.25, 0.0], [0.5, 0.0], [-0.25, 0.0], [-0.5, -0.5]], 
   'S':  [[0.5, -0.25], [0.25, -0.5], [0.25, -0.5], [-0.25, -0.5], [-0.25, -0.5], [-0.5, -0.25], [-0.5, -0.25], [-0.25, 0.0], [-0.25, 0.0], [0.25, 0.0], [0.25, 0.0], [0.5, 0.25], [0.5, 0.25], [0.25, 0.5], [0.25, 0.5], [-0.25, 0.5], [-0.25, 0.5], [-0.5, 0.25]], 
   'T':  [[0.5, 0.5], [-0.5, 0.5], [-0.0, 0.5], [-0.0, -0.5]], 
   'U':  [[0.5, 0.5], [0.5, -0.25], [0.5, -0.25], [0.25, -0.5], [0.25, -0.5], [-0.25, -0.5], [-0.25, -0.5], [-0.5, -0.25], [-0.5, -0.25], [-0.5, 0.5]], 
   'V':  [[0.5, 0.5], [-0.0, -0.5], [-0.0, -0.5], [-0.5, 0.5]], 
   'W':  [[0.5, 0.5], [0.5, -0.5], [0.5, -0.5], [-0.0, 0.0], [-0.0, 0.0], [-0.5, -0.5], [-0.5, -0.5], [-0.5, 0.5]], 
   'X':  [[0.5, -0.5], [-0.5, 0.5], [-0.5, -0.5], [0.5, 0.5]], 
   'Y':  [[0.5, 0.5], [-0.0, 0.0], [-0.0, 0.0], [-0.5, 0.5], [-0.0, 0.0], [-0.0, -0.5]], 
   'Z':  [[0.5, 0.5], [-0.5, 0.5], [-0.5, 0.5], [0.5, -0.5], [0.5, -0.5], [-0.5, -0.5]]
};

var textBuffers = [];

function textCreate() {
    for (var ch in text_points) {
        var points = text_points[ch];

        for (var i = 0; i < points.length; i++) {
            points[i][0] *= -1;
        }

        textBuffers[ch] = buffersCreateDiscontinuous(text_points[ch]);
    }
}

var Character = function(world, ch, x, y, scale) {
    Sprite.call(this, world);

    this.buffers = textBuffers[ch];
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.scale = scale;
    this.ch = ch;
    this.angular_velocity = 0;
}

Character.prototype = Object.create(Sprite.prototype); 
Character.prototype.constructor = Character;

Character.prototype.impact = function(other) {
    this.angular_velocity = Math.random() * 2 - 1;

    Sprite.prototype.impact.call(this, other);
}

Character.prototype.update = function() {
    this.angle += this.angular_velocity;

    Sprite.prototype.update.call(this);
}

function text_draw_at(buffers, x, y, scale, angle) {
    mvPushMatrix();

    mat4.translate(mvMatrix, [x, y, 0]);
    mat4.scale(mvMatrix, [scale, scale, 1]);
    mat4.rotate(mvMatrix, rad(angle), [0, 0, 1]);

    gl.enableVertexAttribArray(currentProgram.vertexPositionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers[0]);
    gl.vertexAttribPointer(currentProgram.vertexPositionAttribute, 
            buffers[0].itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers[1]);
    setMatrixUniforms();
    gl.drawElements(gl.LINES, 
            buffers[1].numItems, gl.UNSIGNED_SHORT, 0);

    mvPopMatrix();
}

Character.prototype.draw_at = function(x, y) {
    text_draw_at(this.buffers, this.x, this.y, this.scale, this.angle);
}

function text_add(world, string, x, y, scale) {
    var kern = 2;
    x = x - string.length * scale * kern / 2.0;
    for (var i = 0; i < string.length; i++) {
        var ch = string.charAt(i);
        if (textBuffers[ch]) {
            new Character(world, ch, x, y, scale);
        }
        x += scale * kern;
    }
}

function text_draw_immediate(string, x, y, scale, angle, centre) {
    var kern = 1.5;
    var a = scale * Math.cos(rad(angle));
    var b = scale * -Math.sin(rad(angle));
    var c = -b;
    var d = a;

    if (centre) {
        x -= a * kern * string.length / 2.0;
        y -= c * kern * string.length / 2.0;
    }

    for (var i = 0; i < string.length; i++) {
        var ch = string.charAt(i);
        if (textBuffers[ch]) {
            text_draw_at(textBuffers[ch], x, y, scale, angle);
        }
        x += a * kern;
        y += c * kern;
    }
}

