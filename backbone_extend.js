define([
  'backbone',
  'nanobar'
], function(Backbone, Nanobar) {

    var BackboneExtend = {};

    BackboneExtend.initializeEventBus = function(instance) {
        if (window.EvtBus === undefined) {
            window.EvtBus = new _.extend({}, Backbone.Events);
        }
    
        if (instance !== undefined) {
            instance.evtbus = window.EvtBus;
        }
    }

    BackboneExtend.View = Backbone.View.extend({
        initialize_events: function() {
            BackboneExtend.initializeEventBus(this);
        },
        bind: function(event, callback, context) {
            this.evtbus.bind(event, callback, context);
        },
        trigger: function(event, options) {
            this.evtbus.trigger(event, options);
        },
        set_validation: function (field, message) {
            var p = this.$el.find(field).parent();
            this.$el.find("#helpBlock" + field.replace("#","")).remove();
            if (message == "") {
                p.addClass('has-success').removeClass('has-error');
            } else {
                p.addClass('has-error').removeClass('has-success');
                var spanHelp = $("<span>");
                spanHelp.attr("id", "helpBlock" + field.replace("#",""));
                spanHelp.addClass("help-block");
                spanHelp.html(message);
                p.append(spanHelp);
            }
        },
        cleanup_validation: function() {
            // this.$el.find("#form_job_validation_summary")
            //   .addClass("validation-summary-valid")
            //   .removeClass("validation-summary-errors");

            this.$el.find(".has-error").removeClass("has-error");
            this.$el.find(".has-success").removeClass("has-success");
            this.$el.find(".help-block").remove();
        },
        nanobar: function() {
            return new Nanobar()
        }()
    });

    return BackboneExtend;
});
