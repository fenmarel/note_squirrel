class DashboardsController < ApplicationController
  before_action :ensure_signed_in

  def index
    if user_signed_in?
      @dashboards = current_user.dashboards
      @notebooks = current_user.notebooks
      @notes = current_user.notes
    end

    render :index
  end

  private

  def ensure_signed_in
    redirect_to new_user_session_url unless user_signed_in?
  end
end
