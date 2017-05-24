'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Session = function Session(_ref) {
  var minutes = _ref.minutes,
      index = _ref.index,
      resolveUrl = _ref.resolveUrl;

  _classCallCheck(this, Session);

  this.minutes = minutes;
  this.index = index;
  this.name = 'session-' + index;
  if (this.index % 2 === 0) {
    this.type = 'work';
  } else {
    this.type = 'break';
  }
  if (this.type === 'work') {
    this.message = 'Time to work [#' + (this.index / 2 + 1) + '] (' + this.minutes + ' min)';
    this.icon = resolveUrl('./assets/cappuccino-1.png');
    this.audio = resolveUrl('./assets/ringtone_playtime.mp3');
    this.title = '[#' + (this.index / 2 + 1) + '] (' + this.minutes + ' min)';
    this.favicon = this.icon;
  } else {
    this.message = 'Time to break (' + this.minutes + ' min)';
    this.icon = resolveUrl('./assets/cappuccino-2.png');
    this.audio = resolveUrl('./assets/ringtone_twinkle.mp3');
    this.title = '[break] (' + this.minutes + ' min)';
    this.favicon = this.icon;
  }
};

var Util = function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, null, [{
    key: 'favicon',
    value: function favicon() {
      return document.querySelector('link[rel="shortcut icon"]');
    }
  }, {
    key: 'setFavicon',
    value: function setFavicon(icon) {
      if (Util.favicon()) {
        Util.favicon().setAttribute('href', icon);
      }
    }
  }, {
    key: 'setTitle',
    value: function setTitle(title) {
      var e = document.querySelector('title');
      if (e) {
        e.innerText = title;
      }
    }
  }, {
    key: 'ceilBySecond',
    value: function ceilBySecond(ms) {
      return Math.ceil(ms / 1000) * 1000;
    }
  }, {
    key: 'zfill',
    value: function zfill(num) {
      if (num < 10) {
        return '0' + num;
      }
      return num;
    }
  }, {
    key: 'formatTime',
    value: function formatTime(remaining) {
      var seconds = Math.ceil(remaining / 1000);
      return {
        mm: Math.floor(seconds / 60),
        ss: Util.zfill(seconds % 60)
      };
    }
  }, {
    key: 'notificationPermissionAllowed',
    value: function notificationPermissionAllowed() {
      return window.Notification && window.Notification.permission === 'granted';
    }
  }]);

  return Util;
}();

