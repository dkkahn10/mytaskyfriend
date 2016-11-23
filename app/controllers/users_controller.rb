class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    @user.email = session[:auth]["info"]["email"]
    @user.oauth_uid = session[:auth]["uid"]
    @user.facebook_photo = session[:auth]["info"]["image"]
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
    if @user.current_photo.nil?
      @user.profile_photo.url.nil? ? @user_photo = @user.facebook_photo : @user_photo = @user.profile_photo.url
      # if @user.profile_photo.url.nil?
      #   @user_photo = @user.facebook_photo
      # else
      #   @user_photo = @user.profile_photo.url
      # end
    else
      @user_photo = @user.current_photo
    end

    unless @user == current_user
      flash[:warning] = "You are not authorized to view this record."
      redirect_to projects_path
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      if user_params['current_photo'] == "1"
        @user.update_attributes(current_photo: @user.facebook_photo)
      else
        @user.update_attributes(current_photo: @user.profile_photo.url)
      end
      flash[:success] = 'Successfully saved!'
    else
      flash[:errors] = 'Your changes were not successful.'
    end
  end

  protected

  def user_params
    params.require(:user).permit(:username, :profile_photo, :current_photo)
  end

end
