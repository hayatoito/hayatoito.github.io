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

serve() {
  cd ${out_debug} && my-http-server --watch --port 8000 --open .
}

format() {
  djlint --reformat --indent 2 template/{article,base,page,index}.jinja
}
