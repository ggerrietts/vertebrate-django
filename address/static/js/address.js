var address = address || {};


/*
 *
 */
address.ContactModel = core.Backbone.Model.extend({
	
});


/*
 *
 */
address.ContactCollection = core.Backbone.Collection.extend({
	url: '/async/contact'
});

/*
 *
 */
address.ContactItemView = core.Backbone.View.extend({
	tagName: 'li',

	initialize: function () {
		this.template = $('div#contact-template').html();
	},

	render: function () {
		this.$(this.el).html(this.template);
		this.$('.last').text(this.model.get('last'));
		this.$('.first').text(this.model.get('first'));
		this.$('.email').text(this.model.get('email'));

		return this;
	}

});

/*
 *
 */
address.ContactListView = core.Backbone.View.extend({
	initialize: function () {
		_.bindAll(this, 'reset_collection', 'add_model');
		this.collection = new address.ContactCollection();
		this.collection.bind('reset', this.reset_collection);
		this.collection.fetch();
	},

	reset_collection: function () {
		this.collection.each(this.add_model);
	},

	add_model: function (model) {
		var view = new address.ContactItemView({model: model});
		view.render();
		this.$('ul#contact-list').append(view.el);
	}
	
});


