
module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      all: ["Gruntfile.js", "src/**/*.js"]
    }

  });

  grunt.loadNpmTasks("grunt-contrib-jshint");

  grunt.registerTask("test", ["jshint"]);

};
