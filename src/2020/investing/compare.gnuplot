reset

set terminal qt font "Sans,16"  size 960,720

set xlabel "Return in 40 years"
set ylabel "Probability Density"

set xrange [0:20]
set yrange [0:0.2]

sqrt_2pi =

year = 40

d(x, mu, sigma) = (log(x) - mu) / sigma

pdf(x, mu, sigma) = exp(-0.5 * d(x, mu, sigma) * d(x, mu, sigma)) / (x * sqrt(2.0 * pi) * sigma)

plot pdf(x, (0.05 * year), (0.20 * sqrt(year))) linewidth 5  title "High risk", \
   pdf(x, (0.05 * year), (0.05 * sqrt(year))) linewidth 5 title "Low risk"
