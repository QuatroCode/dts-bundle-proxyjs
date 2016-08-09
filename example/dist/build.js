'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class World {
    Spin() {
        console.log('World is now spinning! Weeeee');
    }
    Stop() {
        console.log('World has stopped spinning!');
    }
}

class Hello {
    SayHello(name) {
        console.log(`Hello ${name}!`);
    }
}

exports['default'] = World;
exports.World = Hello;