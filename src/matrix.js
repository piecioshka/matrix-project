var Matrix;
Matrix = (function () {
    "use strict";

    /// replace under
    var AREA_SIZE_WIDTH = 0,
        AREA_SIZE_HEIGHT = 0,

        // set character dimensions
        CHAR_SIZE_WIDTH = 10,
        CHAR_SIZE_HEIGHT = 10,

        area_id = "#matrix",

        area_instance = document.querySelector(area_id),

        chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
            "o", "q", "p", "r", "s", "t", "u", "w", "x", "y", "z"];

    // get Window dimensions
    AREA_SIZE_WIDTH = window.innerWidth;
    AREA_SIZE_HEIGHT = window.innerHeight;

    var area_style = area_instance.style;

    // define dimensions
    area_style.width = AREA_SIZE_WIDTH + "px";
    area_style.height = AREA_SIZE_HEIGHT + "px";

    // initialize pattern
    (function () {
        window.addEventListener("load", init_matrix);
    }());

    function init_matrix() {
        Matrix.init();
    }

    function get_random_char() {
        return parseInt((Math.random() * chars.length - 1).toFixed(0), 10);
    }

    function get_random_time() {
        return (Math.random() * 100 + 20).toFixed(0);
    }

    function create_single_char_for_view(number) {
        var character = document.createElement("span");

        var random = get_random_char();
        if (random < 0) {
            random = 1;
        }

        // for Firefox must use innerHTML
        character.innerHTML = chars[random];
        character.className = "character";

        return character;
    }

    function get_chain_for_view(number) {
        var chain = document.createElement("div"),
            i,
            number_of_letters = 6;

        chain.className = "chain";

        var style = chain.style;
        // for Firefox must add "px" to definite top and left dimensions
        style.left = number * CHAR_SIZE_WIDTH + "px";
        style.top = (-1) * number * CHAR_SIZE_HEIGHT + "px";

        style.height = number_of_letters * CHAR_SIZE_HEIGHT + "px";
        style.width = CHAR_SIZE_HEIGHT + "px";

        for (i = 0; i < number_of_letters; ++i) {
            chain.appendChild(create_single_char_for_view(number));
        }

        return chain;
    }

    function put_object_to_view(number, callback) {
        var character = get_chain_for_view(number);
        area_instance.appendChild(character);
        callback(character, number);
    }

    function animate_chain(character, number) {
        var top = parseInt(character.style.top, 10);
        var interval = setInterval(function () {
            if (top >= AREA_SIZE_HEIGHT) {
                // delete from DOM
                character.parentNode.removeChild(character);
                // delete from IE
                character = null;

                clearInterval(interval);

                // create new instance
                put_object_to_view(number, animate_chain);
                return false;
            }

            character.style.top = top + "px";
            top += 5;
        }, get_random_time());
    }

    function run_matrix() {
        var i, max = (AREA_SIZE_WIDTH / CHAR_SIZE_WIDTH).toFixed(0);

        Benchmark.start("create " + max + " characters");

        for (i = 0; i < max; i++) {
            put_object_to_view(i, animate_chain);
        }

        Benchmark.stop("create " + max + " characters");
    }

    return {
        init: function () {
            Benchmark.start("start of application");

            run_matrix();

            Benchmark.stop("start of application");
        }
    };
}());
