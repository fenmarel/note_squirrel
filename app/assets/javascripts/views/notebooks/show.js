NoteSquirrel.Views.NotebookShow = Backbone.CompositeView.extend({
  initialize: function(options) {
    var that = this;
    this.notes = this.model.notes();

    this.dashboard = NoteSquirrel.dashboards.get(this.model.get('dashboard_id'));
    this.collection = this.dashboard.notebooks();

    this.collection.fetch({
      success: function(notebooks) {
        var dashPane = new NoteSquirrel.Views.NotebooksIndex({
          collection: notebooks,
          dashboard: that.dashboard,
          active:  that.model
        });
        that.addSubview('#dashboard-pane', dashPane);

        var notebookPane = new NoteSquirrel.Views.NotesIndex({ collection: that.notes });
        that.addSubview('#notebook-pane', notebookPane);
        that.notes.fetch();
      }
    });
  },

  template: JST['shared/show'],

  el: '<div id="rendered">',

  render: function() {
    var content = this.template({ notes: this.notes });
    this.$el.html(content);
    this.renderSubviews();

    return this;
  }
});