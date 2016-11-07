Rails.application.routes.draw do

  get "auth/:provider/callback", to: "sessions#create"
  get "signin", to: "sessions#new", as: "signin"

  root "sessions#new"

  resources :auth, only: :show
  resources :sessions, only: [:destroy, :new]
  resources :users
  resources :projects, only: [:index]
  resources :tasks, only: [:index]

  namespace :api do
    namespace :v1 do
      resources :projects, only: [:index, :create, :destroy]
      resources :tasks, only: [:index, :create, :destroy]
    end
  end

end
