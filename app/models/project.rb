class Project < ActiveRecord::Base
  validates :title, presence: true

  has_many :tasks
  has_many :roles
  has_many :userprojects
  has_many :users, through: :userprojects

  validates :title, presence: true
  validate :color_is_not_blank

  def color_is_not_blank
    if self.color == ""
      self.color = "#00acc1"
    end
  end
end
