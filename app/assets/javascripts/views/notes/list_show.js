NoteSquirrel.Views.NoteListShow = Backbone.View.extend({
  initialize: function(options) {
    this._events = options._events;

    if (this._events) {
      _.bindAll(this, "editNote");
      this._events.bind("editNote", this.editNote);
    }

    this.listenTo(this.model, "all", this.render);
  },

  template: JST['notes/list_show'],

  el: function() {
    return '<a class="list-group-item note-sidebar-item" href="#' + this.model.url() + '">'
  },

  events: {
    "mouseenter": "showOptions",
    "mouseleave": "hideOptions",
    "click .delete-note": "deleteNote"
  },

  render: function() {
    var content = this.template({ note: this.model });
    this.$el.html(content);

    return this;
  },

  editNote: function(data) {
    if (this.model.id === data.id) {
      this.model = data;
      this.render();
    }
  },

  showOptions: function(event) {
    $(event.currentTarget).find('.note-list-options').removeClass('hide-options');
  },

  hideOptions: function(event) {
    $(event.currentTarget).find('.note-list-options').addClass('hide-options');
  },

  deleteNote: function(event) {
    var id = $(event.currentTarget).data();
    var note = new NoteSquirrel.Models.Note(id);

    note.fetch({
      success: function(data) {
        data.destroy({
          success: function() {
            Backbone.history.navigate('#/api/notebooks/' + data.get('notebook_id'));
          }
        });
      }
    })
  }
});