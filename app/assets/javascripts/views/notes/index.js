NoteSquirrel.Views.NotesIndex = Backbone.CompositeView.extend({
  initialize: function(options) {
    this._events = options._events;

    this.listenTo(this.collection, "all", this.render);

    var that = this;
    this.collection.fetch({
      success: function(notes) {
        notes.each(that.addNote.bind(that));
      }
    });
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
    this.renderSubviews();

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
  },

  addNote: function(note) {
    var view = new NoteSquirrel.Views.NoteListShow({
      model: note,
      _events: this._events
    });
    this.addSubview('#notes-container', view);
    view.render();
  }
});