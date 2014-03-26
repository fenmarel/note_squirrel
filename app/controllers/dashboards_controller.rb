class DashboardsController < ApplicationController
  before_action :ensure_signed_in

  def index
    if user_signed_in?
      @dashboards = current_user.dashboards
      @favorites = current_user.favorites
      @trashcan = current_user.to_delete
    end

    render :index
  end

  private

  def ensure_signed_in
    redirect_to new_user_session_url unless user_signed_in?
  end
end
