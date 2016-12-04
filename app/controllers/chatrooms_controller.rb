class ChatroomsController < ApplicationController
  before_action :authenticate_user!

  def index
    @chatroom = Chatroom.new
    @chatrooms = current_user.chatrooms
    @public_rooms = []
    all_chatrooms = Chatroom.all
    all_chatrooms.each do |chatroom|
      if chatroom.public
        @public_rooms.push(chatroom)
      end
    end
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
    @chatroom = Chatroom.find_by(slug: params[:slug])
    @chatroom.update(chatroom_params)
    if @chatroom.save
      participant = User.find_by(username: params[:username])
      Userchatroom.create(user: participant, chatroom: @chatroom, role: Role.find_by(name: 'member')) unless participant.nil?
    end
    redirect_to chatrooms_path
  end

  def show
    @chatrooms = current_user.chatrooms
    @public_rooms = []
    all_chatrooms = Chatroom.all
    all_chatrooms.each do |chatroom|
      if chatroom.public
        @public_rooms.push(chatroom)
      end
    end

    @chatroom = Chatroom.find_by(slug: params[:slug])
    @message = Message.new
    @users = User.all
    @verified = false
    userchatrooms = Userchatroom.where(chatroom: @chatroom)
    userchatrooms.each do |room|
      if room.role.name == 'admin' && room.user == current_user
        @verified = true
      end
    end
  end

  private
    def chatroom_params
      params.require(:chatroom).permit(:topic, :public)
    end
end
