class Task < ActiveRecord::Base
  validates :body, presence: true

  belongs_to :project
  has_many :usertasks
  has_many :users, through: :usertasks

  validates :body, presence: true
end
