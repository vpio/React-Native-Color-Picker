Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :colors
      resources :users
      resources :sessions, only: [:new, :create, :destroy]

      get 'signup', to: 'users#new', as: 'signup'
      get 'login', to: 'sessions#new', as: 'login'
      get 'logout', to: 'sessions#destroy', as: 'logout'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
