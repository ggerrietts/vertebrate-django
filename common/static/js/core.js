var core = core || {};

/*
 *  Dependencies:  This module expects that Backbone and _ are loaded on the page.
 */

// this sets up Backbone.js to play nice(r) with Django
core.Backbone = (function () {

    var NewModel = Backbone.Model.extend({
        keys: function () {
            return _.keys(this.attributes);
        },
        values: function () {
            return _.values(this.attributes);
        }
    });

    _.templateSettings = {
        evaluate    : /\{%([\s\S]+?)%\}/g,
        interpolate : /\{\{(.+?)\}\}/g
    };

    // override Backbone.sync default setting (change from REST to just GET/POST calls)
    Backbone.emulateHTTP = true;

    // Return a new Object ineriting from Backbone with our own overrides.
    return _.extend({}, Backbone, {
        'Model': NewModel
    });
   
}());

