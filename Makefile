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

staging: clean-publish build-publish
	python3 ./ghp-import/ghp_import.py -b staging $(output_publish)

publish: staging
	: # git branch -D publish
	python3 ./ghp-import/ghp_import.py -b publish $(output_publish) && \
	git push --force origin 'publish:master'
