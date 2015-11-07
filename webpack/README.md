#webpack

##webpack examples files

###Compiler config

Within the compiler config file you specify the entry points that webpack will use to compile down in to the final 
compressed file.

The important thing to note is that this entry file is the “core” of the frontend JS, i.e. anything not required by 
this file (or a dependency of something which is required) will never end up in the compiled bundle.

These required files (called modules) are included in your bundle.js. webpack will give each module a unique id and save 
all modules accessible by id in the bundle.js file. Only the entry module is executed on startup. A small runtime 
provides the require function and executes the dependencies when required.

You specify requirements in the .js files by using the following code examples:

    require("!style!css!./style.css");
    require("./content.js"));
    
Certain file types can be identified by using module loaders as defined in the config example below (showing css and coffeescript files).

More information about various module loaders can be found [here](http://webpack.github.io/docs/using-loaders.html)
    
**Example add webpack.config.js**
    
    var path = require("path");
    var webpack = require('webpack');
    
    module.exports = {
        entry: {
            entry: './src/entry.js'
        }
        output: {
            path: path.join(__dirname, 'build'),
            filename: '[name].[hash].js'
        },
        module: {
            loaders: [
                { test: /\.css$/, loader: "style!css" },
                { test: /\.coffee$/, loader: 'coffee-loader' },
            ]
        }
    };
     

**Example output of hash names from the example above**
    
``` <script src="entry.js"></script> => <script src="entry.155567618f4367cd1cb8.js"></script>```

webpack doesn't export any manifest files and so this must be done through the use of a 3rd party plugin.  There are two examples as shown below which appear to be the most common (based on found documentation and tutorials).

### webpack manifest

To use the webpack-manifest-plugin enter the following lines in to your webpack.config.js file

    var ManifestPlugin = require('webpack-manifest-plugin');

    module.exports = {
        ...
        plugins: [
            new ManifestPlugin(),
            })
          ]
    };



A manifest can be further defined using configurable constructor options

    A new ManifestPlugin({
      fileName: 'my-manifest.json',
      basePath: '/app/'
    })

Options:

fileName: The manifest filename in your output directory (manifest.json by default).
basePath: A path prefix for all file references. Useful for including your output path in the manifest.
stripSrc: removes unwanted strings from source filenames

**Example my-manifest.json output**

    {
      “entry.js”: “main.155567618f4367cd1cb8.js”,
    }


###webpack-bundle-tracker

An alternative manifest tool for webpack is webpack bundle tracker.  To use the tracker enter the following in to your 
config file
 
    var BundleTracker  = require('webpack-bundle-tracker');

    module.exports = {
        ...
        plugins: [
            new BundleTracker({path: __dirname, filename: './assets/webpack-stats.json'})
            })
          ]
    };

This will output the following json manifest

**Example webpack-stats.json output**
    
    {
      "status":"done",
      "chunks":{
       "app":[{
          "name":"app-0828904584990b611fb8.js",
          "publicPath":"http://localhost:3000/assets/bundles/app-0828904584990b611fb8.js",
          "path":"/home/user/project-root/assets/bundles/app-0828904584990b611fb8.js"
        }]
      }
    }

errors look like the below
    
    {
      "status": "error",
      "file": "/path/to/file/that/caused/the/error",
      "error": "ErrorName", 
      "message": "ErrorMessage"
    }



