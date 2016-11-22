class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    @user.email = session[:auth]["info"]["email"]
    @user.oauth_uid = session[:auth]["uid"]
    @user.profile_photo = session[:auth]["info"]["image"]
    if @user.save
      session[:auth].clear
      session[:user_id] = @user.id
      @user.touch :last_signed_in_at
      @user.increment! :sign_in_count
      flash[:success] = "Registered successfully."
      redirect_to projects_path
    else
      binding.pry
      flash[:alert] = "There was a problem registering."
      render :new
    end
  end

  def new
    @user = User.new(oauth_uid: session[:auth]["uid"])
  end

  def show
    @user = User.find(params[:id])
    @profile_photo = @user.profile_photo
    unless @user == current_user
      flash[:warning] = "You are not authorized to view this record."
      redirect_to projects_path
    end
  end

  protected

  def user_params
    params.require(:user).permit(:username)
  end

end
