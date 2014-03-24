NoteSquirrel.Collections.Notebooks = Backbone.Collection.extend({
  initialize: function(options) {
    this.dashboard = options.dashboard;
  },

  url: function() {
    return this.dashboard.url() + '/notebooks'
  },

  model: NoteSquirrel.Models.Notebook,

  comparator: "created_at"
});