NoteSquirrel.Collections.Dashboards = Backbone.Collection.extend({
  url: '/api/dashboards',

  model: NoteSquirrel.Models.Dashboard,

  comparator: "created_at"
})