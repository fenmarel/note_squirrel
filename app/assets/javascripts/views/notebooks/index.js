NoteSquirrel.Views.NotebooksIndex = Backbone.View.extend({
  template: JST['notebooks/index'],

  tagName: 'ul',

  render: function() {
    var content = this.template({ notebooks: this.collection });
    this.$el.html(content);

    return this;
  }
});