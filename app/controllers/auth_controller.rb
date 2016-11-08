class AuthController < ApplicationController
  before_action :authenticate_user!, :current_user
  # def failure
  #   flash[:notice] = "Authentication failed."
  #   redirect_to root_path
  # end

  def show
    # user is directed here after a login attempt
    # binding.pry
    # if current_user.nil?
    #
    # else
    #   flash[:notice] = "Successfully signed in."
    #   redirect_to root_path
    # end
  end
end
