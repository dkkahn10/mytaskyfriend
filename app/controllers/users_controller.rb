class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    if @user.current_photo.nil?
      if @user.profile_photo.url.nil?
        @user_photo = @user.facebook_photo
      else
        @user_photo = @user.profile_photo.url
      end
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
      flash[:notice] = 'Successfully saved!'
    else
      flash[:alert] = 'Your changes were not successful.'
    end
  end

  protected

  def user_params
    params.require(:user).permit(:username, :profile_photo, :current_photo)
  end

end
