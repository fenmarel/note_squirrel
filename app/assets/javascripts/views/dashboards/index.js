NoteSquirrel.Views.DashboardsIndex = Backbone.View.extend({
  initialize: function() {
    this.collection.fetch();
    this.listenTo(this.collection, "all", this.render);
  },

  events: {
    "submit #new-dashboard-form": "createDashboard"
  },

  template: JST['dashboards/index'],

  render: function() {
    var content = this.template({ dashboards: this.collection });
    this.$el.html(content);

    return this;
  },

  createDashboard: function(event) {
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    var dashboard = new NoteSquirrel.Models.Dashboard();
    dashboard.save(data, {
      success: function() {
        NoteSquirrel.dashboards.add(dashboard);
      }
    });
  }
});