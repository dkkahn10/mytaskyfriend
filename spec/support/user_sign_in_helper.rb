module UserSignInHelper
  def login_with_facebook(username)
    visit auth_path(:facebook)
    fill_in :user_name, with: username
    click_on "Submit"
  end
end
