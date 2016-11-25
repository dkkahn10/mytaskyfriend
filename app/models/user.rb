class User < ApplicationRecord
  has_many :userprojects
  has_many :projects, through: :userprojects
  has_many :usertasks
  has_many :tasks, through: :usertasks
  has_many :messages
  has_many :chatrooms, through: :messages

  validates :username, format: { with: /\A[\w-]+\z/, message: "May only contain letters, numbers, dashes, and underscores."}
  validates :email, :username, :oauth_uid, presence: true
  validates :oauth_uid, :username, uniqueness: true

  mount_uploader :profile_photo, ProfilePhotoUploader

end
