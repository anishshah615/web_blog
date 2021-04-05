Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do      
      get '/users', to: "users#index"
      get '/users/:user_id/posts', to: "posts#get_posts"
      resources :posts do
      	resources :comments
      end
      
    end
  end

  get "*path", to: "pages#index"
end
