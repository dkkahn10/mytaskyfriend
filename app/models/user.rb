class User < ApplicationRecord
  has_many :shirts

  validates_format_of :username, with: /\A[\w-]+\z/, message: "May only contain letters, numbers, dashes, and underscores."
  validates_presence_of :email, :username, :oauth_uid
  validates_uniqueness_of :oauth_uid, :username
end
