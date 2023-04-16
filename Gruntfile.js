module.exports = function(grunt){
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPreapre: 'grunt-usemin'
    });
    grunt.initConfig({
        sass: {
            dist: {
                files: [{
                    expand:true,
                    cwd: 'css',
                    src: ['*.scss'],
                    dest: 'css',
                    ext: '.css'

                }]
            }
        },
        watch: {
            files: ['css/*.css'],
            tascks: ['css']
        },
        browserSync:{
            dev: {
                bsFiles: {
                    sec: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }
                }
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './',
                    crc: 'img/*.{png, gif, jpg, jpeg}',
                    dest: 'dist/'
                }]
            }
        },

        copy: {
            html:{
                files:[{
                    expand: true,
                    dot: 'true',
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            }
        },
        clean: {
            buid: {
                src: ['dist/']
            }
        },
        cssmin: {
            dist: {}
        },
        uglify: {
            dist: {}
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorinthm: 'md5',
                length: 20
            },
            release: {
                files: [{
                    src: [
                        'dist/JS/*.js',
                        'dist/css/*.css',
                    ]
                }]
            }
        },
        contact: {
            options: {
                separador: ';'
            },
            dist: {}
        },
        useminPreapre: {
            foo:{
                dest: 'dist',
                src: ['index.html', 'avout.html', 'contact.html', 'FAQ.html', 'price.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function(context, block){
                                var generated = context.options.generated;
                                generated.options ={
                                    keepSpecialComents: 0,
                                    rebase: false
                                }
                            }
                        }]
                    }
                }
            }
        },
        usemin:{
            html: ['index.html', 'avout.html', 'contact.html', 'FAQ.html', 'price.html'],
            options: {
                assetsDir: ['dist', 'dist/css', 'dist/js']
            }
        }

    });
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('img:compress', ['imagemin'])
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ])



};