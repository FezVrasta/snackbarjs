# SnackbarJS

SnackbarJS is a lightweight and jQuery powered plugin made to work in Bootstrap style, just like the Bootstrap tooltips work.

Use it is easy as write:

    <span data-toggle=snackbar data-content="This is my awesome snackbar!">Click me</span>

## Options

There are some options to customize SnackbarJS look and beahvior:

    var options =  {
        content: "Some text", // text of the snackbar
        style: "toast", // add a custom class to your snackbar
        timeout: 100 // time in milliseconds after the snackbar autohides, 0 is disabled
    }

    $.snackbar(options);

**Tip**: SnackbarJS returns always a jQuery element which corresponds to the snackbar.

## Demo

To see SnackbarJS in action visit [the demo page](http://fezvrasta.github.io/snackbarjs/).
