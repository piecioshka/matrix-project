'use strict';

var Matrix = require('./core/matrix');

function init() {
    Matrix.clear();
    Matrix.init({
        ZONE_WIDTH: window.innerWidth,
        ZONE_HEIGHT: window.innerHeight,
        ANIMATE_OBJECT_WIDTH: 20,
        ANIMATE_OBJECT_HEIGHT: 20,
        ZONE_ID: '#area'
    });
}

window.addEventListener('load', init);
window.addEventListener('resize', init);
