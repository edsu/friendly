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
  render: function(eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});

var AppRouter = Backbone.Router.extend({
  routes: {
    "": "websites",
  },
  websites: function() {
    var self = this;
    this.websiteList = new WebsiteCollection();
    this.websiteListView = new WebsiteListView({model: self.websiteList});
    this.websiteList.fetch({async: false});
    $("#websites").html(self.websiteListView.render().el);
  }
});

app = new AppRouter();
Backbone.history.start();

/*
  var AppView = Backbone.View.extend({
    el: $("#app"),
    events: {
      "keypress #new-todo":  "createOnEnter",
      "keyup #new-todo":     "showTooltip",
      "click .todo-clear a": "clearCompleted",
      "click .mark-all-done": "toggleAllComplete"
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      _.bind(this, 'render');
      _.bindAll(this, 'addOne', 'addAll', 'render', 'toggleAllComplete');

      this.input = this.$("#new-todo");
      this.allCheckbox = this.$(".mark-all-done")[0];

      websites.bind('add',     this.addOne);
      websites.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      var done = Todos.done().length;
      var remaining = Todos.remaining().length;

      this.$('#todo-stats').html(this.statsTemplate({
        total:      Todos.length,
        done:       done,
        remaining:  remaining
      }));

      this.allCheckbox.checked = !remaining;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
      var view = new TodoView({model: todo});
      this.$("#todo-list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      Todos.each(this.addOne);
    },

    // Generate the attributes for a new Todo item.
    newAttributes: function() {
      return {
        content: this.input.val(),
        order:   Todos.nextOrder(),
        done:    false
      };
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      websites.create(this.newAttributes());
      this.input.val('');
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      _.each(Todos.done(), function(todo){ todo.clear(); });
      return false;
    },

    // Lazily show the tooltip that tells you to press `enter` to save
    // a new todo item, after one second.
    showTooltip: function(e) {
      var tooltip = this.$(".ui-tooltip-top");
      var val = this.input.val();
      tooltip.fadeOut();
      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
      if (val == '' || val == this.input.attr('placeholder')) return;
      var show = function(){ tooltip.show().fadeIn(); };
      this.tooltipTimeout = _.delay(show, 1000);
    },

    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      Todos.each(function (todo) { todo.save({'done': done}); });
    }

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;

*/
