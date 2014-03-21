class Api::NotebooksController < ApplicationController
  def index
    @dashboard = Dashboard.find(params[:dashboard_id])
    @notebooks = @dashboard.notebooks

    render :json => @notebooks
  end
end
