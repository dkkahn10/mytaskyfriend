class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?


  protected

  def configure_permitted_parameters
    added_attrs = [
      :username,
      :email,
      :role,
      :password,
      :password_confirmation,
      :remember_me,
      :last_signed_in_at,
      :oauth_uid,
      :sign_in_count,
      :profile_photo,
      :facebook_photo,
      :current_photo
    ]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end

  def authenticate_user!
    if user_signed_in?
      super
    else
      redirect_to unauthenticated_root_path, :notice => 'You must be logged in to view this page.'
    end
  end
end
