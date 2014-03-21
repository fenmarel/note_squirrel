NoteSquirrel.Models.Dashboard = Backbone.Model.extend({
  urlRoot: 'api/dashboards/',

  notebooks: function() {
    this._notebooks ||
    (this._notebooks = new NoteSquirrel.Collections.Notebooks({ dashboard: this }));

    this._notebooks.fetch();
    return this._notebooks;
  }
});