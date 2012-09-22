var Matrix;
Matrix = (function () {
    "use strict";

    var AREA_SIZE_WIDTH = 0,
        AREA_SIZE_HEIGHT = 0,

        CHAR_SIZE_WIDTH = 10,
        CHAR_SIZE_HEIGHT = 10,

        area_id = "#matrix",

        area_instance = null,

        chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
            "o", "q", "p", "r", "s", "t", "u", "w", "x", "y", "z"];


    // optymalization
    area_instance = document.querySelector(area_id);

    AREA_SIZE_WIDTH = window.innerWidth - 10;
    AREA_SIZE_HEIGHT = window.innerHeight - 10;

    area_instance.style.width = AREA_SIZE_WIDTH + "px";
    area_instance.style.height = AREA_SIZE_HEIGHT + "px";

    console.log("AREA_SIZE_WIDTH", AREA_SIZE_WIDTH);
    console.log("AREA_SIZE_HEIGHT", AREA_SIZE_HEIGHT);

    // initialize pattern
    (function () {
        window.addEventListener("load", init_matrix);
    }());

    function init_matrix() {
        Matrix.init();
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
        // for Firefox must use innerHTML
        character.innerHTML = chars[get_random_char()];
        character.className = "character";

        var style = character.style;
        // for Firefox must add "px" to definite top and left dimensions
        style.left = number * CHAR_SIZE_WIDTH + "px";
        style.top = "0px";
        if (number % 2) {
            style.backgroundColor = "red";
        }

        return character;
    }

    function put_char_on_view(number, callback) {
        var character = create_single_char_for_view(number);
        area_instance.appendChild(character);
        callback(character, number);
    }

    function animate_character(character, number) {
        var top = 0;
        var interval = setInterval(function () {
            if (top >= AREA_SIZE_HEIGHT) {
                // delete from DOM
                character.parentNode.removeChild(character);
                // delete from IE
                character = null;

                clearInterval(interval);

                // create new instance
                put_char_on_view(number, animate_character);
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
            put_char_on_view(i, animate_character);
        }

        Benchmark.stop("create characters");
    }

    return {
        init: function () {
            Benchmark.start("start of application");

            run_matrix();

            Benchmark.stop("start of application");
        }
    };
}());
