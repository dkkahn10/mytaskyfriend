class Api::V1::UsersController < ApiController
  before_action :current_user

  def index
    @user = User.find(current_user)
    render json: {
      user: @user.provider
    }, status: :ok
  end

end
