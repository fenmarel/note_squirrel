NoteSquirrel.Routers.SquirrelRouter = Backbone.Router.extend({
  initialize: function(options) {
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
    this._emptyViews();
  },

  dashboardShow: function(id) {
    var view = new NoteSquirrel.Views.DashboardShow({ model: this.dashboards.get(id) });
    this._swapDashboard(view);
  },

  notebookShow: function(id) {
    // var dashboard = this.dashboards.get(dashboard_id);
    // var notebooks = dashboard.notebooks();
    var notebook = new NoteSquirrel.Models.Notebook({ id: id });
    var that = this;

    notebook.fetch({
      success: function() {
        var view = new NoteSquirrel.Views.NotebookShow({ model: notebook });
        that._swapNotebook(view);
      }
    });
  },

  _emptyViews: function() {
    this._currentDashboard && this._currentDashboard.remove();
    this._currentNotebook && this._currentNotebook.remove();
    this._currentNote && this._currentNote.remove();
  },

  _swapDashboard: function(view) {
    this._emptyViews();
    this._currentDashboard = view;
    $('#dashboard-pane').html(view.render().$el);
  },

  _swapNotebook: function(view) {
    this._currentNotebook && this._currentNotebook.remove();
    this._currentNotebook = view;
    $('#notebook-pane').html(this._currentNotebook.render().$el);
  },

  _swapNote: function(view) {
    this._currentNote && this._currentNote.remove();
    this._currentNote = view;
    $('#note-pane').html(this._currentNote.render().$el);
  }
});