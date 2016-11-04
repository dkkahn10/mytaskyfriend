class ApplicationController < ActionController::Base
  helper_method :current_user, :user_signed_in?
  protect_from_forgery with: :exception

  def authenticate_user!
    if !user_signed_in?
      flash[:warning] = "You need to sign in before continuing."
      redirect_to new_session_path
    end
  end

  def authorize_object_owner(object)
    unless object.user == current_user
      flash[:warning] = "You are not authorized to view this record."
      # redirect_to shirts_path
    end
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def user_signed_in?
    !current_user.nil?
  end
end
