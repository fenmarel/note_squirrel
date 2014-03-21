NoteSquirrel.Models.Notebook = Backbone.Model.extend({
  urlRoot: '/api/notebooks/',

  notes: function() {
    this._notes ||
    (this._notes = new NoteSquirrel.Collections.Notes({ notebook: this }));

    this._notes.fetch();
    return this._notes;
  }
});