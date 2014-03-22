NoteSquirrel.Views.NotebooksIndex = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "all", this.render);
  },

  template: JST['notebooks/index'],

  el: '<div class="list-group">',

  events: {
    "click #new-notebook-toggle": "toggleNotebookForm",
    "click #untoggle-notebook-form": "untoggleNotebookForm",
    "submit #new-notebook": "createNotebook",
    "click #notebooks-collapse": "toggleCollapseNotebooks"
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
    $('#notebook-form-container').show();
  },

  untoggleNotebookForm: function(event) {
    event.preventDefault();
    $('#notebook-form-container').empty();
    $('#notebook-form-container').hide();
    $('#new-notebook-toggle').show();
  },

  createNotebook: function(event) {
    event.preventDefault();
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
  },

  toggleCollapseNotebooks: function(event) {
    var $icon = $(event.target).find('.glyphicon');
    var $items = $('.notebook-sidebar-item');
    $icon.toggleClass('glyphicon-chevron-down glyphicon-chevron-right');
    $items.toggle();
  }
});