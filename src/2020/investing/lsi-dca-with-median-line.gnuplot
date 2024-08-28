reset

set terminal qt font "Sans,16"  size 960,640

set style data histograms
set style fill solid 1.0 border

set xtics 0,50,350
set ytics 0,5000

set xlabel "Value"
set ylabel "Count"

set arrow from 156.3, 0 to 156.3, 8000 nohead lw 5 lc rgb "red" front
set arrow from 129.6, 0 to 129.6, 15000 nohead lw 5 lc rgb "blue" front

plot './lsi.data' using 2 title "LSI (100% x 1)", \
      './dca.data' using 2 title "DCA (10% x 10)"
