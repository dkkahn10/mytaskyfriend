class MessagesController < ApplicationController

  def create
    # curl -X POST -H "Content-Type: application/json" -d '{"message": {"content": "test", "chatroom_id": 1} }' http://localhost:3000/messages
    binding.pry
    message = Message.new(message_params)
    message.user = current_user
    if message.save
      # do some stuff
    else
      redirect_to chatrooms_path
    end
  end

  private

    def message_params
      params.require(:message).permit(:content, :chatroom_id)
    end
end
