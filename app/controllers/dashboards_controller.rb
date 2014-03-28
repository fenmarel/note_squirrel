class DashboardsController < ApplicationController
  before_action :ensure_signed_in

  def index
    @dashboards = user_signed_in? ? current_user.dashboards : []
    @favorites = user_signed_in? ? current_user.favorites : []

    render :index
  end

  private

  def ensure_signed_in
    redirect_to new_user_session_url unless user_signed_in?
  end
end
