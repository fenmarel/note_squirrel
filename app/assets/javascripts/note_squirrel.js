window.NoteSquirrel = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    NoteSquirrel.dashboards = new NoteSquirrel.Collections.Dashboards(
      JSON.parse($("#initial-data").html()).dashboards);

    NoteSquirrel.favorites = new NoteSquirrel.Collections.Favorites(
      JSON.parse($("#initial-data").html()).favorites);

    // NoteSquirrel.trashcan = new NoteSquirrel.Collections.Trashcan(
    //   JSON.parse($("#initial-data").html()).trashcan);

    new NoteSquirrel.Routers.SquirrelRouter({
      dashboards: NoteSquirrel.dashboards,
      $rootEl: $('#content')
    });

    Backbone.history.start();
  }
};

$(document).ready(function(){
  NoteSquirrel.initialize();
});


Backbone.CompositeView = Backbone.View.extend({
  subviews: function() {
    this._subviews || (this._subviews = {});

    return this._subviews;
  },

  addSubview: function(viewEl, subview) {
    var elSubviews = this.subviews()[viewEl] || (this.subviews()[viewEl] = []);
    elSubviews.push(subview);

    var $viewEl = this.$(viewEl);
    $viewEl.append(subview.$el);
  },

  remove: function() {
    Backbone.View.prototype.remove.call(this);

    _(this.subviews()).each(function(viewList) {
      _(viewList).each(function(view) {
        view.remove();
      });
    });
  },

  removeSubview: function(viewEl, subview) {
    var elSubviews = this.subviews()[viewEl] || (this.subviews()[viewEl] = []);

    var removeAt = elSubviews.indexOf(subview);
    if (removeAt !== -1) {
      elSubviews.splice(removeAt, 1);
      subview.remove();
    }
  },

  renderSubviews: function() {
    var that = this;

    _(this.subviews()).each(function(elSubviews, viewEl) {
      var $thisEl = that.$(viewEl);
      $thisEl.empty();

      _(elSubviews).each(function(view) {
        $thisEl.append(view.render().$el);
        view.delegateEvents();
      });
    });
  }
});








