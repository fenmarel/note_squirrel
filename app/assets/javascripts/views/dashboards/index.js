NoteSquirrel.Views.DashboardsIndex = Backbone.View.extend({
  template: JST['dashboards/index'],

  render: function() {
    var content = this.template({ dashboards: this.collection });
    this.$el.html(content);

    return this;
  }
});