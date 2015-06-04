module.exports = function(grunt) {

    'use strict';
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ["docs/cookie-policy/html/","docs/privacy-policy/html/"],

        md2html: {
            multiple_files: {
                options: {},
                files: [
                    {
                        expand: true,
                        cwd: 'docs/cookie-policy/md/',
                        src: ['**/*.md'],
                        dest: 'docs/cookie-policy/html/',
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: 'docs/privacy-policy/md/',
                        src: ['**/*.md'],
                        dest: 'docs/privacy-policy/html/',
                        ext: '.html'
                    }
                ]
            }
        },
        
        dom_munger: {
            clean_ids: {
            options: {
                update: [
                    {selector:'h1',attribute:'id', value:'none'},
                    {selector:'h2',attribute:'id', value:'none'},
                    {selector:'h3',attribute:'id', value:'none'},
                    {selector:'h4',attribute:'id', value:'none'},
                    {selector:'h5',attribute:'id', value:'none'},
                    {selector:'h6',attribute:'id', value:'none'}
                ]
            },
            expand: true,    
            cwd: 'docs/',    
            src: '**/*.html', //could be an array of files 
            dest: 'docs/' //optional, if not specified the src file will be overwritten 
            }
        },
        
        'string-replace': {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'docs/',
                    src: '**/*.html',
                    dest: 'docs/'
                }],
                options: {
                    saveUnchanged: true,
                    replacements: [
                        {
                            //pattern: /<h1 (\\S+)=[\"']?((?:.(?![\"']?\\s+(?:\\S+)=|[>\"']))+.)[\"']>?/,
                            pattern: / id="none"/g,
                            replacement: ''
                        }
                    ]
                }
            }
        },
        
        htmljson: {
            default_options: {
                    src: ['docs/cookie-policy/**/*.html'],
                    dest: 'docs/cookie-policy/json/cookie-policy-docs.json'
                },
                custom_options: {
                    src: ['docs/privacy-policy/html/*.html'],
                    dest: 'docs/privacy-policy/json/privacy-policy-docs.json',
                    options: {
                        separator: 2,
                    },
                },
        }


    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-md2html');
    grunt.loadNpmTasks('grunt-dom-munger');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-htmljson');

    // Default task(s).
    grunt.registerTask('default', [
        'clean',
        'md2html',
        'dom_munger',
        'string-replace',
        'htmljson'
    ]);

};