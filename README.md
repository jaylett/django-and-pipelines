# Let's find some examples

Just add your name next to the thing you're looking at, possibly adding it at the same time.

 * [gulp](https://github.com/jaylett/django-and-pipelines/tree/master/gulp) (ghickman)
 * [Sprockets](https://github.com/jaylett/django-and-pipelines/tree/master/sprockets) (vad)
 * Webpack (rosco77)
 * [browserify](https://github.com/jaylett/django-and-pipelines/tree/master/browserify-shell) (*rbarrois*)
 * [sigh](https://github.com/jaylett/django-and-pipelines/tree/master/sigh) (takis)
 * [broccoli](https://github.com/jaylett/django-and-pipelines/tree/master/broccoli)
 * sbt-web (Scala) (*jaylett*)
 * [asset-pipeline](https://github.com/jaylett/django-and-pipelines/tree/master/asset-pipeline) (Grails-ish)
 * grunt (frgtn)

## In more detail

For each one, we're looking to build a simple pipeline that maybe compiles some scss and some coffeescript (or something like that; that's just really common in examples, so is probably easier when looking at a tool you don't know!) and outputs the files with revision/hashing, plus a manifest file that provides the mapping for those hashes.

Each one should be added as a subdirectory in this repo. It should become a little more obvious once we have the first one in there :-)


## Specification

Look into [specs](https://github.com/jaylett/django-and-pipelines/tree/master/specs)


## Django integration

The goal would be to have the new assets-pipeline-stuff be compatible with the existing staticfiles module.

Ideally:

 - Use ``{% static 'app.js' %}`` in the templates
 - It's still possible to have the usual manifest storage backend for non-pipeline-stuff (e.g admin statics)
 - The typical compilation is:

    1. Run your pipeline
    2. Run ``./manage.py collectstatic``
    3. Deploy as usual

In details, this would mean:

 * Modify the current static file storage engines to perform the hasing *before* the upload
 * Add another storage engine that can parse an ``assets-manifest`` file and merge it with the usual one

The collectstatic would now be:

 1. Build a list of expected static files (logical paths)
 2. Look into pipeline manifests for those logical paths
    - If a manifest provides a local path for a file, copy it directly to the storage (the pipeline is expected to provide hashing) and add the logical path / target file pair to the (Django) manifest
    - If a manifest provides an URL for the file, just use that directly in the (Django) manifest
 3. For files that couldn't be found in the pipeline manifests, collect them as usual (first compute the hash, then write it to the storage) and add it to the (Django) manifest

At the end of those steps, external files will have been added to the Django manifest and into Django's storage backend, *unless* they are hosted at remote URLs (for instance on a CDN).
