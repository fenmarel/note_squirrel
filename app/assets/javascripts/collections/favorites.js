NoteSquirrel.Collections.Favorites = Backbone.Collection.extend({
  url: '/api/favorites',

  model: NoteSquirrel.Models.Notebook,

  comparator: "created_at"
});