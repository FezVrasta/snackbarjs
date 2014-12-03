
module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      all: ["Gruntfile.js", "src/**/*.js"]
    },

    less: {
      snackbar: {
        options: {
          paths: ["less"],
          sourceMap: true,
          sourceMapRootpath: "/",
          sourceMapFilename: "dist/snackbar.css.map",
          sourceMapURL: "snackbar.css.map"
        },
        files: {
          "dist/snackbar.css": "src/snackbar.less",
        }
      },
      themes: {
        options: {
          paths: ["themes-less"]
        },
        files: [{
          expand: true,
          cwd: "themes-less",
          src: "*.less",
          dest: "themes-css",
          ext: ".css"
        }]
      }
    },

    cssmin: {
      snackbar: {
        expand: true,
        cwd: "dist",
        src: ["*.css", "!*.min.css"],
        dest: "dist",
        ext: ".min.css"
      }
    },

    uglify: {
      options: {
        sourceMap: true
      },
      snackbar: {
        files: {
          "dist/snackbar.min.js": "src/snackbar.js"
        }
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-less");

  grunt.registerTask("test", ["jshint"]);
  grunt.registerTask("dist", ["less:snackbar", "cssmin:snackbar", "uglify:snackbar"]);
  grunt.registerTask("themes", ["less:themes"]);

};
