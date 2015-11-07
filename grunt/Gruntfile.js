module.exports = function(grunt) {
    grunt.loadNpmTasks('assetflow');

    grunt.initConfig({
        assets: {
            options: {
                truncateHash: 8,
                manifest: 'build/manifest.json',
            },
            all: {
                src: [
                    'js/**',
                ],
                dest: 'build/',
            }
        },
    });
};
