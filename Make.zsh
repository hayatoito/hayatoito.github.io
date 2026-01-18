# Note: This is a personal Makefile that I use with a private tool called 'my-make'.

out_debug=./out/debug
out_release=./out/release

update_dev() {
  cargo binstall site
}

build() {
  mkdir -p ${out_debug}
  # RUST_LOG=site for verbose.
  site build --root . --config=config.toml --out ${out_debug}
}

build_release() {
  mkdir -p ${out_release}
  site build --root . --config=config-release.toml --out ${out_release}
}

start() {
  cd ${out_debug} && my-http-server --watch . --port 8000 --open .
}

format() {
  uvx djlint --reformat --indent 2 template/{article,base,page,index}.jinja
}

watch() {
  my-watch --run 'env RUST_LOG=info my-make build' src template
}

start_and_watch() {
  start &
  watch
}
