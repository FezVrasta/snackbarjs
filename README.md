# SnackbarJS

SnackbarJS is a lightweight and jQuery powered plugin made to work just like the tooltips in Bootstrap.

Include it in your html page with:

    <head>
        <!-- core CSS of SnackbarJS, find it in /dist -->
        <link href=snackbar.min.css rel=stylesheet>
        <!-- the default theme of SnackbarJS, find it in /themes-css -->
        <link href=material.css rel=stylesheet>
    </head>
    <body>
        ...
        <!-- SnackbarJS, find it in /dist -->
        <script src=snackbar.min.js></script>
    </body>

To use it in HTML:

    <span data-toggle=snackbar data-content="This is my awesome snackbar!">Click me</span>

or with javascript:

    $.snackbar({content: "This is my awesome snackbar!"});

## Options

Following options are supported to customize look and behaviour:

    var options =  {
        content: "Some text", // text of the snackbar
        style: "toast", // add a custom class to your snackbar
        timeout: 100, // time in milliseconds after the snackbar autohides, 0 is disabled
        htmlAllowed: true, // allows HTML as content value
        onClose: function(){ } // callback called when the snackbar gets closed.
    }

    $.snackbar(options);

Or in HTML:

    <span data-toggle=snackbar
          data-content="Some text"
          data-style="toast"
          data-timeout="100"
          data-html-allowed="true">
    Click me
    </span>


**Tip**: SnackbarJS returns always a jQuery element which corresponds to the snackbar DOM element, you can use it to get the ID of the element, and then do other operations with it.

**Heads up!**: The <code>onClose</code> callback is not available using the HTML syntax.

## Interact with snackbars

Once you have created a snackbar you can show, hide or toggle it with:

    $("#snackbarid").snackbar("show");
    $("#snackbarid").snackbar("hide");
    $("#snackbarid").snackbar("toggle");

`#snackbarid` can be both the button with the data-toggle=snackbar attribute or the snackbar element.
Calling it on a non-existing snackbar will create it before executing the specificed action.

## Demo

To see SnackbarJS in action visit [the demo page](http://fezvrasta.github.io/snackbarjs/).

Browserify
----------
This library is [UMD](https://github.com/umdjs/umd) compatible, so you can use it in this way:

```javascript
var jquery = require('jquery');
require('snackbarjs');

var options =  {
    ...
}

jquery.snackbar(options);
```
