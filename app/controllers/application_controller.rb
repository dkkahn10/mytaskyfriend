class ApplicationController < ActionController::Base
  helper_method :current_user, :user_signed_in?
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  # before_action :authenticate_user!
  respond_to :json, :html

  def authenticate_user!
    if !user_signed_in?
      flash[:warning] = "You need to sign in before continuing."
      redirect_to new_session_path
    end
  end

  def authorize_object_owner(object)
    unless object.user == current_user
      flash[:warning] = "You are not authorized to view this record."
      redirect_to projects_path
    end
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def user_signed_in?
    !current_user.nil?
  end

  protected

  def configure_permitted_parameters
    added_attrs = [
      :first_name,
      :last_name,
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
end
