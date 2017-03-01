'use strict';

var MatrixData = require('./data');
var Utils = require('./utils');

var config = {
    ZONE_WIDTH: null,
    ZONE_HEIGHT: null,
    ANIMATE_OBJECT_WIDTH: null,
    ANIMATE_OBJECT_HEIGHT: null,
    ZONE_ID: null
};

var animationIntervals = [];
var $dom = null;
// var flying_elements = MatrixData.getElements();

function setupArea(html_element) {
    var style = html_element.style;

    // define dimensions
    style.width = config.ZONE_WIDTH + 'px';
    style.height = config.ZONE_HEIGHT + 'px';
}

function createSingleCharForView() {
    var $span = document.createElement('span');
    // for Firefox must use innerHTML
    $span.innerHTML = MatrixData.getRandom();
    $span.className = 'character';
    return $span;
}

function createChainForView(number) {
    var i;
    var $chain = document.createElement('div');
    var number_of_letters = 6;

    $chain.className = 'chain';

    var style = $chain.style;
    // for Firefox must add 'px' to definite top and left dimensions
    style.left = number * config.ANIMATE_OBJECT_WIDTH + 'px';
    style.top = (-1) * number_of_letters * config.ANIMATE_OBJECT_HEIGHT + 'px';

    style.height = number_of_letters * config.ANIMATE_OBJECT_HEIGHT + 'px';
    style.width = config.ANIMATE_OBJECT_HEIGHT + 'px';

    for (i = 0; i < number_of_letters; ++i) {
        $chain.appendChild(createSingleCharForView(number));
    }

    return $chain;
}

function putObjectToView(number) {
    var $chain = createChainForView(number);
    $dom.appendChild($chain);
    animateChain($chain, number);
}

function animateChain($chain, number) {
    var top = parseInt($chain.style.top, 10);
    var time = +(Math.random() * 70 + 10).toFixed(0);
    var interval = setInterval(function () {
        if (top >= config.ZONE_HEIGHT) {
            // delete from DOM
            $chain.parentNode.removeChild($chain);

            // delete from IE
            $chain = null;

            clearInterval(interval);

            // create new instance
            putObjectToView(number);
            return;
        }

        $chain.style.top = top + 'px';
        top += 5;
    }, time);

    animationIntervals.push(interval);
}

function setup() {
    var i;
    var max = (config.ZONE_WIDTH / config.ANIMATE_OBJECT_WIDTH).toFixed(0);

    for (i = 0; i < max; i++) {
        putObjectToView(i);
    }
    setupArea($dom);
}

function clearIntervals() {
    var i;
    var count = animationIntervals.length;

    for (i = 0; i < count; i++) {
        clearInterval(animationIntervals[i]);
    }
}

module.exports = {
    init: function (settings) {
        MatrixData.setup();

        // ustawienie konfiguracji
        config = Utils.mixin(config, settings);

        // złapanie kontenera do animacji
        $dom = document.querySelector(config.ZONE_ID);

        // uruchomienie animacji
        setup();
    },
    clear: function () {
        if ($dom) {
            $dom.innerHTML = '';
        }

        clearIntervals();
    }
};
