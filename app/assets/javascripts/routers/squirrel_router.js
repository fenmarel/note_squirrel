NoteSquirrel.Routers.SquirrelRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.dashboards = options.dashboards;
    this.dashboards.fetch()
    this.bind("all", this.change);
  },

  routes: {
    "": "dashboardsIndex",
    "api/dashboards/:id": "dashboardShow",
    "api/notebooks/:id": "notebookShow"
  },

  dashboardsIndex: function() {
    // this._emptyPanes();
  },

  dashboardShow: function(id) {
    var view = new NoteSquirrel.Views.DashboardShow({ model: this.dashboards.get(id) });
    this._swapView(view);
  },

  notebookShow: function(id) {
    var notebook = new NoteSquirrel.Models.Notebook({ id: id });
    var that = this;

    notebook.fetch({
      success: function() {
        var view = new NoteSquirrel.Views.NotebookShow({ model: notebook });
        that._swapView(view);
      }
    });
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  }
});