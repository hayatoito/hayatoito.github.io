# Note: This is a personal Makefile that I use with a private tool called 'my-make'.

out_debug=./out/debug
out_release=./out/release

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
  watchman-make -p 'src/**' 'template/**' --make my-make -t build
}

serve() {
  cd ${out_debug} && my-http-server-watch --watch --port 8000
}

clean() {
  [[ -d ${out_debug} ]] && rm -rf ${out_debug} || true
}

clean_release() {
  [[ -d ${out_release} ]] && rm -rf ${out_release} || true
}
