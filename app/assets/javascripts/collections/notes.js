NoteSquirrel.Collections.Notes = Backbone.Collection.extend({
  initialize: function(options) {
    this.notebook = options.notebook;
  },

  url: function() {
    return this.notebook.url() + '/notes'
  },

  model: NoteSquirrel.Models.Note

});