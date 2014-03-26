class Api::NotebooksController < ApplicationController
  def create
    @notebook = Notebook.new(new_notebook_params)

    if @notebook.save
      render :json => @notebook
    else
      render :json => @notebook.errors, status: 422
    end
  end

  def destroy
    @notebook = Notebook.find(params[:id])
    @notebook.destroy

    render :json => @notebook
  end

  def favorites
    if user_signed_in?
      render :json => current_user.favorites
    else
      render :json => []
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

  def update
    @notebook = Notebook.find(params[:id])

    if @notebook.update(update_notebook_params)
      render :json => @notebook
    else
      render :json => @notebook.errors, status: 422
    end
  end


  private

  def new_notebook_params
    dash_id = { dashboard_id: params[:dashboard_id] }
    params.require(:notebook).permit(:title).merge(dash_id)
  end

  def update_notebook_params
    params.require(:notebook).permit(:title, :favorite)
  end
end
