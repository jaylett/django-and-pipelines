/* Brocfile.js */

// Import some Broccoli plugins
var compileSass = require('broccoli-sass');
var filterCoffeeScript = require('broccoli-coffee');
var mergeTrees = require('broccoli-merge-trees');
var rev = require('broccoli-asset-rev');

// Specify the Sass and Coffeescript directories
var sassDir = 'app/scss';
var coffeeDir = 'app/coffeescript';

// Tell Broccoli how we want the assets to be compiled
var styles = compileSass([sassDir], 'app.scss', 'app.css');
var scripts = filterCoffeeScript(coffeeDir);
var tree = mergeTrees([styles, scripts]);

var hashed = new rev(
    tree,
    {
        generateRailsManifest: true
    }
);

// Merge the compiled styles and scripts into one output directory.
module.exports = hashed;
