include ActionController::HttpAuthentication::Basic::ControllerMethods
include ActionController::HttpAuthentication::Token::ControllerMethods
class ApplicationController < ActionController::API
#before_filter :authenticate_user_from_token, except: [:token]
 
private
def authenticate_user_from_token
  unless authenticate_with_http_token { |token, options| User.find_by(auth_token: token) }
    render json: { error: 'Bad Token'}, status: 401
  end
end

 def token 
  authenticate_with_http_basic do |userName, password|
    user = User.find_by(userName: userName)
    if user && user.password == password
      render json: { token: user.auth_token }
    else
      render json: { error: 'Incorrect credentials' }, status: 401
    end
  end

 end

end
