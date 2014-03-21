NoteSquirrel.Views.DashboardShow = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.notebooks = this.model.notebooks();
    var that = this;

    this.listenTo(this.notebooks, "all", this.render);

    this.notebooks.fetch();
  },

  template: JST['dashboards/show'],

  render: function() {
    var contents = this.template({
      dashboard: this.model,
      notebooks: this.notebooks
     });
    this.$el.html(contents);

    return this;
  }
});