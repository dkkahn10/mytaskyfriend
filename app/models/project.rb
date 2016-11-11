class Project < ActiveRecord::Base
  belongs_to :user
  has_many :tasks

  validates :title, presence: true
end
