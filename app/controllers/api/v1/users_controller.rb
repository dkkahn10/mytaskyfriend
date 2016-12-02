class Api::V1::UsersController < ApiController

  def index
    @users = User.all.pluck(:username).sort
    user_array = []
    @users.each do |user|
      user_array << { 'value': user, label: user }
    end

    render json: {
      users: user_array
    }, status: :ok
  end
end
