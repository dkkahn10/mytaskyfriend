class Chatroom < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_many :users, through: :messages
  has_many :userchatrooms
  has_many :users, through: :userchatrooms
  validates :topic, presence: true, uniqueness: true, case_sensitive: false
  before_validation :sanitize, :slugify

  def to_param
    self.slug
  end

  def slugify
    self.slug = self.topic.downcase.gsub(" ", "-")
  end

  def sanitize
    self.topic = self.topic.strip
  end
end
