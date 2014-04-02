NoteSquirrel.Views.DashboardSelect = Backbone.View.extend({
  template: JST['dashboards/select'],

  el: '<div id="landing">',

  render: function() {
    this.$el.html(this.template());
    return this;
  }
})