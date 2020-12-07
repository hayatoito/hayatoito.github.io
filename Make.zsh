#!/bin/zsh

out_debug=out/debug
out_release=out/release

build() {
  local site_options=${1:--v}
  site ${site_options} build --root-dir . --config=config.toml --out-dir ${out_debug}
}

build_release() {
  local site_options=${1:--v}
  site ${site_options} build --root-dir . --config=config-release.toml --out-dir ${out_release}
}

watch() {
  watchexec --watch src --watch template zsh Make.zsh build
}

serve() {
  cd ${out_debug} && browser-sync start --port 8000 --server --files='*'
}

clean() {
  [[ -d ${out_debug} ]] && rm -rf ${out_debug} || true
}

clean_release() {
  [[ -d ${out_release} ]] && rm -rf ${out_release} || true
}

# Note: ghp-import resets a given {branch} to origin/{branch}, then
# creates a new commit on the top of it.
deploy_to_gh_pages() {
  clean_release
  build_release
  python3 ./ghp-import/ghp_import.py -b gh-pages ${out_release}
}

publish() {
  deploy_to_gh_pages
  git push origin gh-pages
}

squash_gh_pages_history() {
  return 1  # To avoid accidental update
  local revision=$1
  : # Reset origin/master to a previous commit
  git update-ref refs/remotes/origin/gh-pages ${revision}
  : # Make a new commit on the top of origin/master
  deploy_to_gh_pages
  : # '--force' is required because remote's gh-pages is discarded.
  git push --force origin gh-pages
}

if ! [[ ${ZSH_EVAL_CONTEXT} =~ :file$ ]]; then
  setopt err_exit xtrace
  $@
fi
