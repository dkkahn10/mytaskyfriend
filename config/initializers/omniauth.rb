Rails.application.config.middleware.use OmniAuth::Builder do 
  provider :facebook, ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET'], app_id: ENV['FACEBOOK_KEY'], scope: "email"
end
