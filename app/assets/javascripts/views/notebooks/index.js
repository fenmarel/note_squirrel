NoteSquirrel.Views.NotebooksIndex = Backbone.View.extend({
  initialize: function(options) {
    this.dashboard = options.dashboard;
    this.active = options.active;

    this.listenTo(this.collection, "all", this.render);
  },

  template: JST['notebooks/index'],

  el: '<div class="list-group">',

  events: {
    "click #new-notebook-toggle": "toggleNotebookForm",
    "click #untoggle-notebook-form": "untoggleNotebookForm",
    "submit #new-notebook": "createNotebook",
    "click .glyphicon-chevron-down, .glyphicon-chevron-right": "toggleCollapseNotebooks",
    "click .edit-dashboard-name": "toggleDashboardRename",
    "click #untoggle-dashboard-form": "toggleDashboardRename",
    "submit #rename-dashboard": "renameDashboard"
  },

  render: function() {
    var content = this.template({
      notebooks: this.collection,
      dashboard: this.dashboard
    });
    this.$el.html(content);

    if (this.active) {
      $('.notebook-sidebar-item[href$="/'+this.active.id+'"]').addClass('active-path');
    }

    $('#notebooks-container').height($(window).height() - 132);

    return this;
  },

  toggleNotebookForm: function(event) {
    event.preventDefault();
    var form = JST['notebooks/_form']();
    $('#new-notebook-toggle').hide();
    $('#notebook-form-container').html(form);
    $('#notebook-form-container').show();
  },

  untoggleNotebookForm: function(event) {
    event.preventDefault();
    $('#notebook-form-container').empty();
    $('#notebook-form-container').hide();
    $('#new-notebook-toggle').show();
  },

  createNotebook: function(event) {
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

  toggleCollapseNotebooks: function(event) {
    var $icon = $('#notebooks-collapse [class^="glyphicon glyphicon-chevron-"]');
    var $items = $('.notebook-sidebar-item');
    $icon.toggleClass('glyphicon-chevron-down glyphicon-chevron-right');
    $items.toggle();
  },

  toggleDashboardRename: function(event) {
    event.preventDefault();
    $('#notebooks-collapse').toggle();
    $('#sidebar-notebook-workspace-name-form').toggle();

  },

  renameDashboard: function(event) {
    event.preventDefault();
    var data = $(event.target).serializeJSON();
    var that = this;

    this.dashboard.save(data, {
      patch: true,
      success: function() {
        that.toggleDashboardRename(event);
        that.render();
      }
    });
  }

});