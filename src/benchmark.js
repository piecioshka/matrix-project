var Benchmark;
Benchmark = (function () {
    "use strict"

    var data = {};

    function print_test_result(name_of_test) {
        console.log(data[name_of_test] + "ms - " + name_of_test);
    }

    return {
        start: function (name_of_test) {
            data[name_of_test] = (new Date()).getTime();
        },

        stop: function (name_of_test) {
            data[name_of_test] = (new Date()).getTime() - data[name_of_test];
            // print_test_result(name_of_test);
        }
    };
}());
