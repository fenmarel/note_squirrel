class Api::NotebooksController < ApplicationController
  def create
    @notebook = Notebook.new(notebook_params)

    if @notebook.save
      render :json => @notebook
    else
      render :json => @notebook.errors
    end
  end

  def index
    @dashboard = Dashboard.find(params[:dashboard_id])
    @notebooks = @dashboard.notebooks

    render :json => @notebooks
  end

  def show
    @notebook = Notebook.find(params[:id])

    render :json => @notebook
  end


  private

  def notebook_params
    dash_id = { dashboard_id: params[:dashboard_id] }
    params.require(:notebook).permit(:title).merge(dash_id)
  end
end
