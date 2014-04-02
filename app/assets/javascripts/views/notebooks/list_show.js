NoteSquirrel.Views.NotebookListShow = Backbone.View.extend({
  initialize: function(options) {
    this.listenTo(this.model, "change", this.render);

    $('#modal-content').on('submit',
                          '#editModal'+ this.model.id + ' #notebook-title-form',
                          this.updateNotebookTitle.bind(this));
  },

  template: JST['notebooks/list_show'],

  el: function() {
    return '<a class="list-group-item notebook-sidebar-item"href="#' + this.model.url() + '">'
  },

  events: {
    "mouseenter": "showOptions",
    "mouseleave": "hideOptions",
    "click .edit-notebook": "toggleEditNotebook",
    "click .remove-notebook": "deleteNotebook"
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

    var modalView = JST['notebooks/_modal']({ notebook: this.model });
    $('#modal-content').empty();
    $('#modal-content').html(modalView);
    $('#modal-content').find('#editModal' + this.model.id).modal('show');
  },

  updateNotebookTitle: function(event) {
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    $('#modal-content').find('#editModal' + this.model.id).modal('hide');
    var that = this;
    this.model.save(data);
  },

  deleteNotebook: function(event) {
    event.preventDefault();
    // TODO: make this not ugly
    var confirmation = confirm("Are you sure you want to delete " + this.model.escape('title') + "?");
    if (confirmation) {
      this.model.destroy();
      this.remove();
    }
  }
})