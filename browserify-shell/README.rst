Browserify
==========

This pipeline is a simple, unix pipeline based on browserify.

It uses CLI version of Javascript toolchain components.

It outputs:

- A minified JS file, ``app.js``
- Its sourcemap, ``app.js.map`` (referenced in the ``app.js`` file)
- A hashed version of ``app.js.map``
- A hashed version of ``app.js``, pointing to the hashed version of ``app.js.map``
- A simple ``manifest.json`` file mapping each file to its hashed version (simple dict)

Challenges
----------

* Can browserify output a list of files used?
* Users may spit out many bundles; is that an issue?
* When serving sourcemaps separately, their URL is included in the file; we'll have to be able to transform this
* Do we ask the user to output the bundle within a django app's static folder? In a global static folder? Do we fetch it from its place of choice?

