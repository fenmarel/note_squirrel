class Api::DashboardsController < ApplicationController
  before_action :set_dashboard, :only => [:destroy, :show, :update]

  def create
    @dashboard = current_user.dashboards.new(dashboard_params)

    if @dashboard.save
      render :json => @dashboard
    else
      render :json => @dashboard.errors, status: 422
    end
  end

  def destroy
    @dashboard.destroy

    render :json => @dashboard
  end

  def index
    if user_signed_in?
      @dashboards = current_user.dashboards
      render :json => @dashboards
    else
      render :json => []
    end
  end

  def show
    render :json => @dashboard
  end

  def update
    if @dashboard.update(dashboard_params)
      render :json => @dashboard
    else
      render :json => @dashboard.errors, status: 422
    end
  end


  private

  def dashboard_params
    params.require(:dashboard).permit(:title)
  end

  def set_dashboard
    @dashboard = Dashboard.find(params[:id])
  end
end
