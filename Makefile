program ?= site
options ?= -v
output_base ?= $(HOME)/src/build/hayato.io
output_local ?= $(output_base)/local
output_publish ?= $(output_base)/publish

build:
	$(program) $(options) build --root-dir . --config=config-local.toml --out-dir $(output_local)

build-publish:
	$(program) $(options) build --root-dir . --config=config.toml --out-dir $(output_publish)

serve:
	cd $(output_local) && browser-sync start --port 8000 --server --files='*'

clean:
	[[ -d $(output_local) ]] && rm -rf $(output_local)

clean-publish:
	[[ -d $(output_publish) ]] && rm -rf $(output_publish)

ghp-import: clean-publish build-publish
	: # Use 'staging' branch, instead of 'master' branch, because 'master' will inherit from origin/master, unfortunately.
	: # git branch -D publish
	python3 ./ghp-import/ghp_import.py -b publish $(output_publish)
	: # python3 ./ghp-import/ghp_import.py -b release $(output_publish)

publish: ghp-import
	git push --force origin 'publish:master'
