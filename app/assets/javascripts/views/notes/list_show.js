NoteSquirrel.Views.NoteListShow = Backbone.View.extend({
  initialize: function(options) {
    this._events = options._events;

    if (this._events) {
      _.bindAll(this, "editNote");
      this._events.bind("editNote", this.editNote);
    }

    this.listenTo(this.model, "change sync", this.render);
  },

  template: JST['notes/list_show'],

  el: function() {
    return '<a class="list-group-item note-sidebar-item" href="#' + this.model.url() + '">'
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
  }
});