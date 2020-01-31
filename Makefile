options ?= -v
output ?= $(HOME)/src/build/hayatoito.github.io
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
deploy-to-master: clean-release build-release
	python3 ./ghp-import/ghp_import.py -b master $(output_release)

publish: deploy-to-master
	git push origin master

squash-master-history:
	exit 1  # To avoid accidental update
	: # Reset origin/master to a previous commit
	git update-ref refs/remotes/origin/master <revision>
	: # Make a new commit on the top of origin/master
	make deploy-to-master
	: # '--force' is required because remote's master is discarded.
	git push --force origin master

push-source:
	git push -u origin source
