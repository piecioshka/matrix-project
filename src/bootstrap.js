(function (window) {
    "use strict";

    function matrix_bootstrap() {
        Matrix.clear();
        Matrix.init({
            ZONE_WIDTH: window.innerWidth,
            ZONE_HEIGHT: window.innerHeight,
            ANIMATE_OBJECT_WIDTH: 20,
            ANIMATE_OBJECT_HEIGHT: 20,
            ZONE_ID: "#area"
        });
    }

    // initialize pattern
    window.addEventListener("load", matrix_bootstrap);
    window.addEventListener("resize", matrix_bootstrap);
}(window));

