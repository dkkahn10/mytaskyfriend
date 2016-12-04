class ChatroomsController < ApplicationController
  before_action :authenticate_user!

  def index
    @chatroom = Chatroom.new

    @chatrooms = current_user.chatrooms
    # @user_chatrooms = Userchatroom.where(user: current_user)
    #
    # @user_chatrooms.each do |chatroom|
    #   room = Chatroom.find(chatroom)
    #   binding.pry
    #   @chatrooms << room
    # end
    # binding.pry
  end

  def new
    if request.referrer.split("/").last == "chatrooms"
      flash[:notice] = nil
    end
    @chatroom = Chatroom.new
  end

  def edit
    @chatroom = Chatroom.find_by(slug: params[:slug])
  end

  def create
    @chatroom = Chatroom.new(chatroom_params)
    if @chatroom.save
      admin = Role.find_by(name: "admin")
      Userchatroom.create(user: current_user, chatroom: @chatroom, role: admin)
      respond_to do |format|
        format.html { redirect_to @chatroom }
        format.js
      end
    else
      respond_to do |format|
        flash[:notice] = {error: ["a chatroom with this topic already exists"]}
        format.html { redirect_to new_chatroom_path }
        format.js { render template: 'chatrooms/chatroom_error.js.erb'}
      end
    end
  end
  
  def update
    # binding.pry

    @chatroom = Chatroom.find_by(slug: params[:slug])
    @chatroom.update(chatroom_params)
    if @chatroom.save
      participant = User.find_by(username: params[:chatroom][:username])
      Userchatroom.create(user: participant, chatroom: @chatroom, role: member) unless participant.nil?
    end
    redirect_to chatrooms_path
  end

  def show
    @chatrooms = Chatroom.all
    @chatroom = Chatroom.find_by(slug: params[:slug])
    @message = Message.new
  end

  private

    def chatroom_params
      params.require(:chatroom).permit(:topic, :public)
    end
end
