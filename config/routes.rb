Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :colors

      # Home controller routes.
      get    '/home'           => 'home#index'
      get    'auth'            => 'home#auth'

      # Get login token from Knock
      post   'user_token'      => 'user_token#create'

      # User actions
      get    '/users'          => 'users#index'

      get    '/users/current'  => 'users#current'
      post   '/users/create'   => 'users#create'
      patch  '/user/:id'       => 'users#update'
      delete '/user/:id'       => 'users#destroy'

      post   '/palettes/create'   => 'palettes#create'
      get    '/palettes/:username'=> 'palettes#show'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
