class Api::NotesController < ApplicationController
  def create
    @note = Note.new(note_params)

    if @note.save
      render :json => @note
    else
      render :json => @note.errors, status: 422
    end
  end

  def index
    @notebook = Notebook.find(params[:notebook_id])
    @notes = @notebook.notes

    render :json => @notes
  end

  def show
    @note = Note.find(params[:id])

    render :json => @note
  end


  private

  def note_params
    notebook_id = { notebook_id: params[:notebook_id] }
    params.require(:note).permit(:title).merge(notebook_id)
  end
end
