class Api::NotesController < ApplicationController
  def index
    @notebook = Notebook.find(params[:notebook_id])
    @notes = @notebook.notes

    render :json => @notes
  end

  def show
    @note = Note.find(params[:id])

    render :json => @note
  end
end
