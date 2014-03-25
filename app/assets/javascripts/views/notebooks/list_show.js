NoteSquirrel.Views.NotebookListShow = Backbone.View.extend({
  initialize: function(options) {
    this.listenTo(this.model, "all", this.render);
  },

  template: JST['notebooks/list_show'],

  el: function() {
    return '<a class="list-group-item notebook-sidebar-item"href="#' + this.model.url() + '">'
  },

  events: {
    "mouseenter": "showOptions",
    "mouseleave": "hideOptions",
    "click .edit-notebook": "toggleEditNotebook"
  },

  render: function() {
    var content = this.template({ notebook: this.model });
    this.$el.html(content);

    return this;
  },

  showOptions: function(event) {
    event.preventDefault();
    $(event.currentTarget).find('.options').removeClass('hide-options');
  },

  hideOptions: function(event) {
    event.preventDefault();
    $(event.currentTarget).find('.options').addClass('hide-options');
  },

  toggleEditNotebook: function(event) {
    event.preventDefault();

  }
})