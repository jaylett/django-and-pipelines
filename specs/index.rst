The assets-manifest format
==========================

Purpose
-------

<> is a lightweight format for communicating metadata about an asset pipeline between the pipeline and other tools, including web frameworks and template rendering engines. It is a JSON-based format, with limited extensibility options.

Its core function is to provide a mapping between logical names used
within a framework or template (e.g. ``app.js``)
and the actual asset paths or URLs generated by the pipeline.

A typical asset pipeline transforms source files, through a variety of
tools including compilers, concatenators/linkers and minifiers, into a
single asset. The final asset path will often have a fingerprint or
digest, usually computed as a hash of source contents, rather than
being trivially constructible from the logical name used to refer to
it (e.g.``app-9f37baa7298.js``).




Concepts
--------

.. describe:: bundle

   A grouping of functionality in the pipeline, such as all the scripts
   required for processing a particular form, or the CSS used to lay out
   a site's "chrome".

.. describe:: logical path

   The virtual name describing one of the *bundles* supported by the
   pipeline (e.g. ``app/main.css``, ``vendor.js``). This is the shared
   key used to match a web framework or template's requirement with
   the relevant *asset* or assets generated by the pipeline.

.. describe:: asset

   A single file output by the pipeline as part of a *bundle*.

.. describe:: asset path

   The physical location of a specific *asset*; this can be:

    - A relative filesystem path (e.g ``app/main-677eb3ddf0a.js``)
    - An URL (``https://cdn.example.org/jquery/jquery-1.14.5.js``)
    - A protocol-independent URL (``//cdn.example.org/jqueryr/jquery-1.14.5.js``)


.. note:: All relative paths **MUST** be relative to the folder containing the *assets-manifest* file.


An example
""""""""""

A pipeline is generating all the CSS and Javascript required for *example.com*. There are four bundles:

 * site-wide CSS (logical path ``site.css``)
 * site-wide Javascript (logical path ``site.js``)
 * Javascript for a subscription flow, including additional code for communicating with a payment provider (logical path ``subscribe.js``); this is used with ``site.js`` rather than instead of it
 * CSS for a "lightbox" media browser (logical path ``lightbox.css``); this is used instead of ``site.css``

In production, the pipeline will render each bundle as a single asset, including a hash-based fingerprint in the asset path. For instance, the bundle identified by the logical path ``site.css`` might be rendered as an asset with the asset path ``site-4fbcc857.css``; the bundle ``site.js`` rendered as ``site-14ffdec5.js`` and so forth.

Additionally, each bundle may also have a sourcemap rendered alongside it; the sourcemap for the ``site.js`` bundle would be a bundle with logical path ``site.js.map``, and might result in an asset with asset path ``site-14ffdec5.js.map``

.. warning::

   Sourcemaps **SHOULD** be listed in the manifest, under a logical
   path created by concatenating ".map" to the end of the logical path
   for the relevant bundle.

.. note::

   For sourcemaps to be automatically discovered, the fingerprint in
   its asset path should match the fingerprint of the rendered asset
   that the sourcemap is related to:

    * if the ``site.js`` bundle has an asset ``site.45bf76ed.js``
    * then the ``site.js.map`` bundle has an asset ``site.45bf76ed.js.map``

   Otherwise, an explicit linking comment will be required in the
   rendered asset:

    * if the ``site.js`` bundle has an asset ``site.45bf76ed.js``
    * and the ``site.js.map`` bundle has an asset ``site.1455d2ef.js.map``
    * then the asset ``site.45bf76ed.js`` should contain the comment
      ``//# sourceMappingUrl=site.1455d2ef.js.map``


File format
-----------

An *assets-manifest* file is a JSON file (hence stored using the UTF-8 encoding), usually named ``assets-manifest.json``. Its toplevel entry **MUST** be an object with the following pair names:


.. attribute:: assets-manifest-version

   **REQUIRED**, the version of this specification used by the file.

.. object:: assets

   **REQUIRED**, an object with pairs where the string *name* is a logical path,
   and the *value* is either a string (this logical path is rendered
   by the pipeline into one asset) or an array of strings (this
   logical path is rendered by the pipeline into several assets).

.. object:: files

    **OPTIONAL**, an object providing additional metadata about a
    single asset. A pipeline **MAY** choose to provide metadata
    about only a subset of assets that it writes.

    The string name of each pair is an asset path; the value is an
    object with the following pair names, all optional:

    .. attribute:: logical_path

        *string*, the name of the logical path to which this file relates.

    .. attribute:: size

        *integer*, the size (in bytes) of the asset file.

    .. attribute:: mtime

        *ISO8601 datetime*, when the asset file was last modified.

    .. attribute:: digest

        *hex string*, the hexadecimal-encoded digest of the file.

    .. attribute:: sources

        *list of paths*, the relative path to the files used to build this asset.

    .. attribute:: sourcemap_path

        *path*, the relative path to the sourcemap for this file.

.. object:: metadata

    **OPTIONAL**, additional metadata about the pipeline processing.

    Valid pair names are:

    .. attribute:: generated-by

       *text*, a free description of the software that generated this assets-manifest.

    .. attribute:: generated-on

        *ISO8601 datetime*, when the assets-manifest file was
        generated.

.. note:: Implementations **MAY** add additional entries in the ``metadata`` and ``files`` sections, 
          provided the name of these entries starts with ``x-``.


Example
"""""""

.. code-block:: json

    {
        "<>-version": "1.0",
        "assets": {
            "site.css": "site-4fbcc857.css",
            "site.js": "site-14ffdec5.js",
            "site.css.map": "site-4fbcc857.css.map",
            "site.js.map": "site-14ffdec5.js.map",
            "lightbox.css": "lightbox-33def45f.css",
            "subscribe.js": "subscribe-4523ffdc.js",
            "lightbox.css.map": "lightbox-33def45f.css.map",
            "subscribe.js.map": "subscribe-4523ffdc.js.map"
        },
        "files": {
            "site-4fbcc857.css": {
                "logical_path": "site.css",
                "size": 2746,
                "mtime": "2015-11-07T13:40:32+00:00",
                "digest": "4fbcc857"
            },
            "site-14ffdec5.js": {
                "logical_path": "site.js",
                "size": 324424,
                "mtime": "2015-11-07T13:40:33+00:00",
                "digest": "14ffdec5"
            }
        },
        "metadata": {
            "generated-by": "frobnicator v1.234",
            "generated-on": "2015-11-07T13:42:22+00:00"
        }
    }


Simplified version
""""""""""""""""""

A simplified version of the format is documented only for backwards compatibility; in that case, the JSON file directly contains the *assets* object:

.. code-block:: json

    {
      "app.js.map": "app-9f37baa7298.js.map",
      "app.js": "app-677eb3ddf0a.js",
      "bootstrap.css": "https://cdn.example.org/bootstrap.css"
    }

.. warning::

   The simplified version **SHOULD NOT** be implemented by new pipelines.
   Frameworks or template engines implementing <> **MAY** choose to
   support the simplified version (and will provide compatibility with a
   greater range of pipelines if they do so).


Backwards-compatible version support
""""""""""""""""""""""""""""""""""""

Since both the simplified version and legacy Rails/Sprocket-compatible manifests do not contain an explicit version number, implementations **SHOULD** use
the following heuristic to determine the version of an <> file:

- If the file doesn't parse as JSON or its toplevel is not a object, reject it.
- If the ``<>-version`` pair is available, use that to parse the file.
- Otherwise, if an ``assets`` key is provided and maps to an object, parse as a verion ``1.0`` file.
- Otherwise, parse as a simplified version file.


