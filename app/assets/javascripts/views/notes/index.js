NoteSquirrel.Views.NotesIndex = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "all", this.render);
  },

  template: JST['notes/index'],

  tagName: 'ul',

  render: function() {
    var content = this.template({ notes: this.collection });
    this.$el.html(content);

    return this;
  }
});