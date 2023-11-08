reset

set terminal qt font "Sans,16"  size 960,720

set xlabel "Leverage"
set ylabel "Return"
set format x "x %g"
set format y "%g%%"

set xrange [0:3]

u = 0.05
d = 0.20

f(x) = (exp(x * u - (x ** 2) * (d ** 2) / 2.0) - 1.0) * 100

plot f(x) linewidth 5 title ""
