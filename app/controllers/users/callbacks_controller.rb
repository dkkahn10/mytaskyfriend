class Users::CallbacksController < Devise::OmniauthCallbacksController
  # def facebook
  #   # @user = User.from_omniauth(request.env["omniauth.auth"])
  #   # binding.pry
  #   # redirect_to create_session_path
  #   # sign_in_and_redirect @user
  #
  #   user = if User.find_by(oauth_uid: request.env["omniauth.auth"]["uid"])
  #             User.find_by(oauth_uid: request.env["omniauth.auth"]["uid"])
  #           # user signed up with email, or user signed up with one oauth provider and is now
  #           # signing in with a different oauth provider associated with the same email address
  #
  #           elsif User.find_by(email: request.env["omniauth.auth"]["info"]["email"])
  #             User.find_by(email: request.env["omniauth.auth"]["info"]["email"])
  #           end
  #
  #   # if user signed up by email but is now logging in with oauth, update oauth info
  #   if user.provider.nil? || user.provider == "email"
  #     user.update_attributes(
  #       oauth_uid: request.env["omniauth.auth"]["uid"],
  #       provider: request.env["omniauth.auth"]["provider"],
  #       facebook_photo: request.env["omniauth.auth"]["info"]["image"]
  #     )
  #   end
  #
  #   if user.nil?
  #     session[:auth] = request.env["omniauth.auth"].slice("uid","info")
  #     redirect_to new_user_path
  #   else
  #     user.increment! :sign_in_count
  #     user.touch :last_signed_in_at
  #     session[:user_id] = user.id
  #     sign_in_and_redirect :user, user
  #   end
  # end

  def facebook
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
      set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end

  def failure
    redirect_to root_path
  end


  def github
    @user = User.from_omniauth(request.env["omniauth.auth"])
    sign_in_and_redirect @user
  end

  def failure
    redirect_to root_path
  end

end
