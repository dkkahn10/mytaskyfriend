class Userchatroom < ActiveRecord::Base
  belongs_to :user
  belongs_to :chatroom
  belongs_to :role
end
