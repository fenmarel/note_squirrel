NoteSquirrel.Views.NotebooksIndex = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "all", this.render);
  },

  template: JST['notebooks/index'],

  el: '<div class="list-group">',

  events: {
    "click #new-notebook-toggle": "toggleNotebookForm",
    "click #untoggle-notebook-form": "untoggleNotebookForm",
    "submit #new-notebook": "createNotebook"
  },

  render: function() {
    var content = this.template({ notebooks: this.collection });
    this.$el.html(content);

    return this;
  },

  toggleNotebookForm: function(event) {
    event.preventDefault();
    var form = JST['notebooks/_form']();
    $(event.target).hide();
    $('#notebook-form-container').html(form);
  },

  untoggleNotebookForm: function(event) {
    event.preventDefault();
    $('#notebook-form-container').empty();
    $('#new-notebook-toggle').show();
  },

  createNotebook: function(event) {
    var data = $(event.target).serializeJSON();
    var that = this;

    $.ajax({
      url: this.collection.url(),
      type: 'POST',
      data: data,
      success: function(newNotebook) {
        that.collection.add(newNotebook);
      }
    });
  }
});