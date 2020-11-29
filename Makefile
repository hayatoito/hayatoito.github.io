options ?= -v
output ?= ./out
output_debug ?= $(output)/debug
output_release ?= $(output)/release

build:
	site $(options) build --root-dir . --config=config.toml --out-dir $(output_debug)

build-release:
	site $(options) build --root-dir . --config=config-release.toml --out-dir $(output_release)

watch:
	watchexec --watch src --watch template make build

serve:
	cd $(output_debug) && browser-sync start --port 8000 --server --files='*'

clean:
	[[ -d $(output_debug) ]] && rm -rf $(output_debug) || true

clean-release:
	[[ -d $(output_release) ]] && rm -rf $(output_release) || true

# Note: ghp-import resets a given {branch} to origin/{branch}, then
# creates a new commit on the top of it.
deploy-to-gh-pages: clean-release build-release
	python3 ./ghp-import/ghp_import.py -b gh-pages $(output_release)

publish: deploy-to-gh-pages
	git push origin gh-pages

squash-gh-pages-history:
	exit 1  # To avoid accidental update
	: # Reset origin/master to a previous commit
	git update-ref refs/remotes/origin/gh-pages <revision>
	: # Make a new commit on the top of origin/master
	make deploy-to-gh-pages
	: # '--force' is required because remote's gh-pages is discarded.
	git push --force origin gh-pages

.PHONY: build
