'use strict';

var elements = [];

function add_normal_elements() {
    elements.push('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'q', 'p', 'r', 's', 't', 'u', 'w', 'x', 'y', 'z');
}

function add_numbers() {
    elements.push(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
}

function add_china_elements() {
    for (var x = 0; x < 255; ++x) {
        elements.push('&#' + x + ';');
    }
}

module.exports = {
    setup: function () {
        add_normal_elements();
        add_numbers();
        // add_china_elements();
    },

    getElements: function () {
        return elements;
    },

    getRandom: function () {
        return elements[parseInt((Math.random() * (elements.length - 1)).toFixed(0), 10)];
    }
};
