NoteSquirrel.Views.NotesIndex = Backbone.View.extend({
  template: JST['notes/index'],

  tagName: 'ul',

  render: function() {
    var content = this.template({ notes: this.collection });
    this.$el.html(content);

    return this;
  }
});