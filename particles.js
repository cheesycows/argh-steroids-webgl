/* Simple particle system.
 */

'use strict';

// stolen from a PET scanner
var colour_table = [
    [ 15, 0, 30 ],
    [ 19, 0, 40 ],
    [ 23, 0, 48 ],
    [ 28, 0, 57 ],
    [ 36, 0, 74 ],
    [ 42, 0, 84 ],
    [ 46, 0, 93 ],
    [ 51, 0, 102 ],
    [ 59, 0, 118 ],
    [ 65, 0, 130 ],
    [ 69, 0, 138 ],
    [ 72, 0, 146 ],
    [ 81, 0, 163 ],
    [ 47, 0, 95 ],
    [ 12, 0, 28 ],
    [ 64, 0, 144 ],
    [ 61, 0, 146 ],
    [ 55, 0, 140 ],
    [ 52, 0, 137 ],
    [ 47, 0, 132 ],
    [ 43, 0, 128 ],
    [ 38, 0, 123 ],
    [ 30, 0, 115 ],
    [ 26, 0, 111 ],
    [ 23, 0, 108 ],
    [ 17, 0, 102 ],
    [ 9, 0, 94 ],
    [ 6, 0, 91 ],
    [ 2, 0, 87 ],
    [ 0, 0, 88 ],
    [ 0, 0, 100 ],
    [ 0, 0, 104 ],
    [ 0, 0, 108 ],
    [ 0, 0, 113 ],
    [ 0, 0, 121 ],
    [ 0, 0, 125 ],
    [ 0, 0, 129 ],
    [ 0, 0, 133 ],
    [ 0, 0, 141 ],
    [ 0, 0, 146 ],
    [ 0, 0, 150 ],
    [ 0, 0, 155 ],
    [ 0, 0, 162 ],
    [ 0, 0, 167 ],
    [ 0, 0, 173 ],
    [ 0, 0, 180 ],
    [ 0, 0, 188 ],
    [ 0, 0, 193 ],
    [ 0, 0, 197 ],
    [ 0, 0, 201 ],
    [ 0, 0, 209 ],
    [ 0, 0, 214 ],
    [ 0, 0, 218 ],
    [ 0, 0, 222 ],
    [ 0, 0, 230 ],
    [ 0, 0, 235 ],
    [ 0, 0, 239 ],
    [ 0, 0, 243 ],
    [ 0, 0, 247 ],
    [ 0, 4, 251 ],
    [ 0, 10, 255 ],
    [ 0, 14, 255 ],
    [ 0, 18, 255 ],
    [ 0, 24, 255 ],
    [ 0, 31, 255 ],
    [ 0, 36, 255 ],
    [ 0, 39, 255 ],
    [ 0, 45, 255 ],
    [ 0, 53, 255 ],
    [ 0, 56, 255 ],
    [ 0, 60, 255 ],
    [ 0, 66, 255 ],
    [ 0, 74, 255 ],
    [ 0, 77, 255 ],
    [ 0, 81, 255 ],
    [ 0, 88, 251 ],
    [ 0, 99, 239 ],
    [ 0, 104, 234 ],
    [ 0, 108, 230 ],
    [ 0, 113, 225 ],
    [ 0, 120, 218 ],
    [ 0, 125, 213 ],
    [ 0, 128, 210 ],
    [ 0, 133, 205 ],
    [ 0, 141, 197 ],
    [ 0, 145, 193 ],
    [ 0, 150, 188 ],
    [ 0, 154, 184 ],
    [ 0, 162, 176 ],
    [ 0, 167, 172 ],
    [ 0, 172, 170 ],
    [ 0, 180, 170 ],
    [ 0, 188, 170 ],
    [ 0, 193, 170 ],
    [ 0, 197, 170 ],
    [ 0, 201, 170 ],
    [ 0, 205, 170 ],
    [ 0, 211, 170 ],
    [ 0, 218, 170 ],
    [ 0, 222, 170 ],
    [ 0, 226, 170 ],
    [ 0, 232, 170 ],
    [ 0, 239, 170 ],
    [ 0, 243, 170 ],
    [ 0, 247, 170 ],
    [ 0, 251, 161 ],
    [ 0, 255, 147 ],
    [ 0, 255, 139 ],
    [ 0, 255, 131 ],
    [ 0, 255, 120 ],
    [ 0, 255, 105 ],
    [ 0, 255, 97 ],
    [ 0, 255, 89 ],
    [ 0, 255, 78 ],
    [ 0, 255, 63 ],
    [ 0, 255, 55 ],
    [ 0, 255, 47 ],
    [ 0, 255, 37 ],
    [ 0, 255, 21 ],
    [ 0, 255, 13 ],
    [ 0, 255, 5 ],
    [ 2, 255, 2 ],
    [ 13, 255, 13 ],
    [ 18, 255, 18 ],
    [ 23, 255, 23 ],
    [ 27, 255, 27 ],
    [ 35, 255, 35 ],
    [ 40, 255, 40 ],
    [ 43, 255, 43 ],
    [ 48, 255, 48 ],
    [ 55, 255, 55 ],
    [ 60, 255, 60 ],
    [ 64, 255, 64 ],
    [ 69, 255, 69 ],
    [ 72, 255, 72 ],
    [ 79, 255, 79 ],
    [ 90, 255, 82 ],
    [ 106, 255, 74 ],
    [ 113, 255, 70 ],
    [ 126, 255, 63 ],
    [ 140, 255, 56 ],
    [ 147, 255, 53 ],
    [ 155, 255, 48 ],
    [ 168, 255, 42 ],
    [ 181, 255, 36 ],
    [ 189, 255, 31 ],
    [ 197, 255, 27 ],
    [ 209, 255, 21 ],
    [ 224, 255, 14 ],
    [ 231, 255, 10 ],
    [ 239, 255, 7 ],
    [ 247, 251, 3 ],
    [ 255, 243, 0 ],
    [ 255, 239, 0 ],
    [ 255, 235, 0 ],
    [ 255, 230, 0 ],
    [ 255, 222, 0 ],
    [ 255, 218, 0 ],
    [ 255, 214, 0 ],
    [ 255, 209, 0 ],
    [ 255, 201, 0 ],
    [ 255, 197, 0 ],
    [ 255, 193, 0 ],
    [ 255, 188, 0 ],
    [ 255, 180, 0 ],
    [ 255, 176, 0 ],
    [ 255, 172, 0 ],
    [ 255, 167, 0 ],
    [ 255, 156, 0 ],
    [ 255, 150, 0 ],
    [ 255, 146, 0 ],
    [ 255, 142, 0 ],
    [ 255, 138, 0 ],
    [ 255, 131, 0 ],
    [ 255, 125, 0 ],
    [ 255, 121, 0 ],
    [ 255, 117, 0 ],
    [ 255, 110, 0 ],
    [ 255, 104, 0 ],
    [ 255, 100, 0 ],
    [ 255, 96, 0 ],
    [ 255, 90, 0 ],
    [ 255, 83, 0 ],
    [ 255, 78, 0 ],
    [ 255, 75, 0 ],
    [ 255, 71, 0 ],
    [ 255, 67, 0 ],
    [ 255, 65, 0 ],
    [ 255, 63, 0 ],
    [ 255, 59, 0 ],
    [ 255, 54, 0 ],
    [ 255, 52, 0 ],
    [ 255, 50, 0 ],
    [ 255, 46, 0 ],
    [ 255, 41, 0 ],
    [ 255, 39, 0 ],
    [ 255, 36, 0 ],
    [ 255, 32, 0 ],
    [ 255, 25, 0 ],
    [ 255, 22, 0 ],
    [ 255, 20, 0 ],
    [ 255, 17, 0 ],
    [ 255, 13, 0 ],
    [ 255, 10, 0 ],
    [ 255, 7, 0 ],
    [ 255, 4, 0 ],
    [ 255, 0, 0 ],
    [ 252, 0, 0 ],
    [ 251, 0, 0 ],
    [ 249, 0, 0 ],
    [ 248, 0, 0 ],
    [ 244, 0, 0 ],
    [ 242, 0, 0 ],
    [ 240, 0, 0 ],
    [ 237, 0, 0 ],
    [ 234, 0, 0 ],
    [ 231, 0, 0 ],
    [ 229, 0, 0 ],
    [ 228, 0, 0 ],
    [ 225, 0, 0 ],
    [ 222, 0, 0 ],
    [ 221, 0, 0 ],
    [ 219, 0, 0 ],
    [ 216, 0, 0 ],
    [ 213, 0, 0 ],
    [ 212, 0, 0 ],
    [ 210, 0, 0 ],
    [ 207, 0, 0 ],
    [ 204, 0, 0 ],
    [ 201, 0, 0 ],
    [ 199, 0, 0 ],
    [ 196, 0, 0 ],
    [ 193, 0, 0 ],
    [ 192, 0, 0 ],
    [ 190, 0, 0 ],
    [ 188, 0, 0 ],
    [ 184, 0, 0 ],
    [ 183, 0, 0 ],
    [ 181, 0, 0 ],
    [ 179, 0, 0 ],
    [ 175, 0, 0 ]
];

