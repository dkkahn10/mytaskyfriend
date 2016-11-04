require 'factory_girl'

FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "foob@example#{n}.com"}
    sequence(:name) { |n| "foobington#{n}" }
    sequence(:oauth_uid) { |n| n }
  end
end
