'use strict';

var placeHolder = null;

module.exports = {
    addClass: function (type) {
        if (placeHolder === null) {
            placeHolder = document.getElementsByTagName('html')[0];
        }

        placeHolder.className += ' ' + type;
    },

    removeClass: function (type) {
        if (placeHolder === null) {
            placeHolder = document.getElementsByTagName('html')[0];
        }

        placeHolder.className = placeHolder.className.replace(type, '');
    }
};
