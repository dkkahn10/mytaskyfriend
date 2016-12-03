Rails.application.routes.draw do
  root "static_pages#index"

  devise_for :users, :controllers => { :omniauth_callbacks => "users/callbacks" }
  devise_scope :user do
    authenticated :user do
      delete 'sign_out', :to => 'devise/sessions#destroy'
      root "projects#index", as: :authenticated_root
      resources :users
      resources :projects, only: [:index]
      resources :tasks, only: [:index]
      resources :chatrooms, param: :slug
      resources :messages
    end
    unauthenticated :user do
      match '/sessions/user', to: 'devise/sessions#create', via: :post
      root "static_pages#index", as: :unauthenticated_root
    end
  end

  resources :users
  resources :projects, only: [:index]
  resources :tasks, only: [:index]
  resources :chatrooms, param: :slug
  resources :messages



  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'

  namespace :api do
    namespace :v1 do
      resources :projects, only: [:index, :create, :destroy, :update]
      resources :tasks, only: [:index, :create, :destroy, :show, :update]
      resources :users, only: [:index]
    end
  end

end
