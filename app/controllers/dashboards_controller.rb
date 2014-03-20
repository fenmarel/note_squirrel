class DashboardsController < ApplicationController
  before_action :ensure_signed_in

  def index
    render :index
  end

  private

  def ensure_signed_in
    redirect_to new_user_session_url unless user_signed_in?
  end
end
