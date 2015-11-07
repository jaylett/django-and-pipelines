# broccoli

[Broccoli](https://github.com/broccolijs/broccoli) is a node-based "beta" quality pipeline. [broccoli-asset-rev](https://www.npmjs.com/package/broccoli-asset-rev) implements hashing/versioning, and also can spit out manifests in a range of formats. "Rails-style" (ie Sprockets) manifest:

```json
{
  "assets": {
    "assetMap.json": "assetMap.json"
  },
  "files": {
    "assetMap.json": {
      "logical_path": "assetMap.json",
      "mtime": "2015-11-07T10:46:44.000Z",
      "size": 153
    }
  }
}
```

assetMap:

```json
{
  "assets": {
    "app.css": "app-d41d8cd98f00b204e9800998ecf8427e.css",
    "app.js": "app-34208c306303fd2c501c70913a9bd87e.js"
  },
  "prepend": ""
}
```

these can be fingerprinted (the Rails one is by default). The Rails one doesn't actually seem to work (it includes the assetMap, if generated, but it doesn't include any of the other files).

The "prepend" is a configuration option and results in shorter asset maps; it enables for instance convenient CDN usage.

broccoli-asset-rev will rewrite file references internally. You can in theory use that for templates as well (particularly if you are building everything statically), or you could use the manifests in a template helper.