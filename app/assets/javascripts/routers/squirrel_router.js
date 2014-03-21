NoteSquirrel.Routers.SquirrelRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.dashboards = options.dashboards;
    this.bind("all", this.change);
  },

  routes: {
    "": "dashboardsIndex",
    "api/dashboards": "dashboardsIndex",
    "api/dashboards/:id": "dashboardShow"
  },

  dashboardsIndex: function() {
    var view = new NoteSquirrel.Views.DashboardsIndex({ collection: this.dashboards });
    debugger
    this._swapView(view);
  },

  dashboardShow: function(id) {
    var view = new NoteSquirrel.Views.DashboardShow({ model: this.dashboards.get(id) });
    this._swapView(view);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  }
});