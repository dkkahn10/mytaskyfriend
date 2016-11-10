class User < ApplicationRecord
  has_many :projects
  has_many :tasks
  has_many :messages
  has_many :chatrooms, through: :messages

  validates :username, format: { with: /\A[\w-]+\z/, message: "May only contain letters, numbers, dashes, and underscores."}
  validates :email, :username, :oauth_uid, presence: true
  validates :oauth_uid, :username, uniqueness: true
end
