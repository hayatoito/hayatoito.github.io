reset

set terminal wxt font "Sans,16" size 960,720

set xlabel "40年後のリターン"
set ylabel "Probability Density（確率密度）"

set xrange [0:20]
set yrange [0:0.2]

year = 40

d(x, mu, sigma) = (log(x) - mu) / sigma

pdf(x, mu, sigma) = exp(-0.5 * d(x, mu, sigma) * d(x, mu, sigma)) / (x * sqrt(2.0 * pi) * sigma)

plot pdf(x, (0.05 * year), (0.05 * sqrt(year))) linewidth 5 title "A", \
     pdf(x, (0.05 * year), (0.20 * sqrt(year))) linewidth 5 title "B"

