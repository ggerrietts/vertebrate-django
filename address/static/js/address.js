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
	tagName: 'tr',

	template: _.template('\
		<td class="last"></td>\
		<td class="first"></td>\
		<td class="email"></td>\
	'),

	initialize: function () {
		_.bindAll(this, 'render');
	},

	render: function () {
		this.$(this.el).html(this.template());
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
		_.bindAll(this, 'reset_collection', 'add_model', 'new_model');
		this.collection = new address.ContactCollection();
		this.collection.bind('reset', this.reset_collection);
		this.collection.bind('add', this.add_model);
		this.collection.fetch();
	},

	events: {
		'submit form': 'new_model'
	},

	reset_collection: function () {
		this.collection.each(this.add_model);
	},

	add_model: function (model) {
		var view = new address.ContactItemView({model: model});
		view.render();
		this.$('ul#contact-list').append(view.el);
	},

	new_model: function () {
		var obj,
			attrs = {
				email: this.$('input.email').val(),
				last: this.$('input.last').val(),
				first: this.$('input.first').val()
			};
		obj = new address.ContactModel(attrs);
		obj.save();
		return false;
	}
	
});


