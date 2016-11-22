Rails.application.routes.draw do

  root "sessions#new"

  get "auth/:provider/callback", to: "sessions#create"
  get "signin", to: "sessions#new", as: "signin"

  resources :auth, only: :show
  resources :sessions, only: [:destroy, :new]
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
