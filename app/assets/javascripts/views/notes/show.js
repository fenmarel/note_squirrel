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

  render: function() {
    var content = this.template({ note: this.model });
    this.$el.html(content);
    this.renderSubviews();

    return this;
  }
});