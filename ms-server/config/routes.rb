Rails.application.routes.draw do
 get :token, controller: 'application'
 resources :users
 
end
