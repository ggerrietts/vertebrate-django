var address = address || {};

/*
 * Model and Collection --
 * both pretty skinny at this point!
 */

address.ContactModel = core.Backbone.Model.extend({
    validate: function (attrs) {
        if (attrs.email && (! /^\S+@\S+\.\S+$/.test(attrs.email))) {
            return attrs.email + " is not a valid email address.";
        }
    }
});

address.ContactCollection = core.Backbone.Collection.extend({
    model: address.ContactModel,
    
    url: '/async/contact'
});

/* 
 * ContactItemView is for displaying a single item
 */
address.ContactItemView = core.Backbone.View.extend({
    tagName: 'div',

    className: 'contact-row',

    template: _.template('\
        <div class="display clearfix">\
            <div class="last"><p>&nbsp;</p></div>\
            <div class="first"><p>&nbsp;</p></div>\
            <div class="email"><p>&nbsp;</p></div>\
            <div class="button"><button class="delete">\
                <img src="{{ static_url }}img/delete.png" />\
            </button></div>\
        </div>\
    '),
 
    events: {
        'click button.delete': 'trash'
    },

    initialize: function () {
        _.bindAll(this, 'render', 'remove');
        this.model.bind('destroy', this.remove)
    },

    trash: function () {
        this.model.destroy();
    },

    render: function () {
        this.$(this.el).html(this.template({static_url: static_url}));
        if (this.model.get('last')) {
            this.$('div.last p').text(this.model.get('last'));
        }
        if (this.model.get('first')) {
            this.$('div.first p').text(this.model.get('first'));
        }
        if (this.model.get('email')) {
            this.$('div.email p').text(this.model.get('email'));
        }

        return this;
    }

});

/* 
 * ContactListView is the main block of code that drives the page
 */
address.ContactListView = core.Backbone.View.extend({
    initialize: function () {
        _.bindAll(this, 'reset_collection', 'add_model', 'new_model', 
            'display_error', 'clear_form');
        this.collection = new address.ContactCollection();
        this.collection.bind('reset', this.reset_collection);
        this.collection.bind('add', this.add_model);
        this.collection.fetch();
    },

    events: {
        'submit form': 'new_model'
    },

    display_error: function (model, msg) {
        this.$('input.email').val(model.get('email'));
        this.$('input.last').val(model.get('last'));
        this.$('input.first').val(model.get('first'));
        this.$('#error-row').text(msg);
    },

    reset_collection: function () {
        this.$('#contact-list').empty();
        this.collection.each(this.add_model);
    },

    add_model: function (model) {
        var view = new address.ContactItemView({model: model});
        view.render();
        this.$('#contact-list').append(view.el);
    },

    clear_form: function () {
        this.$('#add-contact input[type="text"]').val('');
        this.$('#add-contact input.last').focus();
    },

    new_model: function () {
        var attrs = {
            email: this.$('input.email').val(),
            last: this.$('input.last').val(),
            first: this.$('input.first').val()
        };
        this.collection.create(attrs, {
            success: this.clear_form,
            error: this.display_error
        });
        return false;
    }
    
});
