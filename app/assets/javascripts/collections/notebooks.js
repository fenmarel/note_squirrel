NoteSquirrel.Collections.Notebooks = Backbone.Collection.extend({
  initialize: function(options) {
    this.dashboard = options.dashboard;
  },

  url: function() {
    return this.dashboard.url() + '/notebooks'
  },

  model: NoteSquirrel.Models.Notebook,

  comparator: "created_at",

  getOrFetch: function (id) {
    var model;
    var that = this;

    if (model = this.get(id)) {
      model.fetch();
      return model;
    } else {
      model = new NoteSquirrel.Models.Notebook({ id: id });
      model.fetch({
        success: function () { that.add(model) }
      });
      return model;
    }
  }
});