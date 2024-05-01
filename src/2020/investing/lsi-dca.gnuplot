reset

set terminal qt font "Sans,16"  size 960,640

set style data histograms
set style fill solid 1.0 border

set xtics 0,50,350
set ytics 0,5000

set xlabel "Value"
set ylabel "Count"

plot './lsi.data' using 2 title "LSI (100% x 1)", \
      './dca.data' using 2 title "DCA (10% x 10)"
