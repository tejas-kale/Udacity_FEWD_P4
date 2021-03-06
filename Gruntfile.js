'use strict';

// Load 'ngrok' module
var ngrok = require('ngrok');

// wrapper function
module.exports = function(grunt){
	// load all our Grunt plugins
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // task configuration goes here

        jshint: {
        	options: {
        		"node": true,
        		"esnext": true,
        		"curly": true,
        		"smarttabs": true,
        		"indent": 4
        	},
        	all: ['Gruntfile.js', 'src/js/{,*/}*.js', 'src/views/js/{,*/}*.js']
        },

        imagemin: {
        	dist: {
        		options: {
        			optimizationLevel: 5
        		},
        		files: [{
        			expand: true,
        			cwd: 'src/img',
        			src: ['*.{png,jpg,jpeg,gif}'],
        			dest: 'dist/img'
        		},
        		{
        			expand: true,
        			cwd: 'src/views/images',
        			src: ['*.{png,jpg,jpeg,gif}'],
        			dest: 'dist/views/images'
        		}]
        	}
        },

        uglify: {
        	dist: {
        		options: {
        			sourceMap: true,
        			banner: '/*! Udacity_FEWD_P4 | Tejas Kale */'
        		},
        		files: {
        			'dist/js/perfmatters.js': ['src/js/perfmatters.js'],
        			'dist/views/js/main.js': ['src/views/js/main.js']
        		}
        	}
        },

        cssmin: {
        	dist: {
        		options: {
        			banner: '/*! Udacity_FEWD_P4 | Tejas Kale */'
        		},
        		files: {
        			'dist/css/print.css': ['src/css/print.css'],
        			'dist/views/css/bootstrap-grid.css': ['src/views/css/bootstrap-grid.css'],
        			'dist/views/css/style.css': ['src/views/css/style.css']
        		}
        	}
        },

        htmlmin: {
        	dist: {
        		options: {
        			removeComments: true,
        			collapseWhitespace: true,
        			minifyJS: true,
        			minifyCSS: true
        		},
        		files: [{
        			expand: true,
        			cwd: 'src/',
        			src: '**/*.html',
        			dest: 'dist/'
        		},
        		{
        			expand: true,
        			cwd: 'src/views/',
        			src: '**/*.html',
        			dest: 'dist/views/'
        		}]
        	}
        },

        pagespeed: {
        	options: {
        		nokey: true,
        		locale: 'en_GB',
        		threshold: 40
        	},
        	local: {
        		options: {
        			strategy: 'desktop'
        		}
        	},
        	mobile: {
        		options: {
        			strategy: 'mobile'
        		}
        	}
        }

    });

	// Register task for 'ngrok'
	grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function () {
		var done = this.async();
		var port = 8080;

		ngrok.connect (port, function (err, url) {
			if (err !== null) {
				grunt.fail.fatal(err);
				return done();
			}
			grunt.config.set('pagespeed.options.url', url);
			grunt.task.run('pagespeed');
			done();
		});
	});

    // define the default task that executes when we run 'grunt' from inside the project
    grunt.registerTask('default', ['jshint', 'imagemin', 'uglify', 'cssmin', 'htmlmin', 'psi-ngrok']);

};