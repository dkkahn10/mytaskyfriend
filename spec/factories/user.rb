require 'factory_girl'

FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "foob@example#{n}.com"}
    sequence(:username) { |n| "foobington#{n}" }
    sequence(:oauth_uid) { |n| n }
  end
end
