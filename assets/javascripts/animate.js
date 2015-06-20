(function() {
  (function($, window, document) {
    var AnimateCss, defaults, transitionEnd;
    transitionEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    defaults = {
      effect: null,
      duration: 0.5,
      delay: 0,
      queue: false,
      done: $.noop
    };
    AnimateCss = (function() {
      function AnimateCss($el1, options) {
        this.$el = $el1;
        this.settings = $.extend({}, defaults, options);
        this._transitionEnd = transitionEnd;
        this.init();
      }

      AnimateCss.prototype.init = function() {
        if (this.settings.queue) {
          this.$el.queue(this.start.bind(this));
        } else {
          this.start();
        }
      };

      AnimateCss.prototype.start = function() {
        var $el;
        $el = this.$el;
        this.$el.one(this._transitionEnd, this.end.bind(this));
        this.setAttributes(this.settings.duration + "s", this.settings.delay + "s");
        return this.$el.addClass("animated " + this.settings.effect);
      };

      AnimateCss.prototype.end = function() {
        this.setAttributes('', '');
        this.$el.removeClass("animated " + this.settings.effect);
        if (this.settings.queue) {
          this.$el.dequeue();
        }
        return this.settings.done.apply(this.$el);
      };

      AnimateCss.prototype.setAttributes = function(duration, delay) {
        var i, len, ref, results, vendor;
        ref = ['', '-webkit-', '-moz-'];
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          vendor = ref[i];
          this.$el.css(vendor + "animation-duration", duration);
          results.push(this.$el.css(vendor + "animation-delay", delay));
        }
        return results;
      };

      return AnimateCss;

    })();
    $.fn.queueAnimateCss = function(effect, duration, delay) {
      var options;
      options = $.extend({}, {
        effect: effect,
        queue: true
      }, options);
      new AnimateCss(this, options);
      return this;
    };
    return $.fn.animateCss = function(effect, options) {
      options = $.extend({}, {
        effect: effect
      }, options);
      new AnimateCss(this, options);
      return this;
    };
  })(jQuery, window, document);

}).call(this);
