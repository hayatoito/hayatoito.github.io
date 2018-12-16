<!--
title: Simple timer application for the pomodoro technique
date: 2014-02-02
-->

**Update** (2016-03-22 Tue): I have rewritten the timer application. This
document is still using the old screen captures.

---

I've created a simple [timer application] for [the pomodoro technique]. You can
use the timer here, <https://hayato.io/timer/>.

[timer application]: /timer/
[the pomodoro technique]: http://pomodorotechnique.com/

![timer](./timer.png)

It seems that there are a lot of timer applications for the pomodoro technique,
however, I couldn't find any timer which fits me.

I need a simple, tiny, easy-to-customize, non-distractive and web-based timer.
Therefore, I made it.

# Requirements

- Modern browsers.

# Features

- In addtion of the page, the title of the browser's tab also shows the
  progress.

  ![notification](./timer-title.png)

* Desktop notifications with sounds (only if a browser supports).

  ![notification](./timer-notification.png)

* Specialized for the pomodoro technique. Pre-set timers are:

  1.  `25` min
  2.  `5` min (short break)
  3.  `25` min
  4.  `5` min (short break)
  5.  `25` min
  6.  `5` min (short break)
  7.  `25` min
  8.  `20` min (long break)

# Customize

You can customise the timer by URL's request parameters.

- `t` - Comma separated timer periods.

  Example: <http://hayato.io/timer/?t=50,10,50,10>

  In this case, timers are set to 50 min, 10 min, 50 min and 10 min.

  ![parameter-t](./timer-t.png)

- `mute` - Turn the notification off.

  Example: <http://hayato.io/timer/?mute=1>

  ![parameter-mute](./timer-mute.png)

- `autostart` - Auto start the timer after the page is loaded.

  Example: <http://hayato.io/timer/?autostart=1>

- `repeat` - Repeat the timers.

  Example: <http://hayato.io/timer/?repeat=1>

  ![parameter-repeat](./timer-repeat.png)

- `zen` - Enable _zen_ mode. Try it. :)

  Example: <http://hayato.io/timer/?zen=1>

You can mix the parameters freely, such as
<http://hayato.io/timer/?t=50,10,50,10,50,30&autostart=1&repeat=1>

# Future Plan

- More customize.

  - Sounds, Icons.