var PomodoroTimer = function () {
  function PomodoroTimer() {
    _classCallCheck(this, PomodoroTimer);
  }

  _createClass(PomodoroTimer, [{
    key: 'beforeRegister',
    value: function beforeRegister() {
      this.is = 'pomodoro-timer';
      this.properties = {
        durations: {
          type: Array,
          value: [25, 5, 25, 5, 25, 5, 25, 20],
          observer: '_durationsChanged'
        },
        mute: {
          type: Boolean,
          value: false
        },
        repeat: {
          type: Boolean,
          value: false
        },
        autostart: {
          type: Boolean,
          value: false
        }
      };
    }
  }, {
    key: 'attached',
    value: function attached() {
      this.timeMM = '25';
      this.timeSS = '00';
      this.startOrPauseIcon = 'av:play-arrow';
      this.sessionTimer = null;
      this.refreshTimer = null;
      this.initSessions();
      this.audio = null;
      this.notification = null;
      this.finished = false;
    }
  }, {
    key: 'initSessions',
    value: function initSessions() {
      this.sessions = this.durations.map(function (minutes, index) {
        return new Session({
          minutes: minutes,
          index: index,
          // resolveUrl: (url) => this.resolveUrl(url)});
          // Work around: After valcunize, this.resolveURL(), utility function provided by Polymer,
          // returns thw unexpected url, such as http://xxx:port/path
          resolveUrl: function resolveUrl(url) {
            return url;
          }
        });
      });
      this.currentSession = this.sessions[0];
      this.reset();
      this.startTime = null;
      if (this.autostart) {
        this.start();
      }
    }
  }, {
    key: '_durationsChanged',
    value: function _durationsChanged(_newValue, _oldValue) {
      this.initSessions();
      this.reset();
    }
  }, {
    key: 'sessionMinutes',
    value: function sessionMinutes() {
      return this.currentSession.minutes;
    }
  }, {
    key: 'isSessionBeginning',
    value: function isSessionBeginning() {
      return this.remaining === this.sessionMinutes() * 60 * 1000;
    }
  }, {
    key: 'startOrPause',
    value: function startOrPause() {
      if (this.isTimerRunning()) {
        this.pauseTimer();
      } else {
        if (this.isSessionBeginning()) {
          this.notifySessionStart(this.currentSession);
        }
        this.start();
      }
    }
  }, {
    key: 'start',
    value: function start() {
      var _this = this;

      console.assert(this.sessionTimer == null);
      console.assert(this.refreshTimer == null);
      this.requestNotificationPermission();
      this.startTime = Date.now();
      // See http://stackoverflow.com/questions/591269/settimeout-and-this-in-javascript
      this.sessionTimer = window.setTimeout(function () {
        return _this.sessionEnd();
      }, this.remaining);
      // window.requestAnnimationFrame(..) cat not be used here because we are
      // also updating the title and favicon.
      this.refreshTimer = window.setInterval(function () {
        return _this.refresh();
      }, 100);
      this.startOrPauseIcon = 'av:pause';
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.draw();
    }
  }, {
    key: 'pauseTimer',
    value: function pauseTimer() {
      this.closeNotification();
      this.stopUpdate();
      var passed = Date.now() - this.startTime;
      this.remaining = Util.ceilBySecond(this.remaining - passed);
      this.startOrPauseIcon = 'av:play-arrow';
      this.draw();
    }
  }, {
    key: 'isTimerRunning',
    value: function isTimerRunning() {
      return this.sessionTimer != null;
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.closeNotification();
      this.startOrPauseIcon = 'av:play-arrow';
      this.resetTime();
    }
  }, {
    key: 'resetTime',
    value: function resetTime() {
      this.stopUpdate();
      this.remaining = this.sessionMinutes() * 60 * 1000;
      this.draw();
    }
  }, {
    key: 'stopUpdate',
    value: function stopUpdate() {
      if (this.sessionTimer) {
        window.clearTimeout(this.sessionTimer);
        this.sessionTimer = null;
      }
      if (this.refreshTimer) {
        window.clearInterval(this.refreshTimer);
        this.refreshTimer = null;
      }
    }
  }, {
    key: 'sessionEnd',
    value: function sessionEnd() {
      if (this.currentSession.index + 1 === this.sessions.length) {
        this.notifyAllSessionEnded();
        this.stopUpdate();
        // TODO: Use resolveUrl.
        Util.setFavicon('./assets/chocolate-heart.png');
        this.currentSession = this.sessions[0];
        this.resetTime();
        this.startOrPauseIcon = 'av:play-arrow';
        if (this.repeat) {
          this.start();
        }
      } else {
        this.currentSession = this.sessions[this.currentSession.index + 1];
        this.notifySessionStart(this.currentSession);
        this.resetTime();
        this.start();
      }
    }
  }, {
    key: 'selectSession',
    value: function selectSession(e) {
      this.currentSession = e.model.item;
      this.reset();
    }
  }, {
    key: 'isSessionRunning',
    value: function isSessionRunning() {
      return this.isTimerRunning() || this.remaining !== this.sessionMinutes() * 60 * 1000;
    }
  }, {
    key: 'draw',
    value: function draw() {
      var remaining = this.isTimerRunning() ? this.remaining - (Date.now() - this.startTime) : this.remaining;

      var _Util$formatTime = Util.formatTime(remaining),
          mm = _Util$formatTime.mm,
          ss = _Util$formatTime.ss;

      this.timeMM = mm;
      this.timeSS = ss;
      if (this.isSessionRunning()) {
        Util.setFavicon(this.currentSession.favicon);
      } else {
        Util.setFavicon('./assets/chocolate-heart.png');
      }
      var sign = this.isSessionRunning() && !this.isTimerRunning() ? '❚❚ ' : '';
      Util.setTitle('' + sign + mm + ':' + ss + ' ' + this.currentSession.title);
    }
  }, {
    key: 'notifySessionStart',
    value: function notifySessionStart(session) {
      this.notify(session);
    }
  }, {
    key: 'notifyAllSessionEnded',
    value: function notifyAllSessionEnded() {
      this.notify({
        message: 'All sessions Done',
        // icon: this.resolveUrl('./chocolate-heart.png'),
        // audio: this.resolveUrl('./sweetest_tone_ever.mp3')});
        icon: './assets/chocolate-heart.png',
        audio: './assets/sweetest_tone_ever.mp3'
      });
    }
  }, {
    key: 'requestNotificationPermission',
    value: function requestNotificationPermission() {
      if (this.mute) {
        return;
      }
      if (Util.notificationPermissionAllowed()) {
        return;
      }
      window.Notification.requestPermission(function (permission) {
        if (!('permission' in window.Notification)) {
          window.Notification.permission = permission;
        }
        if (Util.notificationPermissionAllowed()) {
          console.debug('Notification Permission is granted.');
        } else {
          console.debug('Notification Permission is denied.');
        }
      });
    }
  }, {
    key: 'notify',
    value: function notify(_ref2) {
      var _this2 = this;

      var message = _ref2.message,
          icon = _ref2.icon,
          audio = _ref2.audio;

      if (this.mute) {
        return;
      }
      if (!Util.notificationPermissionAllowed()) {
        return;
      }
      this.closeNotification();
      try {
        (function () {
          var notification = new window.Notification(message, { icon: icon });
          setTimeout(function () {
            notification.close();
          }, 16 * 1000);
          _this2.notification = notification;
          if (audio) {
            (function () {
              var thisAudio = new window.Audio(audio);
              _this2.audio = thisAudio;
              _this2.audio.play();
              notification.onclick = function () {
                return thisAudio.pause();
              };
            })();
          }
        })();
      } catch (e) {
        console.log('new window.Notification(...) or new window.Audio(...) is not supported?', e);
      }
    }
  }, {
    key: 'closeNotification',
    value: function closeNotification() {
      if (!window.Notification) {
        return;
      }
      if (this.audio) {
        this.audio.pause();
        this.audio = null;
      }
      if (this.notification) {
        this.notification.close();
        this.notification = null;
      }
    }
  }]);

  return PomodoroTimer;
}();

/* eslint new-cap: "off" */


Polymer(PomodoroTimer);
