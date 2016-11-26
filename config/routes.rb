Rails.application.routes.draw do
  root "static_pages#index"

  devise_for :users, :controllers => { :omniauth_callbacks => "users/callbacks" }
  devise_scope :user do
    authenticated :user do
      root "projects#index", as: :authenticated_root
    end
    unauthenticated :user do
      match '/sessions/user', to: 'devise/sessions#create', via: :post
      root 'static_pages#index', as: :unauthenticated_root
    end
  end
  # root 'devise/sessions#new'

  # devise_scope :user do
  #   get 'sign_in', :to => 'devise/sessions#new' #, :as => :new_user_session
  #   delete 'sign_out', :to => 'devise/sessions#destroy' #, :as => :destroy_user_session
  # end

  get "users/auth/:provider/callback", to: "sessions#create", as: :create_session
  get "signin", to: "sessions#new", as: "signin"

  resources :auth, only: :show
  resources :sessions, only: [:destroy, :new, :create]
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
    end
  end

end
