# Note: This is my *private* Makefile-ish, used by my Make-ish tool.

out_debug=${this_dir}/out/debug
out_release=${this_dir}/out/release

# Assuming `site`, `watchexec`, and `ghp-import` are installed.
# They all are optional if you use GitHub Action to build.

build() {
  mkdir -p ${out_debug}
  RUST_LOG=site=info site build --root-dir . --config=config.toml --out-dir ${out_debug}
}

build_release() {
  mkdir -p ${out_release}
  RUST_LOG=site=info site build --root-dir . --config=config-release.toml --out-dir ${out_release}
}

git_sync() {
  git init
  git remote add origin git@github.com:hayatoito/hayatoito.github.io.git
  git fetch --filter=blob:none
  git reset origin/main
}

dev() {
  build
  serve &
  watch
}

watch() {
  watchexec --watch src --watch template my-make build
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

# Deprecated: We use GitHub Actions

# Note: ghp-import resets a given {branch} to origin/{branch}, then
# creates a new commit on the top of it.
# deploy_to_gh_pages() {
#   clean_release
#   build_release
#   ghp-import -b gh-pages ${out_release}
# }

# publish() {
#   deploy_to_gh_pages
#   git push origin gh-pages
# }
