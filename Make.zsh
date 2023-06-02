# Note: This is a personal Makefile that I use with a private tool called 'my-make'.

out_debug=${this_dir}/out/debug
out_release=${this_dir}/out/release

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
  watchman-make --make my-make -p src template -t build
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
