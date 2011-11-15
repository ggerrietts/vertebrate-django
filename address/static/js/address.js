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
        <div class="display">\
            <div class="last">&nbsp;</div>\
            <div class="first">&nbsp;</div>\
            <div class="email">&nbsp;</div>\
            <div class="button">\
                <button class="edit"><img src="{{ static_url }}img/pencil.png" /></button>\
                <button class="delete"><img src="{{ static_url }}img/delete.png" /></button>\
            </div>\
            <div class="clear"></div>\
        </div>\
        <div class="edit hidden">\
            <div class="local-error"></div>\
            <form>\
                <div><input type="text" class="last" name="last" /></div>\
                <div><input type="text" class="first" name="first" /></div>\
                <div><input type="text" class="email" name="email" /></div>\
                <div class="button">\
                    <button class="accept"><img src="{{ static_url }}img/accept.png" /></button>\
                    <button class="unedit"><img src="{{ static_url }}img/cancel.png" /></button>\
                </div>\
            </form>\
            <div class="clear"></div>\
        </div>\
    '),
 
    events: {
        'click button.delete': 'trash',
        'click button.edit': 'edit',
        'click button.accept': 'save',
        'click button.unedit': 'unedit'
    },

    initialize: function () {
        _.bindAll(this, 'render', 'trash', 'edit', 'save', 'unedit',
                        'display_error', 'remove');
        this.model.bind('destroy', this.remove);
        this.model.bind('change', this.render);
        this.model.bind('error', this.display_error);
    },

    trash: function () {
        this.model.destroy();
    },

    edit: function () {
        this.$('div.display').hide();
        this.$('div.edit').show();
        return false;
    },

    save: function () {
       var attrs = {
            email: this.$('input.email').val(),
            last: this.$('input.last').val(),
            first: this.$('input.first').val()
        };
        this.model.save(attrs, {success: this.unedit});
        return false;
    },

    display_error: function(model, msg) {
        this.$('div.local-error').text(msg);
    },

    unedit: function () {
        this.$('div.display').show();
        this.$('div.edit').hide();
        return false;
    },

    render: function () {
        this.$(this.el).html(this.template({static_url: static_url}));
        if (this.model.get('last')) {
            this.$('div.last').text(this.model.get('last'));
            this.$('input.last').val(this.model.get('last'));
        }
        if (this.model.get('first')) {
            this.$('div.first').text(this.model.get('first'));
            this.$('input.first').val(this.model.get('first'));
        }
        if (this.model.get('email')) {
            this.$('div.email').text(this.model.get('email'));
            this.$('input.email').val(this.model.get('email'));
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
        this.$('input[type="text"]').val('');
        this.$('input.last').focus();
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
