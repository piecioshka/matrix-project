'use strict';

function toString(o) {
    return Object.prototype.toString.call(o);
}

module.exports = {
    is_array: function (x) {
        return toString(x) === '[object Array]';
    },

    is_object: function (x) {
        return toString(x) === '[object Object]';
    },
    in_array: function (e, a) {
        var i;
        var count = a.length;
        for (i = 0; i < count; ++i) {
            if (a[i] === e) {
                return true;
            }
        }
        return false;
    },

    mixin: function (target, source) {
        var i, len, element, item;

        if (this.is_array(target) && this.is_array(source)) {
            len = source.length;
            for (i = 0; i < len; ++i) {
                element = source[i];
                if (!this.in_array(element, target)) {
                    target.push(element);
                }
            }
            target.sort();
        } else {
            for (item in source) {
                if (source.hasOwnProperty(item)) {
                    if (this.is_object(target[item])) {
                        target[item] = this.mixin(target[item], source[item]);
                    } else {
                        target[item] = source[item];
                    }
                }
            }
        }
        return target;
    }
};
