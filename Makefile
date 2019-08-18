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

staging: clean-release build-release
	python3 ./ghp-import/ghp_import.py -b staging $(output_release)

update-master: clean-release build-release staging
	python3 ./ghp-import/ghp_import.py -b master $(output_release)

publish: update-master
	git push origin 'master:master'

# publish-force-with-new-master: staging
# 	git push --force origin 'master:master'

push-source:
	git push -u origin source
