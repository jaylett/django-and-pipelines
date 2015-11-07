# Sprockets

## Flow

This takes `application.js` and `application.scss` and generates output assets files and a JSON manifest file. A few things to note:

- it runs preprocessors transparently: if it's a .scss, it generates a CSS transparently
- dependencies are declared in assets: in this example, application.js requires another file: the output is an application.js with dependencies embedded in

## Install

    gem install sprockets
    gem install rake

(well, the Sprockets binary was not available/not in PATH on Fedora after the gem installation, therefore I reverted to RPMs).

## Usage

    rake assets

This will generate an hidden manifest with an hashed name, like:

    public/assets/.sprockets-manifest-861dc60547148bd5179665508d996d4f.json

## Output
    {
        "assets": {
            "application.css": "application-25b2489dd7220d2e30a751767b777f3a8e1cd5d2b1dec72d0765f586f7ae64ae.css",
            "application.js": "application-6f31f78fd8f03d186c9953c0c3b400042a520b268673e3647bfbcd028920e972.js"
        },
        "files": {
            "application-25b2489dd7220d2e30a751767b777f3a8e1cd5d2b1dec72d0765f586f7ae64ae.css": {
                "digest": "25b2489dd7220d2e30a751767b777f3a8e1cd5d2b1dec72d0765f586f7ae64ae",
                "integrity": "sha256-JbJIndciDS4wp1F2e3d/Oo4c1dKx3sctB2X1hveuZK4=",
                "logical_path": "application.css",
                "mtime": "2015-11-07T13:49:46+01:00",
                "size": 60
            },
            "application-6f31f78fd8f03d186c9953c0c3b400042a520b268673e3647bfbcd028920e972.js": {
                "digest": "6f31f78fd8f03d186c9953c0c3b400042a520b268673e3647bfbcd028920e972",
                "integrity": "sha256-bzH3j9jwPRhsmVPAw7QABCpSCyaGc+Nke/vNAokg6XI=",
                "logical_path": "application.js",
                "mtime": "2015-11-07T13:49:46+01:00",
                "size": 28
            }
        }
    }

This is an hash! ;)
