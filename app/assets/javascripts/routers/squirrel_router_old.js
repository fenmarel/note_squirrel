NoteSquirrel.Routers.SquirrelRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.dashboards = options.dashboards;
    this.dashboards.fetch();
  },

  routes: {
    "": "root",
    "api/dashboards/:id": "dashboardShow",
    "api/notebooks/:id": "notebookShow",
    "api/notes/:id": "noteShow"
  },

  root: function() {
    // some default layout, please choose workspace info or something
  },

  dashboardShow: function(id) {
    var dash = this.dashboards.get(id);
    var defaultNotebooks = dash.notebooks();
    var that = this;

    defaultNotebooks.fetch({
      success: function(data) {
        var notebook = data.at(0);
        if (notebook) {
          that.notebookShow(notebook.id);
        } else {
          var view = new NoteSquirrel.Views.DashboardShow({ model: that.dashboards.get(id) });
          that._swapView(view);
        }
      }
    });

  },

  notebookShow: function(id) {
    var notebook = new NoteSquirrel.Models.Notebook({ id: id });
    var that = this;

    notebook.fetch({
      success: function() {
        var defaultNotes = notebook.notes();
        defaultNotes.fetch({
          success: function(data) {
            var note = data.at(0);
            if (note) {
              that.noteShow(note.id);
            } else {
              var view = new NoteSquirrel.Views.NotebookShow({ model: notebook });
              that._swapView(view);
            }
          }
        });
      }
    });
  },

  noteShow: function(id) {
    var note = new NoteSquirrel.Models.Note({ id: id });
    var that = this;

    note.fetch({
      success: function() {
        var view = new NoteSquirrel.Views.NoteShow({ model: note });
        that._swapView(view);
      }
    })
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(this._currentView.render().$el);
  }
});