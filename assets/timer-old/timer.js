$(document).ready(function() {

    var themes = {
        default: {
            workRingtone: '/static/timer/ringtone_playtime.mp3',
            breakRingtone: '/static/timer/ringtone_twinkle.mp3',
            finishedRingtone: '/static/timer/sweetest_tone_ever.mp3',
            workIcon: '/static/timer/cappuccino-1.png',
            breakIcon: '/static/timer/cappuccino-2.png',
            finishedIcon: '/static/timer/chocolate-heart.png',
            workFavicon: '/static/timer/cappuccino-1.png',
            breakFavicon: '/static/timer/cappuccino-2.png',
            finishedFavicon: '/static/timer/chocolate-heart.ico',
            favicon: $('#favicon').attr('href')
        }
    };

    var theme;

    var sessions;
    var currentSession;

    var sessionTimer;
    var intervalTimer;

    var startStopButton = $("#timer-start-stop");
    var pauseResumeButton = $("#timer-pause-resume");
    var volumeButton = $('#timer-volume');
    var repeatButton = $('#timer-repeat');

    var intervals = [25, 5, 25, 5, 25, 5, 25, 20];
    var startTime = 0;
    var ellapsed = 0;
    var finished = false;

    var repeat;
    var audio;
    var mute;
    var notification = null;

    var config;

    function getUrlVars() {
        var vars = {};
        var params = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        params.forEach(function(param) {
            var kv = param.split('=');
            vars[kv[0]] = kv[1];
        });
        return vars;
    }

    function now() {
        return Date.now();
    }

    function initializeSessions() {
        var totalMinutes = 0;
        sessions = intervals.map(function(interval) {
            totalMinutes += interval;
            return {minutes: interval};
        });
        sessions.forEach(function(session, index) {
            session.index = index;
            if (index % 2 == 0) {
                session.isBreak = false;
            } else {
                session.isBreak = true;
            }

        });
        sessions.forEach(function(session) {
            var progress = $('<div></div>').addClass('progress');
            var bar = $('<div></div>').addClass('progress-bar progress-bar-info')
                    .attr('role', 'progressbar').attr('aria-valuenow', '0').attr('aria-valuemin', 0).attr('aria-valuemax', 100)
                    .width('0%');
            progress.append(bar);
            session.progress = progress;
            session.bar = bar;
            session.badge = $('<small></small>').addClass('timer-minutes').text(session.minutes);
        });
    }

    function initializeUI() {
        var row;
        sessions.forEach(function(session) {
            var minutes = $('<div></div>').addClass('col-xs-1')
                    .addClass('timer-minutes-column').addClass('text-right')
                    .append(session.badge);
            if (!session.isBreak) {
                row = $('<div></div>').addClass('row')
                    .append($('<div></div>').addClass('col-xs-1'))
                    .append(minutes)
                    .append($('<div></div>').addClass('col-xs-5').addClass('timer-progress-column')
                            .append(session.progress));
                $('#timer-sessions').append(row);
            } else {
                row.append(minutes).append(
                    $('<div></div>').addClass('col-xs-2')
                        .addClass('timer-progress-column').addClass('text-right')
                        .append(session.progress));
            }
        });
        updateTime(sessions[0].minutes * 60);

        startStopButton.click(function() {
            notificationRequestPermission();
            stopAudio();
            if (finished) {
                finished = false;
                updateTime(sessions[0].minutes * 60);
                updateUI();
            } else if (currentSession) {
                stopTimer();
            } else {
                startTimer();
            }
        });
        pauseResumeButton.click(function() {
            stopAudio();
            if (running()) {
                pauseTimer();
            } else {
                resumeTimer();
            }
        });
        volumeButton.click(function() {
            if (!mute) {
                stopAudio();
            }
            mute = !mute;
            updateUI();
        });
        repeatButton.click(function() {
            repeat = !repeat;
            updateUI();
        });
    }

    function updateUI() {
        if (!finished) {
            sessions.forEach(function(session) {
                if (!currentSession || session.index > currentSession.index) {
                    updateProgressBar(session, 0);
                }
            });
        }
        sessions.forEach(function(session) {
            if (session === currentSession) {
                session.progress.addClass('progress-striped').addClass('active');
                session.badge.addClass('active');
            } else {
                session.progress.removeClass('progress-striped').removeClass('active');
                session.badge.removeClass('active');
            }
        });

        function updateButton(button, icon, text) {
            button.html('');
            button.append($('<span></span').addClass('glyphicon').addClass(icon))
                .append($('<span></span>').text(' ' + text));
        }

        function startButton() {
            updateButton(startStopButton, 'glyphicon-play', 'Start');
        }

        function doneButton() {
            updateButton(startStopButton, 'glyphicon-stop', 'Done');
        }

        function resetButton() {
            updateButton(startStopButton, 'glyphicon-refresh', 'Reset');
        }

        function pauseButton() {
            updateButton(pauseResumeButton, 'glyphicon-pause', 'Pause');
        }

        function resumeButton() {
            updateButton(pauseResumeButton, 'glyphicon-play', 'Resume');
        }

        if (finished) {
            resetButton();
            pauseButton();
            pauseResumeButton.attr('disabled', 'disabled');
        } else if (!currentSession) {
            startButton();
            pauseButton();
            pauseResumeButton.attr("disabled", "disabled");
        } else if (running()) {
            doneButton();
            pauseButton();
            pauseResumeButton.removeAttr("disabled");
        } else {
            doneButton();
            resumeButton();
            pauseResumeButton.removeAttr("disabled");
        }
        volumeButton.removeClass('glyphicon-volume-off').removeClass('glyphicon-volume-up')
            .removeClass('off');
        if (mute) {
            volumeButton.addClass('off');
            volumeButton.addClass('glyphicon-volume-off');
        } else {
            volumeButton.addClass('glyphicon-volume-up');
        }
        repeatButton.removeClass('off');
        if (!repeat) {
            repeatButton.addClass('off');
        }
    }

    function updateProgressBar(session, percentage) {
        if (!session) {
            return;
        }
        session.bar.attr("aria-valuenow", percentage);
        session.bar.width(percentage + "%");
    }

    function percentage(num, total) {
        return Math.floor(100 * num / total);
    }

    function zfill(num) {
        if (num < 10) {
            return "0" + num;
        }
        return num;
    }

    function updateTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var timeString = zfill(minutes) + ':' + zfill(seconds % 60);
        $("#timer-time").text(timeString);
        var titleMessage;
        if (finished) {
            titleMessage = "Done";
        } else if (currentSession) {
            if (currentSession.isBreak) {
                titleMessage = timeString + ' [break] (' + currentSession.minutes + ' mins)';
            } else {
                titleMessage = timeString + ' [#' + (currentSession.index / 2 + 1) + '] (' + currentSession.minutes + ' mins)';
            }
        } else {
            titleMessage = "Timer";
        }
        $('title').text(titleMessage);
    }

    function setFavicon(favicon) {
        $('#favicon').attr('href', favicon);
    }

    function updateCurrentSessionUI() {
        if (running()) {
            if (currentSession.isBreak) {
                setFavicon(theme.breakFavicon);
                $('#timer-time').addClass('break');
            } else {
                setFavicon(theme.workFavicon);
                $('#timer-time').removeClass('break');
            }
        } else if (finished) {
            setFavicon(theme.finishedFavicon);
            $('#timer-time').removeClass('break');
        } else {
            setFavicon(theme.favicon);
            $('#timer-time').removeClass('break');
        }
    }

    function notificationRequestPermission() {
        function permissionAllowed() {
            return Notification.permission == "granted";
        }
        if (permissionAllowed()) {
            return;
        }
        Notification.requestPermission(function(permission){
            if (!('permission' in Notification)) {
                Notification.permission = permission;
            }
            if (permissionAllowed()) {
                console.debug('Notification Permission is granted.');
            } else {
                console.debug('Notification Permission is denied.');
            }
        });
    }

      function stopAudio() {
        if (audio) {
            audio.pause();
            audio = null;
        }
    }

    function playAudio(audiofile) {
        stopAudio();
        audio = new Audio(audiofile);
        audio.play();
        return audio;
    }

    function hideNotification(notification) {
        if (notification != null) {
            notification.close();
            notification = null;
        }
    }

    function ringtone(session) {
        if (session) {
            if (session.isBreak) {
                return theme.breakRingtone;
            } else {
                return theme.workRingtone;
            }
        } else {
            return theme.finishedRingtone;
        }
    }

    function icon(session) {
        if (session) {
            if (session.isBreak) {
                return theme.breakIcon;
            } else {
                return theme.workIcon;
            }
        } else {
            return theme.finishedIcon;
        }
    }

    function notify(nextSession) {
        var title;
        if (nextSession) {
            if (nextSession.isBreak) {
                title = 'Time to break (' + nextSession.minutes + ' minutes)';
            } else {
                title = 'Time to work #' + (nextSession.index / 2 + 1) + ' (' + nextSession.minutes + ' minutes)' ;
            }
        } else {
            title = 'Timer Done';
        }
        if (!mute) {
            var thisAudio = playAudio(ringtone(nextSession));
        }
        if (Notification) {
            hideNotification(notification);
            notification = new Notification(title, {icon: icon(nextSession)});
            var thisNotification = notification;
            setTimeout(function() {
                hideNotification(thisNotification);
            }, 16 * 1000);
            if (thisAudio) {
                thisNotification.onclick = function() {
                    thisAudio.pause();
                };
            }
        }
    }

    function nextSession() {
        updateProgressBar(currentSession, 100);
        ellapsed = 0;
        if (repeat) {
            currentSession = sessions[(currentSession.index + 1) % sessions.length];
        } else {
            currentSession = sessions[(currentSession.index + 1)];
        }
        notify(currentSession);
        if (currentSession) {
            updateTime(currentSession.minutes * 60);
            startTimer();
        } else {
            finished = true;
            clearTimer();
            updateTime(0);
            ellapsed = 0;
            updateUI();
        }
    }

    function updateInterval() {
        var diff = now() - startTime;
        updateProgressBar(currentSession, percentage(diff, currentSession.minutes * 60 * 1000));
        var leftSeconds = Math.round((currentSession.minutes * 60 * 1000 - diff) / 1000);
        updateUI();
        updateTime(leftSeconds);
    }

    function draw() {
        if (!running()) {
            return;
        }
        var diff = now() - startTime;
        updateProgressBar(currentSession, percentage(diff, currentSession.minutes * 60 * 1000));
        requestAnimationFrame(draw);
    }

    function running() {
        return sessionTimer != null;
    }

    function clearTimer() {
        if (sessionTimer) {
            clearTimeout(sessionTimer);
            sessionTimer = null;
        }
        if (intervalTimer) {
            clearInterval(intervalTimer);
            intervalTimer = null;
        }
        updateCurrentSessionUI();
    }

    function startTimer() {
        clearTimer();
        if (!currentSession) {
            currentSession = sessions[0];
        }
        finished = false;
        startTime = now();
        sessionTimer = setTimeout(nextSession, currentSession.minutes * 60 * 1000 - ellapsed);
        intervalTimer = setInterval(updateInterval, 1000);
        requestAnimationFrame(draw);
        updateUI();
        updateCurrentSessionUI();
    }

    function stopTimer() {
        clearTimer();
        ellapsed = 0;
        updateProgressBar(currentSession, 0);
        currentSession = null;
        updateTime(sessions[0].minutes * 60);
        updateUI();
        updateCurrentSessionUI();
    }

    function pauseTimer() {
        clearTimer();
        ellapsed = now() - startTime;
        updateUI();
        updateCurrentSessionUI();
    }

    function resumeTimer() {
        startTime = now() - ellapsed;
        sessionTimer = setTimeout(nextSession, currentSession.minutes * 60 * 1000 - ellapsed);
        intervalTimer = setInterval(updateInterval, 1000);
        requestAnimationFrame(draw);
        updateUI();
        updateCurrentSessionUI();
    }

    function init() {
        config = getUrlVars();
        theme = themes[config['theme'] || 'default'];
        mute = config['mute'];
        if (config['t']) {
            intervals = config['t'].split(',').map(function(n) {
                return parseFloat(n);
            }).filter(function(n) {
                return !isNaN(n);
            });
        }
        if (config['repeat']) {
            $('#timer-repeat').show();
            repeat = true;
        } else {
            $('#timer-repeat').hide();
        }

        initializeSessions();
        initializeUI();
        updateUI();

        if (config['autostart']) {
            startTimer();
        }
    }

    init();

});
