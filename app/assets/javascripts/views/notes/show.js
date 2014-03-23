NoteSquirrel.Views.NoteShow = Backbone.CompositeView.extend({
  initialize: function(options) {
    var that = this;
    this.notebook = new NoteSquirrel.Models.Notebook({ id: this.model.get('notebook_id') });
    this._events = _.extend({}, Backbone.Events);

    this.notebook.fetch({
      success: function(data) {
        that.dashboard = NoteSquirrel.dashboards.get(data.get('dashboard_id'));
        that.notebooks = that.dashboard.notebooks();
        that.notes = that.notebook.notes();

        var dashPane = new NoteSquirrel.Views.NotebooksIndex({ collection: that.notebooks });
        that.addSubview('#dashboard-pane', dashPane);

        var notebookPane = new NoteSquirrel.Views.NotesIndex({
          collection: that.notes,
          _events: that._events
        });
        that.addSubview('#notebook-pane', notebookPane);
      }
    });
  },

  template: JST['notes/show'],

  el: '<div id="rendered">',

  events: {
    "keyup #note-editor": "resetSaveTimeout"
  },

  render: function() {
    var content = this.template({ note: this.model });
    this.$el.html(content);
    this.renderSubviews();

    return this;
  },

  resetSaveTimeout: function(event) {
    var that = this;
    $('#note-edit-group').removeClass('has-success');
    $('#note-edit-group').addClass('has-warning');
    this._timer && clearTimeout(this._timer);
    this._timer = setTimeout(function() { that.updateBody(event) }, 3000);
  },

  updateBody: function(event) {
    var that = this;
    var data = $(event.target).serializeJSON();
    this.model.save(data, {
      patch: true,
      success: function(data) {
        that._events.trigger("editNote", that.model);
      }
    });
  }
});