var Particles = function(world) {
    this.world = world;

    this.n_particles = 1000;

    // counts down to zero, zero means dead
    this.life = new Array(this.n_particles);
    this.position = new Float32Array(3 * this.n_particles);
    this.velocity = new Array(2 * this.n_particles);
    this.colour = new Float32Array(4 * this.n_particles);
    this.index = new Array(this.n_particles);
    this.delta = new Array(this.n_particles);
    this.free = new Array(this.n_particles);

    this.reset();

    this.position_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.position_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.position, gl.DYNAMIC_DRAW);
    this.position_buffer.itemSize = 3;

    this.colour_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.colour_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.colour, gl.DYNAMIC_DRAW);
    this.colour_buffer.itemSize = 4;
};

Particles.prototype.constructor = Particles;

Particles.prototype.reset = function() {
    for (var i = 0; i < this.n_particles; i++) {
        this.free[i] = i;
        this.life[i] = 0;
        this.position[i * 3] = -100.0;
        this.position[i * 3 + 1] = 0.0;
        this.position[i * 3 + 1] = -10.0;
        this.colour[i * 4 + 0] = 1.0;
        this.colour[i * 4 + 1] = 0.0;
        this.colour[i * 4 + 2] = 0.0;
        this.colour[i * 4 + 3] = 1.0
        this.index[i] = 1;
        this.delta[i] = 0;
    }
    this.n_free = this.n_particles;
};

