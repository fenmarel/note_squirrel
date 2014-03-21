NoteSquirrel.Views.NotesIndex = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "all", this.render);
  },

  template: JST['notes/index'],

  el: '<div class="list-group">',

  events: {
    "click #new-note-toggle": "toggleNoteForm",
    "click #untoggle-note-form": "untoggleNoteForm",
    "submit #new-note": "createNote"
  },

  render: function() {
    var content = this.template({ notes: this.collection });
    this.$el.html(content);

    return this;
  },

  toggleNoteForm: function(event) {
    event.preventDefault();
    var form = JST['notes/_form']();
    $(event.target).hide();
    $('#note-form-container').html(form);
  },

  untoggleNoteForm: function(event) {
    event.preventDefault();
    $('#note-form-container').empty();
    $('#new-note-toggle').show();
  },

  createNote: function(event) {
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
  }
});