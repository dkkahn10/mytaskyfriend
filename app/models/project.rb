class Project < ActiveRecord::Base
  validates :title, presence: true

  has_many :tasks
  has_many :roles
  has_many :userprojects
  has_many :users, through: :userprojects

  validates :title, presence: true
end
