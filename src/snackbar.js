/* SnackbarJS - MIT LICENSE (https://github.com/FezVrasta/snackbarjs/blob/master/LICENSE.md) */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function( $ ){

    $(document).ready(function() {
        $("body").append("<div id=snackbar-container/>");
    });

    function isset(variable) {
        if (typeof variable !== "undefined" && variable !== null) {
            return true;
        } else {
            return false;
        }
    }

    //events (publish subscribe) pattern [aka Event Emitter]
    var events = {
      events: {},
      on: function (eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
      },
      off: function(eventName) {
        if (this.events[eventName]) {
          delete this.events[eventName];
        }
      },
      emit: function (eventName, data) {
        if (this.events[eventName]) {
          this.events[eventName].forEach(function(fn) {
            fn(data);
          });
        }
      }
    };

    $(document)
    .on("click", "[data-toggle=snackbar]", function() {
        $(this).snackbar("toggle");
    })
    .on("click", "#snackbar-container .snackbar", function() {
        $(this).snackbar("hide");
    });

    $.snackbar = function(options) {

        if (isset(options) && options === Object(options)) {
            var $snackbar;

			var snackbarNew = false;

            if (!isset(options.id)) {
                options.id = "snackbar" + Date.now();
                $snackbar = $("<div/>").attr("id", options.id).attr("class", "snackbar");
				snackbarNew = true;
            } else {
                if ($("#" + options.id).length) {
					$snackbar = $("#" + options.id);
				} else {
					$snackbar = $("<div/>").attr("id", "" + options.id).attr("class", "snackbar");
					snackbarNew = true;
				}
            }

            var snackbarStatus = $snackbar.hasClass("snackbar-opened");

            if (isset(options.style)) {
				if (snackbarStatus) {
					$snackbar.attr("class", "snackbar snackbar-opened " + options.style);
                } else {
					$snackbar.attr("class", "snackbar " + options.style);
                }
				$snackbar.attr("data-style", options.style);
            } else {
                if (snackbarStatus) {
					$snackbar.attr("class", "snackbar snackbar-opened");
                } else {
					$snackbar.attr("class", "snackbar");
                }
            }

            options.htmlAllowed = isset(options.htmlAllowed) ? options.htmlAllowed : false;

            options.timeout = (isset(options.timeout)) ? options.timeout : 3000;
			$snackbar.attr("data-timeout", options.timeout);

            options.content = (options.htmlAllowed) ? options.content : $("<p>" + options.content + "</p>").text();

            if (isset(options.onClose)) events.on(options.id, options.onClose);

			if (isset(options.htmlAllowed)) {
				$snackbar.attr("data-html-allowed", options.htmlAllowed);
			}

            if (isset(options.content)) {
                if ($snackbar.find(".snackbar-content").length) {
                    $snackbar.find(".snackbar-content").html(options.content);
                } else {
                    $snackbar.prepend("<span class=snackbar-content>" + options.content + "</span>");
                }
				$snackbar.attr("data-content", options.content);
            }

            if (snackbarNew) {
                $snackbar.appendTo("#snackbar-container");
            } else {
                $snackbar.insertAfter("#snackbar-container .snackbar:last-child");
            }

            // Show or hide item
            if (isset(options.action) && options.action == "toggle") {
                if (snackbarStatus) {
                    options.action = "hide";
                } else {
                    options.action = "show";
                }
            }

            var animationId1 = Date.now();
            $snackbar.data("animationId1", animationId1);
            setTimeout(function() {
                if ($snackbar.data("animationId1") === animationId1) {
                    if (!isset(options.action) || options.action == "show") {
                        $snackbar.addClass("snackbar-opened");
                    } else if (isset(options.action) && options.action == "hide") {
                        $snackbar.removeClass("snackbar-opened");
                        events.emit(options.id);
                        events.off(options.id);
                    }
                }
            }, 50);

            // Set timer for item autohide
            var animationId2 = Date.now();
            $snackbar.data("animationId2", animationId2);

            if (options.timeout !== 0) {
                setTimeout(function() {
                    if ($snackbar.data("animationId2") === animationId2) {
                        $snackbar.removeClass("snackbar-opened");
                        events.emit(options.id);
                        events.off(options.id);
                    }
                }, options.timeout);
            }

            return $snackbar;

        } else {
            return false;
        }
    };

    $.fn.snackbar = function(action) {
        if (typeof action==='undefined'){
            return;
        }
        var options = {};

        if (!this.hasClass("snackbar")) {

            if (!isset(action) || action === "show" || action === "hide" || action == "toggle") {
                options = {
                    content: $(this).attr("data-content"),
                    style: $(this).attr("data-style"),
                    timeout: $(this).attr("data-timeout"),
                    htmlAllowed: $(this).attr("data-html-allowed")
                };
            }

            if (isset(action)) {
                options.id = this.attr("data-snackbar-id");

                if(action === "show" || action === "hide" || action == "toggle") {
                    options.action = action;
                }
            }

            var $snackbar = $.snackbar(options);
            this.attr("data-snackbar-id", $snackbar.attr("id"));

            return $snackbar;

        } else {

            options = {
					id: this.attr("id"),
                    content: $(this).attr("data-content"),
                    style: $(this).attr("data-style"),
                    timeout: parseInt($(this).attr("data-timeout")),
                    htmlAllowed: $(this).attr("data-html-allowed")
                };
            if(action === "show" || action === "hide" || action == "toggle") {
                options.action = action;
            }
            return $.snackbar(options);
        }

    };
}));
