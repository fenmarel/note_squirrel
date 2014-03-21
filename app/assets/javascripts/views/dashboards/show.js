NoteSquirrel.Views.DashboardShow = Backbone.View.extend({
  initialize: function(options) {
    this.notebooks = this.model.notebooks();

    this.listenTo(this.model, "all", this.render);
    this.listenTo(this.notebooks, "all", this.render);

    this.notebooks.fetch();
  },

  tagName: 'ul',

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