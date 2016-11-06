class SessionsController < ApplicationController

  def create
    user = User.find_by(oauth_uid: request.env["omniauth.auth"]["uid"])
    if user.nil?
      session[:auth] = request.env["omniauth.auth"].slice("uid","info")
      redirect_to new_user_path
    else
      user.increment! :sign_in_count
      user.touch :last_signed_in_at
      session[:user_id] = user.id
      redirect_to tasks_path
    end
  end

  def destroy
    session[:user_id] = nil
    session[:auth] = nil
    flash[:success] = "Signed out."
    redirect_to root_path
  end

  def new
    redirect_to tasks_path if user_signed_in?
  end

end
