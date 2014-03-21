NoteSquirrel.Views.NoteShow = Backbone.CompositeView.extend({
  initialize: function(options) {
    var that = this;
    this.notebook = new NoteSquirrel.Models.Notebook({ id: this.model.get('notebook_id') });

    this.notebook.fetch({
      success: function(data) {
        that.dashboard = NoteSquirrel.dashboards.get(data.get('dashboard_id'));
        that.notebooks = that.dashboard.notebooks();
        that.notes = that.notebook.notes();

        var dashPane = new NoteSquirrel.Views.NotebooksIndex({ collection: that.notebooks });
        that.addSubview('#dashboard-pane', dashPane);

        var notebookPane = new NoteSquirrel.Views.NotesIndex({ collection: that.notes });
        that.addSubview('#notebook-pane', notebookPane);
      }
    });
  },

  template: JST['notes/show'],

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
    $(event.target).parent().removeClass('has-success');
    $(event.target).parent().addClass('has-warning');
    this._timer && clearTimeout(this._timer);
    this._timer = setTimeout(function() { that.updateBody(event) }, 3000);
  },

  updateBody: function(event) {
    $(event.target).parent().removeClass('has-warning');
    $(event.target).parent().addClass('has-success');
    var data = $(event.target).serializeJSON();
    this.model.save(data, { patch: true });
  }
});