# Manifests for good

We're building (a) [a manifest file format specification](https://github.com/jaylett/django-and-pipelines/tree/master/specs), (b) a series of examples for different pipelines of how to generate them, (c) a series of examples of how to integrate them with various web frameworks and template engines.

## Pipelines

For each one, we aim for a simple pipeline that compiles one or two different things (perhaps scss and some coffeescript) and outputs the files with sourcemaps, revision/hashing, plus a manifest file that provides the mapping for those hashes.

 * [gulp](https://github.com/jaylett/django-and-pipelines/tree/master/gulp)
 * [Sprockets](https://github.com/jaylett/django-and-pipelines/tree/master/sprockets)
 * [Webpack](https://github.com/jaylett/django-and-pipelines/tree/master/webpack)
 * [browserify](https://github.com/jaylett/django-and-pipelines/tree/master/browserify-shell)
 * [sigh](https://github.com/jaylett/django-and-pipelines/tree/master/sigh)
 * [broccoli](https://github.com/jaylett/django-and-pipelines/tree/master/broccoli)
 * sbt-web (Scala) (*jaylett*)
 * [asset-pipeline](https://github.com/jaylett/django-and-pipelines/tree/master/asset-pipeline) (Grails-ish)
 * [grunt](https://github.com/jaylett/django-and-pipelines/tree/master/grunt)

## Frameworks and template engines

 * Rails (is it possible to use Sprockets without the Sprockets pipeline?)
 * Django (probably based on [django-assets-bundles](https://github.com/opbeat/django-assets-bundles))
 * Standalone jinja2
 * Jade
 * Twig
 * Go html/template
 * Handlebars
 * Dust.js?
 * Mustache? (would be needed in various implementations)

## Better Django integration

The goal would be to have the new assets-pipeline-stuff be compatible with the existing staticfiles module.

Ideally:

 - Use ``{% static 'app.js' %}`` in the templates
 - It's still possible to have the usual manifest storage backend for non-pipeline-stuff (e.g admin statics)
 - The typical compilation is:

    1. Run your pipeline
    2. Run ``./manage.py collectstatic``
    3. Deploy as usual

In details, this would mean:

 * Modify the current static file storage engines to perform the hashing *before* the upload
 * Add another storage engine that can parse an ``assets-manifest`` file and merge it with the usual one

The collectstatic would now be:

 1. Build a list of expected static files (logical paths)
 2. Look into pipeline manifests for those logical paths
    - If a manifest provides a local path for a file, copy it directly to the storage (the pipeline is expected to provide hashing) and add the logical path / target file pair to the (Django) manifest
    - If a manifest provides an URL for the file, just use that directly in the (Django) manifest
 3. For files that couldn't be found in the pipeline manifests, collect them as usual (first compute the hash, then write it to the storage) and add it to the (Django) manifest

At the end of those steps, external files will have been added to the Django manifest and into Django's storage backend, *unless* they are hosted at remote URLs (for instance on a CDN).

The changes to both the implicit extended Storage API used by collectstatic, and collectstatic itself (and probably the desirability of moving collectstatic into core, then overriding it in a contrib app to provide hashing behaviour) will probably necessitate a DEP.
