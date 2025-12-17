reset

# set terminal wxt font "Sans,16" size 960,720
set terminal wxt font "Sans,16" size 800,500

set key top reverse Left
set ytics 500

set yrange [0:1600]
set xlabel "[年数]"
set ylabel "[単位:万円]"

set style data histograms

set boxwidth 0.7
# set style fill solid 0.20 border
set style fill solid 1.0 border

# Histograms uses column '0' as x.

plot 'ee97.data' skip 1 using 2:xtic(1) title "A: 分配金なしの投資信託", \
     '' skip 1 using 3 title "B: 配当再投資や短期売買"
