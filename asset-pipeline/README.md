# asset-pipeline

[asset-pipeline](https://github.com/bertramdev/asset-pipeline) is an on-demand (on template render) pipeline for JVM apps, primary via Gradle. It has a precompilation option, and supports extensible modules for compilation, various minification approaches, asset bundling and some issues specific to serving (GZIP, Last-Modified &c).

Its cache digest outputs aliases in a manifest.properties file. See [the Java documentation](http://docs.oracle.com/javase/7/docs/api/java/util/Properties.html) for more details. Something like [pyjavaproperties](https://pypi.python.org/pypi/pyjavaproperties) would allow us to load these if we really needed to.

I'm not going to bother gto build an example for this.