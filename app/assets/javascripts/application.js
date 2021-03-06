// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery.ui.draggable
//= require jquery.ui.droppable
//= require jquery.serializeJSON
//= require bootstrap
//= require underscore
//= require backbone
//= require note_squirrel
//= require_tree ../templates
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views
//= require_tree ./routers
//= require_tree .


$(function() {
  $('#new-dashboard').on('click', function(event) {
    event.preventDefault();

    var newDash = new NoteSquirrel.Models.Dashboard({
      title: "Workspace" + (NoteSquirrel.dashboards.length + 1)
    });
    newDash.save({}, {
      success: function() {
        NoteSquirrel.dashboards.add(newDash);
        $('#dashboard-dropdown').prepend(
          JST['dashboards/dropdown_item']({ dash: newDash })
        );
        Backbone.history.navigate("#/api/dashboards/" + newDash.id, {trigger: true});
      }
    });
  });

  $(window).on('resize', function(event) {
    $('#notebooks-index-container').height($(window).height() - 91);
    $('#notes-container').height($(window).height() - 91);
  })
})
