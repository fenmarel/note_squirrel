NoteSquirrel.Routers.SquirrelRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.dashboards = options.dashboards;
    this.bind("all", this.change);
  },

  routes: {
    "": "dashboardsIndex",
    "dashboards": "dashboardsIndex"
  },

  dashboardsIndex: function() {
    var view = new NoteSquirrel.Views.DashboardsIndex({ collection: this.dashboards });
    this._swapView(view);
  },

  _swapView: function(view) {
    this.currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  }
});