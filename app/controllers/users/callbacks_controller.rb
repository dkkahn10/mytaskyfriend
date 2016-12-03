class Users::CallbacksController < Devise::OmniauthCallbacksController

  def facebook
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      @user.update_attributes(provider: request.env["omniauth.auth"]["provider"], facebook_photo: request.env["omniauth.auth"]["info"]["image"])
      @user.increment! :sign_in_count
      @user.touch :last_signed_in_at
      sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
      set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
    else
      session["oauth_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end

  def github
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      @user.update_attributes(provider: request.env["omniauth.auth"]["provider"], facebook_photo: request.env["omniauth.auth"]["info"]["image"])
      @user.increment! :sign_in_count
      @user.touch :last_signed_in_at
      sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
      set_flash_message(:notice, :success, :kind => "Github") if is_navigational_format?
    else
      session["oauth_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end

  def linkedin
    @user = User.from_omniauth(request.env["omniauth.auth"])

    if @user.persisted?
      @user.update_attributes(provider: request.env["omniauth.auth"]["provider"], facebook_photo: request.env["omniauth.auth"]["info"]["image"])
      @user.increment! :sign_in_count
      @user.touch :last_signed_in_at
      sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
      set_flash_message(:notice, :success, :kind => "Linkedin") if is_navigational_format?
    else
      session["oauth_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url
    end
  end

  def failure
    redirect_to root_path
  end
end
