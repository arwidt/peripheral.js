;var _peripheral = (function() {
    "use strict";

    var _inst = function(opts) {
        var _opts = opts;

        var inst = {};
        var _childItems = [];

        var _hideElement = function(item) {
            item.height = item.item.height();
            item.item[0].innerHTML = '<div style="height:'+item.height+'px"></div>';
            item.active = false;
        };

        var _showElement = function(item) {
            item.item[0].innerHTML = item.content;
            item.active = true;
        };

        inst.incID = 0;
        inst.getIncrementID = function() {
            inst.incID++;
            return inst.incID;
        };

        inst.init = function() {

            // Start by pushing the predefined containers
            // into the childItems array.
            var item,
                id;
            for (var i = 0, len = _opts.predefinedContainers.length; i < len; i++) {
                id = "item_" + this.getIncrementID();
                item = _opts.predefinedContainers[i];
                item.data('tag', 1);
                item.attr('id', id);

                _childItems.push({
                    key: id,
                    index: _childItems.length,
                    content: item[0].innerHTML,
                    item: item,
                    positionY: 0,
                    height: 0,
                    active: true
                });
            }

            var windowTop = _opts.scrollTarget.scrollTop();
            var windowBottom = windowTop + window.innerHeight;
            var item;
            var printInterval = 0;
            var windowTopLazy = 0;

            _opts.scrollTarget.on('scroll', function(e) {

                windowTopLazy = windowTop;
                windowTop = _opts.scrollTarget.scrollTop();
                windowBottom = windowTop + window.innerHeight;

                var top = 0,
                    bottom = 0;
                for (var i = 0, len = _childItems.length; i < len; i++) {
                    item = _childItems[i];

                    top = item.item.offset().top;
                    bottom = top + item.item.height();

                    if (top > windowTop && top < windowBottom || bottom > windowTop && bottom < windowBottom || windowTop > top && windowBottom < bottom) {
                        if (!item.active) {
                            _showElement(item);
                        }
                    } else {
                        if (item.active) {
                            _hideElement(item);
                        }
                    }

                }

                clearInterval(printInterval);
                printInterval = setTimeout(function() {
                    if (_opts.sticky) {
                        _opts.sticky.update();
                    }
                }, 50);

            });

            return this;
        };

        inst.update = function() {

            var self = this;

            _opts.container.find(_opts.childSelector).each(function() {

                if (!$(this).data('tag')) {
                    $(this).data('tag', 1);
                    var id = "item_" + self.getIncrementID();
                    $(this).attr('id', id);
                    var item = {
                        key: id,
                        index: _childItems.length,
                        content: $(this)[0].innerHTML,
                        isLoaded: false,
                        item: $(this),
                        positionY: 0,
                        height: 0,
                        active: true
                    };
                    _childItems.push(item);
                }
            });

            return this;
        };

        inst.printChildren = function() {
            console.table(_childItems);
        };

        inst.childItems = _childItems;

        return inst;
    };

    var _fact = {
        create: function(opts) {
            return _inst(opts);
        }
    };

    return _fact;

})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = _peripheral;
} else {
    window.peripheral = _peripheral;
}