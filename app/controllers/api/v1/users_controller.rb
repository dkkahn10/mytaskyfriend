class Api::V1::UsersController < ApiController

  def index
    @users = User.all.pluck(:username).sort
    user_hash = {}
    @users.each do |user|
      user_hash["#{user}"] = nil
    end

    render json: {
      users: user_hash
    }, status: :ok
  end
end
