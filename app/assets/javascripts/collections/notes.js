NoteSquirrel.Collections.Notes = Backbone.Collection.extend({
  initialize: function(options) {
    this.notebook = options.notebook;
  },

  url: function() {
    return this.notebook.url() + '/notes'
  },

  model: NoteSquirrel.Models.Note,

  comparator: "created_at",

  getOrFetch: function (id) {
    var model;
    var that = this;

    if (model = this.get(id)) {
      model.fetch();
      return model;
    } else {
      model = new NoteSquirrel.Models.Note({ id: id });
      model.fetch({
        success: function () { that.add(model) }
      });
      return model;
    }
  }
});