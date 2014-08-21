/* SnackbarJS - MIT LICENSE (https://github.com/FezVrasta/snackbarjs/blob/master/LICENSE.md) */

(function( $ ){

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

            if (!isset(options.id)) {
                $snackbar = $("<div/>").attr("id", "snackbar" + Date.now()).attr("class", "snackbar");
            } else {
                $snackbar = $("#" + options.id);
            }

            var snackbarStatus = $snackbar.hasClass("snackbar-opened");

            if (isset(options.style)) {
                $snackbar.attr("class", "snackbar " + options.style);
            } else {
                $snackbar.attr("class", "snackbar");
            }

            options.timeout = (isset(options.timeout)) ? options.timeout : 3000;

            if (isset(options.content)) {
                if ($snackbar.find(".snackbar-content").length) {
                    $snackbar.find(".snackbar-content").text(options.content);
                } else {
                    $snackbar.prepend("<span class=snackbar-content>" + options.content + "</span>");
                }
            }

            if (!isset(options.id)) {
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
                    }
                }, options.timeout);
            }

            return $snackbar;

        } else {
            return false;
        }
    };

    $.fn.snackbar = function(action) {

        var options = {};

        if (!this.hasClass("snackbar")) {

            if (!isset(action) || action === "show" || action === "hide" || action == "toggle") {
                options = {
                    content: $(this).attr("data-content"),
                    style: $(this).attr("data-style"),
                    timeout: $(this).attr("data-timeout")
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

            options.id = this.attr("id");
            if(action === "show" || action === "hide" || action == "toggle") {
                options.action = action;
            }
            return $.snackbar(options);
        }

    };
})( jQuery );
