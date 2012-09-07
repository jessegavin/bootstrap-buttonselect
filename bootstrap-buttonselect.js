/*!
* Twitter Bootstrap Plugin
* Unobtrusively replaces a select list with a button menu
* Original author: @jessegavin
* Licensed under the MIT license

* Depends on jquery.hotkeys.js
* https://github.com/jeresig/jquery.hotkeys
*/

; (function ($, window, document, undefined) {
    var pluginName = 'buttonSelect',
        defaults = {
            css: {
                "position": "relative",
                "display": "inline-block"
            }
        };

    function Plugin(element, options) {
        this.element = element;

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function () {

        var container = $("<div></div>", {
            css: this.options.css
        });

        var buttonText = $("<span>Button</span>");

        var button = $("<button class='btn dropdown-toggle'> <span class='caret'></span></button>")
                        .prepend(buttonText)
                        .appendTo(container)
                        .dropdown();

        var menu = $("<ul class='dropdown-menu'></ul>").appendTo(container);

        var select = $(this.element).after(container).hide();

        select.find("option").each(function (el, index) {
            var $this = $(this);
            var menuLink = $("<a></a>", {
                "href": "#",
                text: $this.text()
            }).on("click", { menuItem: $this }, function (e) {
                e.preventDefault();
                changeSelection(e.data.menuItem)
            })
            $("<li></li>").append(menuLink).appendTo(menu);
        });

        var changeSelection = function ($option) {
            select.val($option.val());
            buttonText.text($option.text());
        };

        changeSelection(select.find(":selected"));

        button.bind("keydown", "up", function (e) {
            e.preventDefault();
            var prev = select.find(":selected").prev("option");
            if (prev.length > 0) changeSelection(prev);
        });

        button.bind("keydown", "down", function (e) {
            e.preventDefault();
            var next = select.find(":selected").next("option");
            if (next.length > 0) changeSelection(next);
        });


    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin(this, options));
            }
        });
    }

})(jQuery, window, document);