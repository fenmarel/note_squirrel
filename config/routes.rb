NoteSquirrel::Application.routes.draw do
  root to: "dashboards#index"
  devise_for :users

  namespace :api, :defaults => { :format => :json } do
    resources :dashboards, :except => [:new, :edit] do
      resources :notebooks, :only => [:new, :create, :index]
    end

    resources :notebooks, :except => [:new, :create, :index, :edit] do
      resources :notes, :shallow => true, :except => [:new, :edit]
    end
  end
end
