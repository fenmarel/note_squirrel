NoteSquirrel.Views.NotebookShow = Backbone.View.extend({
  initialize: function(options) {
    this.notes = this.model.notes();

    this.listenTo(this.model, "all", this.render);
    this.listenTo(this.notes, "all", this.render);
  },

  tagName: 'ul',

  template: JST['notebooks/show'],

  render: function() {
    var content = this.template({ notes: this.notes });
    this.$el.html(content);

    return this;
  }
});