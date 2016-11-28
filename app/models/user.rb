class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:facebook, :github, :linkedin]

  has_many :userprojects
  has_many :projects, through: :userprojects
  has_many :usertasks
  has_many :tasks, through: :usertasks
  has_many :messages
  has_many :chatrooms, through: :messages

  validates :username, format: { with: /\A[\w-]+\z/, message: "May only contain letters, numbers, dashes, and underscores."}
  validates :email, :username, presence: true
  # validates :email, :username, :oauth_uid, presence: true
  validates :oauth_uid, :username, uniqueness: true

  mount_uploader :profile_photo, ProfilePhotoUploader

  def self.from_omniauth(auth)
    # where(provider: auth.provider, oauth_uid: auth.uid).first_or_create do |user|
    where(email: auth.info.email).first_or_create do |user|
      user.provider = auth.provider
      user.oauth_uid = auth.uid
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.facebook_photo = auth.info.image
    end
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["oauth_data"] && session["oauth_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end
end
