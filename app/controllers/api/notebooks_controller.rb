class Api::NotebooksController < ApplicationController
  def index
    @dashboard = Dashboard.find(params[:dashboard_id])
    @notebooks = @dashboard.notebooks

    render :json => @notebooks
  end

  def show
    @notebook = Notebook.find(params[:id])

    render :json => @notebook
  end
end
