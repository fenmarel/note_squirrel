NoteSquirrel.Views.DashboardShow = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.notebooks = this.model.notebooks();

    this.listenTo(this.model, "all", this.render);
    this.listenTo(this.notebooks, "all", this.render);

    var that = this;
    this.notebooks.fetch({
      success: function(data) {
        that.addNotebooks(data);
      }
    });
  },

  template: JST['shared/show'],

  el: '<div id="rendered">',

  render: function() {
    var contents = this.template();
    this.$el.html(contents);
    this.renderSubviews();

    return this;
  },

  addNotebooks: function(notebooks) {
    var view = new NoteSquirrel.Views.NotebooksIndex({ collection: notebooks });
    this.addSubview('#dashboard-pane', view);
    view.render();
  }
});