class Project < ActiveRecord::Base
  validates :title, presence: true
  
  belongs_to :user
  has_many :tasks
end
