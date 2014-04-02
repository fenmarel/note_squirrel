NoteSquirrel.Views.NotebooksIndex = Backbone.CompositeView.extend({
  initialize: function(options) {
    this.dashboard = options.dashboard;
    this.favorites = NoteSquirrel.favorites;
    this.active = options.active;

    this.listenTo(this.favorites, "add remove", this.render);
    this.listenTo(this.collection, "add remove sync", this.render);

    var that = this;
    this.collection.fetch({
      success: function(notebooks) {
        notebooks.each(that.addNotebook.bind(that));
      }
    });
  },

  template: JST['notebooks/index'],

  el: '<div class="list-group">',

  events: {
    "click #new-notebook-toggle": "toggleNotebookForm",
    "click #untoggle-notebook-form": "untoggleNotebookForm",
    "submit #new-notebook": "createNotebook",
    "click .notebooks-collapse-icon": "toggleCollapseNotebooks",
    "click .quicklinks-collapse-icon": "toggleCollapseQuicklinks",
    "click .edit-dashboard-name": "toggleDashboardRename",
    "click #untoggle-dashboard-form": "toggleDashboardRename",
    "submit #rename-dashboard": "renameDashboard",
    "mouseenter .favorite-sidebar-item": "showOptions",
    "mouseleave .favorite-sidebar-item": "hideOptions",
    "click .remove-favorite": "removeFavorite"
  },

  render: function() {
    var content = this.template({
      notebooks: this.collection,
      dashboard: this.dashboard,
      favorites: this.favorites
    });
    this.$el.html(content);
    this.renderSubviews();

    if (this.active) {
      $('.notebook-sidebar-item[href$="/'+this.active.id+'"]').addClass('active-path');
    }

    $('#notebooks-index-container').height($(window).height() - 91);
    this.startUI();

    return this;
  },

  startUI: function() {
    $("#notebooks-container .notebook-sidebar-item").draggable({
      revert: true,
      handle: '.notebook-list-title',
      helper: 'clone',
      containment: 'document',
      zIndex: 10000
    });

    var that = this;
    $(".quicklink-container").droppable({
      drop: function(event, ui) {
        var data = $(event.toElement).data();
        var dropped = new NoteSquirrel.Models.Notebook(data);
        dropped.save({favorite: true}, {patch: true});
        that.favorites.add(dropped);
      }
    });
  },

  addNotebook: function(notebook) {
    var view = new NoteSquirrel.Views.NotebookListShow({ model: notebook });
    this.addSubview('#notebooks-container', view);
    view.render();
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
        var notebook = new NoteSquirrel.Models.Notebook(newNotebook);
        that.collection.add(notebook);
        that.addNotebook.call(that, notebook);
      }
    });
  },

  toggleCollapseNotebooks: function(event) {
    var $icon = $('.notebooks-collapse-icon');
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
  },

  showOptions: function(event) {
    $(event.currentTarget).find('.options').show();
  },

  hideOptions: function(event) {
    $(event.currentTarget).find('.options').hide();
  },

  removeFavorite: function(event) {
    var data = $(event.target).data();
    var favorite = new NoteSquirrel.Models.Notebook(data);
    favorite.save({favorite: false}, {patch: true});
    this.favorites.remove(favorite);
  },

  toggleCollapseQuicklinks: function(event) {
    var $icon = $('.quicklinks-collapse-icon');
    var $items = $('.favorite-sidebar-item');
    $icon.toggleClass('glyphicon-chevron-down glyphicon-chevron-right');
    $items.toggle();
    $('.quicklink-container').toggle();
  }
});
