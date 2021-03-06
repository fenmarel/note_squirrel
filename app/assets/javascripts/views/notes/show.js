NoteSquirrel.Views.NoteShow = Backbone.CompositeView.extend({
  initialize: function(options) {
    var that = this;

    this.notebook = options.notebook ||
                    new NoteSquirrel.Models.Notebook({
                      id: this.model.get('notebook_id')
                    });

    this._events = _.extend({}, Backbone.Events);

    this.notebook.fetch({
      success: function(data) {
        that.dashboard = options.dashboard ||
                         NoteSquirrel.dashboards.get(data.get('dashboard_id'));
        that.notebooks = that.dashboard.notebooks();
        that.notes = that.notebook.notes();

        var dashPane = new NoteSquirrel.Views.NotebooksIndex({
          collection: that.notebooks,
          dashboard: that.dashboard,
          active: that.notebook
        });

        that.addSubview('#dashboard-pane', dashPane);


        var notebookPane = new NoteSquirrel.Views.NotesIndex({
          collection: that.notes,
          _events: that._events,
          active: that.model
        });

        that.addSubview('#notebook-pane', notebookPane);
      }
    });
  },

  template: JST['notes/show'],

  el: '<div id="rendered">',

  events: {
    "keyup #note-editor": "resetSaveTimeout",
    "submit note-editor": "preventDefault"
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
    $('.saved').hide();
    this._timer && clearTimeout(this._timer);
    this._timer = setTimeout(function() { that.updateBody(event) }, 2000);
  },

  updateBody: function(event) {
    var that = this;
    var data = $(event.target).serializeJSON();
    this.model.save(data, {
      patch: true,
      success: function(data) {
        $('.saved').show();
        that._events.trigger("editNote", that.model);
      }
    });
  },

  preventDefault: function(event) {
    event.preventDefault();
  }
});