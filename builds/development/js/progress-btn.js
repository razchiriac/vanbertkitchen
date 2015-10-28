(function(window) {

  'use strict';

  // class helper functions from bonzo https://github.com/ded/bonzo

  function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  }

  // classList support for class management
  // altho to be fair, the api sucks because it won't accept multiple classes at once
  var hasClass, addClass, removeClass;

  if ('classList' in document.documentElement) {
    hasClass = function(elem, c) {
      return elem.classList.contains(c);
    };
    addClass = function(elem, c) {
      elem.classList.add(c);
    };
    removeClass = function(elem, c) {
      elem.classList.remove(c);
    };
  } else {
    hasClass = function(elem, c) {
      return classReg(c).test(elem.className);
    };
    addClass = function(elem, c) {
      if (!hasClass(elem, c)) {
        elem.className = elem.className + ' ' + c;
      }
    };
    removeClass = function(elem, c) {
      elem.className = elem.className.replace(classReg(c), ' ');
    };
  }

  function toggleClass(elem, c) {
    var fn = hasClass(elem, c) ? removeClass : addClass;
    fn(elem, c);
  }

  var classie = {
    // full names
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass,
    // short names
    has: hasClass,
    add: addClass,
    remove: removeClass,
    toggle: toggleClass
  };

  // transport
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(classie);
  } else {
    // browser global
    window.classie = classie;
  }

  var transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
    support = {
      transitions: Modernizr.csstransitions
    };

  function extend(a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function SVGEl(el) {
    this.el = el;
    // the path elements
    this.paths = [].slice.call(this.el.querySelectorAll('path'));
    // we will save both paths and its lengths in arrays
    this.pathsArr = new Array();
    this.lengthsArr = new Array();
    this._init();
  }

  SVGEl.prototype._init = function() {
    var self = this;
    this.paths.forEach(function(path, i) {
      self.pathsArr[i] = path;
      path.style.strokeDasharray = self.lengthsArr[i] = path.getTotalLength();
    });
    // undraw stroke
    this.draw(0);
  }

  // val in [0,1] : 0 - no stroke is visible, 1 - stroke is visible
  SVGEl.prototype.draw = function(val) {
    for (var i = 0, len = this.pathsArr.length; i < len; ++i) {
      this.pathsArr[i].style.strokeDashoffset = this.lengthsArr[i] * (1 - val);
    }
  }

  function UIProgressButton(el, options) {
    this.el = el;
    this.options = extend({}, this.options);
    extend(this.options, options);
    this._init();
  }

  UIProgressButton.prototype.options = {
    // time in ms that the status (success or error will be displayed) - should be at least higher than the transition-duration value defined for the stroke-dashoffset transition of both checkmark and cross strokes
    statusTime: 1500
  }

  UIProgressButton.prototype._init = function() {
    // the button
    this.button = this.el.querySelector('button');
    // progress el
    this.progressEl = new SVGEl(this.el.querySelector('svg.progress-circle'));
    // the success/error elems
    this.successEl = new SVGEl(this.el.querySelector('svg.checkmark'));
    this.errorEl = new SVGEl(this.el.querySelector('svg.cross'));
    // init events
    this._initEvents();
    // enable button
    this._enable();
  }

  UIProgressButton.prototype._initEvents = function() {
    var self = this;
    this.button.addEventListener('click', function() {
      self._submit();
    });
  }

  UIProgressButton.prototype._submit = function() {
    // by adding the loading class the button will transition to a "circle"
    classie.addClass(this.el, 'loading');

    var self = this,
      onEndBtnTransitionFn = function(ev) {
        if (support.transitions) {
          if (ev.propertyName !== 'width') return false;
          this.removeEventListener(transEndEventName, onEndBtnTransitionFn);
        }

        // disable the button - this should have been the first thing to do when clicking the button.
        // however if we do so Firefox does not seem to fire the transitionend event.
        this.setAttribute('disabled', '');

        if (typeof self.options.callback === 'function') {
          self.options.callback(self);
        } else {
          // fill it (time will be the one defined in the CSS transition-duration property)
          self.setProgress(1);
          self.stop();
        }
      };

    if (support.transitions) {
      this.button.addEventListener(transEndEventName, onEndBtnTransitionFn);
    } else {
      onEndBtnTransitionFn();
    }
  }

  // runs after the progress reaches 100%
  UIProgressButton.prototype.stop = function(status) {
    var self = this,
      endLoading = function() {
        // first undraw progress stroke.
        self.progressEl.draw(0);

        if (typeof status === 'number') {
          var statusClass = status >= 0 ? 'success' : 'error',
            statusEl = status >= 0 ? self.successEl : self.errorEl;

          // draw stroke of success (checkmark) or error (cross).
          statusEl.draw(1);
          // add respective class to the element
          classie.addClass(self.el, statusClass);
          // after options.statusTime remove status and undraw the respective stroke. Also enable the button.
          setTimeout(function() {
            classie.remove(self.el, statusClass);
            statusEl.draw(0);
            self._enable();
          }, self.options.statusTime);
        } else {
          self._enable();
        }
        // finally remove class loading.
        classie.removeClass(self.el, 'loading');
      };

    // give it a time (ideally the same like the transition time) so that the last progress increment animation is still visible.
    setTimeout(endLoading, 300);
  }

  UIProgressButton.prototype.setProgress = function(val) {
    this.progressEl.draw(val);
  }

  // enable button
  UIProgressButton.prototype._enable = function() {
    this.button.removeAttribute('disabled');
  }

  // add to global namespace
  window.UIProgressButton = UIProgressButton;

})(window);

[].slice.call(document.querySelectorAll('.progress-button')).forEach(function(bttn, pos) {
  new UIProgressButton(bttn, {
    callback: function(instance) {
      var progress = 0,
        interval = setInterval(function() {
          progress = Math.min(progress + Math.random() * 0.1, 1);
          instance.setProgress(progress);

          if (progress === 1) {
            instance.stop(pos === 1 || pos === 3 ? -1 : 1);
            clearInterval(interval);
          }
        }, 150);
    }
  });
});
