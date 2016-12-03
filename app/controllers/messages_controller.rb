class MessagesController < ApplicationController
  before_action :authenticate_user!

  def create
    message = Message.new(message_params)
    message.user = current_user
    Time.zone = 'Eastern Time (US & Canada)'
    if message.save
      ActionCable.server.broadcast 'messages',
        message: message.content,
        user: message.user.username,
        timestamp: message.created_at.strftime("%b %e, %Y @ %l:%M %p")
      head :ok
    else
      redirect_to chatrooms_path
    end
  end

  private

    def message_params
      params.require(:message).permit(:content, :chatroom_id)
    end
end
