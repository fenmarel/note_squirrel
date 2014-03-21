NoteSquirrel.Views.NotebookShow = Backbone.CompositeView.extend({
  initialize: function(options) {
    var that = this;
    this.notes = this.model.notes();

    this.dashboard = NoteSquirrel.dashboards.get(this.model.get('dashboard_id'));
    this.collection = this.dashboard.notebooks();

    this.collection.fetch({
      success: function(notebooks) {
        var booksView = new NoteSquirrel.Views.NotebooksIndex({ collection: notebooks });
        that.addSubview('#dashboard-pane', booksView);
      }
    });

    this.listenTo(this.model, "all", this.render);
    this.listenTo(this.notes, "all", this.render);
    this.listenTo(this.collection, "all", this.render);

    this.notes.fetch({
      success: function(data) {
        that.addNotes(data);
      }
    })
  },

  template: JST['shared/show'],

  render: function() {
    var content = this.template({ notes: this.notes });
    this.$el.html(content);
    this.renderSubviews();

    return this;
  },

  addNotes: function(notes) {
    var view = new NoteSquirrel.Views.NotesIndex({ collection: notes });
    this.addSubview('#notebook-pane', view);
    view.render();
  }
});