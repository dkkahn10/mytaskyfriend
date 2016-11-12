class Task < ActiveRecord::Base
  validates :body, presence: true

  belongs_to :user
  belongs_to :project

  validates :body, presence: true
end
