var Matrix;
Matrix = (function () {
    "use strict";

    var AREA_SIZE_WIDTH = 300,
        AREA_SIZE_HEIGHT = 300,

        CHAR_SIZE_WIDTH = 10,
        CHAR_SIZE_HEIGHT = 10,

        settings = {
            place: null
        },

        chars = ["a", "b", 4];

    // initialize pattern
    (function () {
        window.addEventListener("load", init_matrix);
    }());

    function init_matrix() {
        Matrix.init({
            place: "#matrix"
        });
    }

    function get_random_char() {
        return (Math.random() * chars.length).toFixed(0);
    }

    function get_random_left() {
        var left = (Math.random() * AREA_SIZE_WIDTH).toFixed(0) - CHAR_SIZE_WIDTH;
        if (left < 0) {
            return get_random_left();
        }
        return left;
    }

    function get_random_top() {
        var top = (Math.random() * AREA_SIZE_HEIGHT).toFixed(0) - CHAR_SIZE_HEIGHT;
        if (top < 0) {
            return get_random_top();
        }
        return top;
    }

    function create_single_char_for_view() {
        var character = document.createElement("span");
        character.innerText = chars[get_random_char()];
        character.className = "character";
        character.style.left = get_random_left();
        character.style.top = get_random_top();
        return character;
    }

    function put_char_on_view(char) {
        document.querySelector(settings.place).appendChild(char);
    }

    function run_matrix() {
        var i;

        for (i = 0; i < 30; i++) {
            put_char_on_view(create_single_char_for_view());
        }
    }

    return {
        init: function (config) {
            settings = config;
            run_matrix();
        }
    }
}());
