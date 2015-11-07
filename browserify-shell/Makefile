BROWSERIFY = ./node_modules/.bin/browserify
EXORCIST = ./node_modules/.bin/exorcist
HASHFILENAME = ./node_modules/.bin/hash-filename

build:
	@mkdir -p assets
	$(BROWSERIFY) --debug --entry app/coffeescript/app.coffee --transform coffeeify | $(EXORCIST) assets/app.js.map > assets/app.js
	HASHED_MAP=`$(HASHFILENAME) assets/app.js.map | jq '."app.js.map"' | sed 's/"//g'` && \
	sed -i "s,app.js.map,/$$HASHED_MAP," assets/app.js
	$(HASHFILENAME) assets/app.js.map assets/app.js > assets/manifest.json
	sed "s/\"app.js\"/`jq '.\"app.js\"' assets/manifest.json`/" app/index.html > assets/index.html


clean:
	rm -f assets/*
