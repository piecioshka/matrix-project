var Matrix;
Matrix = (function () {
    "use strict";

    var AREA_SIZE_WIDTH = 300,
        AREA_SIZE_HEIGHT = 300,

        CHAR_SIZE_WIDTH = 10,
        CHAR_SIZE_HEIGHT = 10,

        settings = {
            place_id: null
        },

        area_instance = null,

        chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
            "o", "q", "p", "r", "s", "t", "u", "w", "x", "y", "z"];

    // initialize pattern
    (function () {
        window.addEventListener("load", init_matrix);
    }());

    function init_matrix() {
        Matrix.init({
            place_id: "#matrix"
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

    function get_random_time() {
        return (Math.random() * 200 + 50).toFixed(0);
    }

    function create_single_char_for_view(number) {
        var character = document.createElement("span");
        character.innerText = chars[get_random_char()];
        character.className = "character";

        var style = character.style;
        style.left = number * CHAR_SIZE_WIDTH;
        style.top = 0;
        if (number % 2) {
            style.backgroundColor = "red";
        }

        return character;
    }

    function put_char_on_view(character, callback) {
        // optymalization
        if (area_instance === null) {
            area_instance = document.querySelector(settings.place_id);
        }
        area_instance.appendChild(character);
        callback(character);
    }

    function animate_character(character) {
        var top = 0;
        var interval = setInterval(function () {
            if (top >= AREA_SIZE_HEIGHT) {
                character = null;
                clearInterval(interval);
                return false;
            }

            character.style.top = top + "px";
            top += 10;
        }, get_random_time());
    }

    function run_matrix() {
        var i;

        Benchmark.start("create characters");

        for (i = 0; i < AREA_SIZE_WIDTH / CHAR_SIZE_WIDTH; i++) {
            put_char_on_view(create_single_char_for_view(i), animate_character);
        }

        Benchmark.stop("create characters");
    }

    return {
        init: function (config) {
            settings = config;

            Benchmark.start("start of application");

            run_matrix();

            Benchmark.stop("start of application");
        }
    };
}());
