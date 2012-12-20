window.Website = Backbone.Model.extend({
  defaults: {
    url: null,
    title: null
  },
});

window.WebsiteCollection = Backbone.Collection.extend({
  model: Website,
  url: '/api/websites'
});

window.WebsiteListView = Backbone.View.extend({
  tagName: "ul",

  initialize: function() {
    this.model.bind("reset", this.render, this);
    this.model.bind("add", function (website) {
      $(self.el).append(new WebsiteListItemView({model: website}).render().el);j
    });
  },

  render: function(eventName) {
    $(this.el).empty();
    _.each(this.model.models, function(website) {
      $(this.el).append(new WebsiteListItemView({model: website}).render().el);
    }, this);
    return this;
  }
});

window.WebsiteListItemView = Backbone.View.extend({
  tagName: "li",
  template: _.template($("#website-item-template").html()),

  initialize: function() {
    this.model.bind("change", this.render, this);
    this.model.bind("destroy", this.close, this);
  },

  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },

  close: function() {
    $(this.el).unbind();
    $(this.el).remote();
  }
});

window.WebsiteView = Backbone.View.extend({
  template: _.template($("#website-detail").html()),
  
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});

var AppRouter = Backbone.Router.extend({
  routes: {
    ""             : "websites",
    "websites/:id" : "websiteDetails"
  },

  websites: function() {
    var self = this;
    this.websiteList = new WebsiteCollection();
    this.websiteListView = new WebsiteListView({model: self.websiteList});
    this.websiteList.fetch({async: false});
    $("#websites").html(self.websiteListView.render().el);
  },

  websiteDetails: function(id) {
    this.website = this.websiteList.get(id);
    this.websiteView = new WebsiteView({model: this.website});
    $("#website").html(this.websiteView.render().el);
  }
});

app = new AppRouter();
Backbone.history.start();
