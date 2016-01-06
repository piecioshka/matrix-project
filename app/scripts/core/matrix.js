'use strict';

var MatrixData = require('./data');
var Utils = require('../common/utils');
var DOM = require('../common/dom');

var config = {
    ZONE_WIDTH: null,
    ZONE_HEIGHT: null,
    ANIMATE_OBJECT_WIDTH: null,
    ANIMATE_OBJECT_HEIGHT: null,
    ZONE_ID: null
};

var animationIntervals = [];
var area_instance = null;
// var flying_elements = MatrixData.getElements();

function setup_area(html_element) {
    var style = html_element.style;

    // define dimensions
    style.width = config.ZONE_WIDTH + 'px';
    style.height = config.ZONE_HEIGHT + 'px';
}

function create_single_char_for_view() {
    var anim_obj = document.createElement('span');
    // for Firefox must use innerHTML
    anim_obj.innerHTML = MatrixData.getRandom();
    anim_obj.className = 'character';
    return anim_obj;
}

function create_chain_for_view(number) {
    var chain = document.createElement('div'),
        i,
        number_of_letters = 6;

    chain.className = 'chain';

    var style = chain.style;
    // for Firefox must add 'px' to definite top and left dimensions
    style.left = number * config.ANIMATE_OBJECT_WIDTH + 'px';
    style.top = (-1) * number_of_letters * config.ANIMATE_OBJECT_HEIGHT + 'px';

    style.height = number_of_letters * config.ANIMATE_OBJECT_HEIGHT + 'px';
    style.width = config.ANIMATE_OBJECT_HEIGHT + 'px';

    for (i = 0; i < number_of_letters; ++i) {
        chain.appendChild(create_single_char_for_view(number));
    }

    return chain;
}

function put_object_to_view(number) {
    var anim_obj = create_chain_for_view(number);
    area_instance.appendChild(anim_obj);
    animate_chain(anim_obj, number);
}

function animate_chain(anim_obj, number) {
    var top = parseInt(anim_obj.style.top, 10);
    var interval = setInterval(function () {
        if (top >= config.ZONE_HEIGHT) {
            // delete from DOM
            anim_obj.parentNode.removeChild(anim_obj);

            // delete from IE
            anim_obj = null;

            clearInterval(interval);

            // create new instance
            put_object_to_view(number);
            return;
        }

        anim_obj.style.top = top + 'px';
        top += 5;
    }, +(Math.random() * 70 + 10).toFixed(0));

    animationIntervals.push(interval);
}

function setup() {
    var i, max = (config.ZONE_WIDTH / config.ANIMATE_OBJECT_WIDTH).toFixed(0);

    for (i = 0; i < max; i++) {
        put_object_to_view(i);
    }
    setup_area(area_instance);
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
        // ustawienie konfiguracji
        config = Utils.mixin(config, settings);

        // złapanie kontenera do animacji
        area_instance = document.querySelector(config.ZONE_ID);

        // dodanie klasy CSS do załadowania wyglądu
        DOM.addClass('matrix');

        // uruchomienie animacji
        setup();
    },
    clear: function () {
        if (area_instance) {
            area_instance.innerHTML = '';
        }

        clearIntervals();
        DOM.removeClass('matrix');
    }
};