Particles.prototype.emit = function(life, x, y, u, v, index, delta) {
    if (this.n_free > 0) {
        this.n_free -= 1;
        var i = this.free[this.n_free];

        this.life[i] = life;
        this.position[i * 3] = x;
        this.position[i * 3 + 1] = y;
        this.velocity[i * 2] = u;
        this.velocity[i * 2 + 1] = v;
        this.index[i] = index;
        this.delta[i] = delta;
    }
};

Particles.prototype.starfield = function() {
    for (var i = 0; i < 30; i++) {
        this.emit(100000000,
                  randint(0, this.world.width), randint(0, this.world.height),
                  0, 0,
                  randint(50, 200),
                  randint(1, 3));
    }
}

Particles.prototype.explosion = function(n_points, x, y, u, v) {
    for (var i = 0; i < n_points; i++) {
        var delta = 360 / n_points;
        var angle = i * delta + randint(-delta / 2, delta / 2);
        var speed = Math.random() * 2.0;
        this.emit(randint(50, 100),
                  x, y, 
                  u + speed * Math.cos(rad(angle)),
                  v + speed * Math.sin(rad(angle)),
                  colour_table.length - randint(1, 50), -1);
    }
};

Particles.prototype.explosion2 = function(n_points, x, y, u, v) {
    for (var i = 0; i < n_points; i++) {
        var delta = 360.0 / n_points;
        var angle = i * delta + randint(-delta, delta);
        var speed = Math.random() * 4.0;

        this.emit(randint(50, 300),
                  x, y,
                  u + speed * Math.cos(rad(angle)),
                  v + speed * Math.sin(rad(angle)),
                  colour_table.length - randint(1, 50), -1); 
    }
};

Particles.prototype.sparks = function(x, y, u, v) {
    var n_points = 3;
    var delta = 360 / n_points;
    for (var i = 0; i < n_points; i++) {
        var angle = i * delta + randint(-delta / 2, delta / 2);
        var speed = Math.random() * 2.0;
        this.emit(randint(50, 100),
                  x, y,
                  u + speed * Math.cos(rad(angle)),
                  v + speed * Math.sin(rad(angle)),
                  colour_table.length - randint(1, 200), -113);
    }
};

Particles.prototype.jet = function(x, y, u, v, angle) {
    var angle = angle + randint(-10, 10) + 180;
    var u1 = 2 * Math.cos(rad(angle));
    var v1 = 2 * Math.sin(rad(angle));
    this.emit(randint(20, 30),
              x + 3 * u1, y + 3 * v1,
              u + u1, v + v1,
              randint(50, 200), randint(20, 200));
};

Particles.prototype.update = function() {
    for (var i = 0; i < this.n_particles; i++) {
        if (this.life[i] > 0) {
            this.life[i] -= 1;
            if (this.life[i] == 0) {
                this.position[i * 3] = -100;
                this.free[this.n_free] = i;
                this.n_free += 1;
            }
            else {
                this.position[i * 3] = wrap_around(
                    this.position[i * 3] + this.velocity[i * 2], 
                    this.world.width);
                this.position[i * 3 + 1] = wrap_around(
                    this.position[i * 3 + 1] + this.velocity[i * 2 + 1], 
                    this.world.height);
                this.index[i] = wrap_around(
                    this.index[i] + this.delta[i], 
                    colour_table.length);
                this.colour[i * 4] = colour_table[this.index[i]][0];
                this.colour[i * 4 + 1] = colour_table[this.index[i]][1];
                this.colour[i * 4 + 2] = colour_table[this.index[i]][2];
            }
        }
    }
}

Particles.prototype.draw = function() {
    setMatrixUniforms();

    gl.bindBuffer(gl.ARRAY_BUFFER, this.position_buffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, this.position_buffer, this.position);
    gl.enableVertexAttribArray(currentProgram.vertexPositionAttribute);
    gl.vertexAttribPointer(currentProgram.vertexPositionAttribute, 
            this.position_buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.colour_buffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, this.colour_buffer, this.colour);
    gl.enableVertexAttribArray(currentProgram.vertexColorAttribute);
    gl.vertexAttribPointer(currentProgram.vertexColorAttribute, 
            this.colour_buffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.POINT, 0, this.n_particles);
};
